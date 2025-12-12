"use client";

import { Layout } from "@/components/layouts/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  // Data Line Chart
  const pengunjungData = [
    { name: "Senin", value: 3000 },
    { name: "Selasa", value: 5000 },
    { name: "Rabu", value: 4500 },
    { name: "Kamis", value: 2500 },
    { name: "Jumat", value: 22000 },
    { name: "Sabtu", value: 15000 },
    { name: "Minggu", value: 8000 },
  ];

  // Data Bar Chart
  const revenueData = [
    { name: "Senin", value: 250 },
    { name: "Selasa", value: 320 },
    { name: "Rabu", value: 180 },
    { name: "Kamis", value: 280 },
    { name: "Jumat", value: 200 },
    { name: "Sabtu", value: 350 },
    { name: "Minggu", value: 400 },
  ];

  return (
    <Layout breadcrumbs={[{ name: "Dashboard", target: "/dashboard" }]}>
      <div className="flex-1 space-y-6 p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Annual Pass */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Annual Pass
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">500.234</div>
              <p className="text-xs text-green-600 flex items-center mt-2">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                8.5% Dari Bulan Lalu
              </p>
            </CardContent>
          </Card>

          {/* Total Pengunjung Hari Ini */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Pengunjung Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">80.876</div>
              <p className="text-xs text-green-600 flex items-center mt-2">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                1.3% Dari Bulan Lalu
              </p>
            </CardContent>
          </Card>

          {/* Jumlah Event Berlangsung */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Jumlah Event Berlangsung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs text-red-600 flex items-center mt-2">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                4.3% Dari Bulan Lalu
              </p>
            </CardContent>
          </Card>

          {/* Penjualan Tiket Hari Ini */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Penjualan Tiket Hari Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">20.000</div>
              <p className="text-xs text-red-600 flex items-center mt-2">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                4.3% Dari Bulan Lalu
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Jumlah Pengunjung Chart - Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Jumlah Pengunjung
              </CardTitle>
              <p className="text-sm text-muted-foreground">Per Hari</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={pengunjungData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => {
                      if (value >= 1000) return `${value / 1000}k`;
                      return value;
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [
                      value.toLocaleString("id-ID"),
                      "Pengunjung",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Rata-rata harian pengunjung: 2.500
              </p>
            </CardContent>
          </Card>

          {/* Total Revenue Chart - Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Total Revenue
              </CardTitle>
              <p className="text-sm text-muted-foreground">Per Hari</p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={revenueData}
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}t`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [value, "Revenue"]}
                  />
                  <Bar
                    dataKey="value"
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={50}
                  />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Total Cabang: 8.000
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}