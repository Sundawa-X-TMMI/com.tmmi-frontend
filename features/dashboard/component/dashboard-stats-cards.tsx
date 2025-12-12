"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useDashboardData } from "@/features/dashboard/hooks/dashboard-queries";

export function DashboardStatsCards() {
  const { data, isLoading } = useDashboardData();
  const stats = data?.data?.stats;

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Loading...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">---</div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Annual Pass",
      value: stats?.annualPass.toLocaleString("id-ID") || "0",
      change: stats?.annualPassChange || 0,
      changeLabel: "Dari Bulan Lalu",
    },
    {
      title: "Total Pengunjung Hari Ini",
      value: stats?.totalPengunjung.toLocaleString("id-ID") || "0",
      change: stats?.totalPengunjungChange || 0,
      changeLabel: "Dari Bulan Lalu",
    },
    {
      title: "Jumlah Event Berlangsung",
      value: stats?.jumlahEvent.toString() || "0",
      change: stats?.jumlahEventChange || 0,
      changeLabel: "Dari Bulan Lalu",
    },
    {
      title: "Penjualan Tiket Hari Ini",
      value: stats?.penjualanTiket.toLocaleString("id-ID") || "0",
      change: stats?.penjualanTiketChange || 0,
      changeLabel: "Dari Bulan Lalu",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
            <p
              className={`text-xs flex items-center mt-2 ${
                stat.change >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.change >= 0 ? (
                <ArrowUpRight className="mr-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3" />
              )}
              {Math.abs(stat.change)}% {stat.changeLabel}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}