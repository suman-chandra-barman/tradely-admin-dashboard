"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetUserGrowthQuery } from "@/redux/api/dashboardApi";

export default function UserGrowthChart() {
  const { data: response, isLoading } = useGetUserGrowthQuery({ year: 1 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const chartData = response?.data?.labels?.map((label: string, index: number) => ({
    name: label,
    value: response.data.data[index] ?? 0,
  })) || [];

  const showSkeleton = !mounted || isLoading;

  if (showSkeleton) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent className="flex items-end justify-between h-[250px] gap-2 pt-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full flex flex-col items-center gap-2">
              <div
                className="w-full bg-zinc-200/80 rounded animate-pulse"
                style={{ height: `${(i + 2) * 25}px` }}
              />
              <div className="h-3 w-8 bg-zinc-200 rounded animate-pulse" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border border-zinc-200/70 bg-white">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-zinc-500 text-sm">
            No chart data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
              <XAxis
                dataKey="name"
                stroke="#71717a"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#71717a" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e4e4e7",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="value"
                fill="#f97316"
                radius={[20, 20, 0, 0]}
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
