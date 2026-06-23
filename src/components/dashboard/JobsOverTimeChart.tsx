"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useGetJobsOverTimeQuery } from "@/redux/api/dashboardApi";

export default function JobsOverTimeChart() {
  const { data: response, isLoading } = useGetJobsOverTimeQuery();
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
          <CardTitle>Jobs Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] relative flex flex-col justify-between pt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-full border-t border-zinc-100 h-0" />
          ))}
          <div className="absolute inset-0 flex items-center justify-around px-10">
            {[30, 60, 45, 90, 75, 120].map((h, i) => (
              <div
                key={i}
                className="h-3 w-3 rounded-full bg-zinc-200/80 animate-pulse relative"
                style={{ transform: `translateY(${h - 100}px)` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 pt-2 border-t border-zinc-200">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-3 w-8 bg-zinc-200 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border border-zinc-200/70 bg-white">
      <CardHeader>
        <CardTitle>Jobs Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex h-[250px] items-center justify-center text-zinc-500 text-sm">
            No chart data available.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
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
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ fill: "#2563eb", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
