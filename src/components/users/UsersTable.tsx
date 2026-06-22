"use client";

import { Ban, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetUsersQuery,
  useToggleBlockUserMutation,
  useDeleteUserMutation,
} from "@/redux/api/usersApi";
import UserDetailsDialog from "@/components/users/UserDetailsDialog";
import UsersTableSkeleton from "@/components/skeletons/UsersTableSkeleton";

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return dateString;
  }
};

export default function UsersTable() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const search = searchParams.get("search") || "";

  const { data: response, isLoading, isFetching, isError } = useGetUsersQuery({
    status,
    search,
  });

  const [toggleBlock] = useToggleBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const users = response?.data || [];

  const handleToggleBlock = async (id: number, currentBlockedStatus: boolean) => {
    try {
      await toggleBlock({ id, is_blocked: !currentBlockedStatus }).unwrap();
      toast.success(
        `User successfully ${!currentBlockedStatus ? "blocked" : "unblocked"}.`
      );
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user status.");
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Are you sure you want to delete user ${name}?`)) {
      return;
    }
    try {
      await deleteUser(id).unwrap();
      toast.success("User successfully deleted.");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete user.");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between mb-4">
        <CardTitle>
          All Users ({isLoading || isFetching ? "..." : users.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Total Jobs</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isFetching ? (
              <UsersTableSkeleton />
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-rose-500 font-medium"
                >
                  Failed to load users. Please try again.
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-zinc-500"
                >
                  No users found matching the filters.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium text-zinc-900">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.phone_number || "—"}</TableCell>
                  <TableCell className="text-zinc-500">
                    {user.location || "—"}
                  </TableCell>
                  <TableCell>{user.total_jobs}</TableCell>
                  <TableCell>
                    <Badge variant={user.is_blocked ? "destructive" : "default"}>
                      {user.is_blocked ? "Blocked" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-zinc-500">
                    {formatDate(user.created_at)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <UserDetailsDialog
                        name={user.name}
                        id={String(user.id)}
                        email={
                          user.email ||
                          `${user.name.toLowerCase().replace(/\s+/g, "")}@example.com`
                        }
                        phone={user.phone_number || "—"}
                        joined={formatDate(user.created_at)}
                        status={user.is_blocked ? "Blocked" : "Active"}
                      />
                      <button
                        onClick={() =>
                          handleToggleBlock(user.id, user.is_blocked)
                        }
                        className={`rounded-full p-2 transition-colors ${
                          user.is_blocked
                            ? "text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
                        }`}
                        title={user.is_blocked ? "Unblock user" : "Block user"}
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="rounded-full p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
