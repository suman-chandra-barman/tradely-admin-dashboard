"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2 } from "lucide-react";
import {
  useGetProfileSettingsQuery,
  useUpdateProfileSettingsMutation,
} from "@/redux/api/settingsApi";

export default function ProfileSettingsCard() {
  const { data: profileData, isLoading } = useGetProfileSettingsQuery();
  const [updateProfileSettings, { isLoading: isUpdating }] =
    useUpdateProfileSettingsMutation();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync local state when API data is fetched
  useEffect(() => {
    if (profileData?.data) {
      const user = profileData.data;
      setName(user.name || "");
      setPhoneNumber(user.phone_number || "");
      setEmail(user.email || "");
      setPreviewUrl(user.image || null);
      setImageFile(null);
    }
  }, [profileData]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB.");
        return;
      }
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleCancel = () => {
    if (profileData?.data) {
      const user = profileData.data;
      setName(user.name || "");
      setPhoneNumber(user.phone_number || "");
      setPreviewUrl(user.image || null);
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("phone_number", phoneNumber.trim());
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await updateProfileSettings(formData).unwrap();
      if (res.status === "success" || res.code === 200) {
        toast.success(res.message || "Personal details updated.");
      } else {
        toast.error(res.message || "Failed to update profile.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile.");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <p className="text-sm text-zinc-500">
            Configure basic business information.
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-5">
            <div className="h-4 w-32 bg-zinc-200 rounded animate-pulse mb-4" />
            <div className="mt-4 grid gap-6 lg:grid-cols-[120px_1fr]">
              <div className="h-28 w-28 rounded-2xl bg-zinc-200 animate-pulse" />
              <div className="grid gap-4 md:grid-cols-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-16 bg-zinc-200 rounded animate-pulse" />
                    <div className="h-10 bg-zinc-200 rounded animate-pulse w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-9 w-20 bg-zinc-200 rounded animate-pulse" />
              <div className="h-9 w-28 bg-zinc-200 rounded animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <p className="text-sm text-zinc-500">
          Configure basic business information.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border border-zinc-200/70 bg-white p-5">
          <p className="text-sm font-semibold text-zinc-900">
            Personal Details
          </p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[120px_1fr]">
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl bg-zinc-100 group border border-zinc-200/70 shadow-inner flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Admin"
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera className="h-8 w-8 text-zinc-400" />
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
              >
                <Camera className="h-6 w-6" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-zinc-50 font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-zinc-50 font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input
                  value={email}
                  disabled
                  className="bg-zinc-100 font-medium text-zinc-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-3">
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isUpdating}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
