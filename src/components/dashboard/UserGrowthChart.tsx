"use client";

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

const data = [
  { name: "Jan", value: 2100 },
  { name: "Feb", value: 2350 },
  { name: "Mar", value: 2580 },
  { name: "Apr", value: 2750 },
  { name: "May", value: 2880 },
  { name: "Jun", value: 3020 },
];

export default function UserGrowthChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>User Growth</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
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
      </CardContent>
    </Card>
  );
}
