"use client";

import React, { useCallback, useMemo } from "react";
import { Layout } from "@/components/layouts/layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShoppingCart,
  Activity,
  Timer,
} from "lucide-react";

type ChartDataItem = {
  name: string;
  value: number;
  color: string;
};

type ChartId = "anjungan" | "wahana";

export default function DashboardPage() {
  // Data for pie charts
  const anjunganData: ChartDataItem[] = [
    { name: "Bali", value: 30, color: "#FF6B35" },
    { name: "Maluku", value: 25, color: "#4ECDC4" },
    { name: "NTB", value: 20, color: "#45B7D1" },
    { name: "NTT", value: 15, color: "#96CEB4" },
    { name: "Kalimantan Selatan", value: 10, color: "#FFEAA7" },
  ];

  const wahanaData: ChartDataItem[] = [
    { name: "Museum", value: 30, color: "#FF6B35" },
    { name: "Kereta Gantung", value: 25, color: "#4ECDC4" },
    { name: "Taman Burung", value: 20, color: "#45B7D1" },
    { name: "Keong Mas", value: 15, color: "#96CEB4" },
    { name: "Air Mancur", value: 10, color: "#FFEAA7" },
  ];

  // FIXED: Separate hover states for each chart to prevent conflicts
  const [hoveredAnjungan, setHoveredAnjungan] = React.useState<number | null>(
    null
  );
  const [hoveredWahana, setHoveredWahana] = React.useState<number | null>(
    null
  );

  // Helper function to get hover state and setter based on chart ID
  const getHoverState = useCallback(
    (chartId: ChartId): [number | null, (value: number | null) => void] => {
      if (chartId === "anjungan") {
        return [hoveredAnjungan, setHoveredAnjungan];
      }
      return [hoveredWahana, setHoveredWahana];
    },
    [hoveredAnjungan, hoveredWahana]
  );

  const renderDonutChart = useCallback(
    (data: ChartDataItem[], chartId: ChartId) => {
      const total = useMemo(
        () => data.reduce((sum, item) => sum + item.value, 0),
        [data]
      );

      const [hoveredSegment, setHoveredSegment] = getHoverState(chartId);

      let currentAngle = 0;

      return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {/* Chart */}
          <div className="relative w-[180px] h-[180px] md:w-[200px] md:h-[200px] flex-shrink-0">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full transform -rotate-90"
            >
              {data.map((item, index) => {
                const percentage = item.value / total;
                const angle = percentage * 360;
                const startAngle = currentAngle;
                const endAngle = currentAngle + angle;

                currentAngle = endAngle;

                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;

                const x1 = 100 + 80 * Math.cos(startRad);
                const y1 = 100 + 80 * Math.sin(startRad);
                const x2 = 100 + 80 * Math.cos(endRad);
                const y2 = 100 + 80 * Math.sin(endRad);

                const largeArc = angle > 180 ? 1 : 0;

                const pathData = [
                  `M 100 100`,
                  `L ${x1} ${y1}`,
                  `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
                  `Z`,
                ].join(" ");

                // FIXED: Simple index comparison instead of charCode calculation
                const isHovered = hoveredSegment === index;

                return (
                  <g key={`${chartId}-segment-${index}`}>
                    <path
                      d={pathData}
                      fill={item.color}
                      className="transition-all duration-300 cursor-pointer"
                      style={{
                        opacity: hoveredSegment !== null && !isHovered ? 0.4 : 1,
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        transformOrigin: "100px 100px",
                      }}
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                      onTouchStart={() => setHoveredSegment(index)}
                      onTouchEnd={() => setHoveredSegment(null)} // FIXED: Added cleanup
                    />
                  </g>
                );
              })}
              <circle cx="100" cy="100" r="50" fill="white" />
            </svg>

            {/* Center info */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {hoveredSegment !== null && data[hoveredSegment] ? (
                <div className="text-center animate-in fade-in zoom-in duration-200">
                  <div
                    className="text-xl md:text-2xl font-bold mb-1"
                    style={{
                      color: data[hoveredSegment].color,
                    }}
                  >
                    {data[hoveredSegment].value}%
                  </div>
                  <div className="text-[9px] md:text-[10px] text-gray-600 max-w-[65px] md:max-w-[70px] leading-tight">
                    {data[hoveredSegment].name}
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-xs md:text-sm font-medium text-gray-400">
                    Total
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-gray-900">
                    100%
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Legend - Responsive layout */}
          <div className="w-full md:flex-1 grid grid-cols-2 gap-x-3 gap-y-2 md:gap-x-4">
            {data.map((item, index) => {
              const isHovered = hoveredSegment === index;
              return (
                <div
                  key={`${chartId}-legend-${index}`}
                  className={`flex items-center gap-1.5 md:gap-2 p-1.5 md:p-2 rounded transition-all duration-200 cursor-pointer ${
                    isHovered ? "bg-gray-50" : ""
                  } ${hoveredSegment !== null && !isHovered ? "opacity-40" : ""}`}
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  onTouchStart={() => setHoveredSegment(index)}
                  onTouchEnd={() => setHoveredSegment(null)} // FIXED: Added cleanup
                >
                  <div
                    className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] md:text-xs text-gray-600 truncate">
                      {item.name}
                    </div>
                    <div
                      className="text-xs md:text-sm font-bold"
                      style={{ color: item.color }}
                    >
                      {item.value}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    },
    [getHoverState]
  );

  return (
    <Layout
      breadcrumbs={[
        {
          name: "Dashboard",
          target: "/dashboard",
        },
      ]}
    >
      <section className="flex flex-1 flex-col gap-3 md:gap-4 overflow-hidden p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Dashboard
            </h2>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* Total Pengunjung */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-sm text-gray-600 mb-1 md:mb-2 truncate">
                    Total Pengunjung
                  </p>
                  <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1.5 md:mb-3">
                    40,689
                  </h3>
                  <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-xs">
                    <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600 flex-shrink-0" />
                    <span className="text-green-600 font-medium">8.5%</span>
                    <span className="text-gray-500 truncate">sejak kemarin</span>
                  </div>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 ml-2">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Transaksi */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-sm text-gray-600 mb-1 md:mb-2 truncate">
                    Total Transaksi
                  </p>
                  <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1.5 md:mb-3">
                    10,293
                  </h3>
                  <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-xs">
                    <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600 flex-shrink-0" />
                    <span className="text-green-600 font-medium">1.3%</span>
                    <span className="text-gray-500 truncate">minggu terakhir</span>
                  </div>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 ml-2">
                  <ShoppingCart className="w-4 h-4 md:w-6 md:h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wahana Aktif */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-sm text-gray-600 mb-1 md:mb-2 truncate">
                    Wahana Aktif
                  </p>
                  <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1.5 md:mb-3">
                    234
                  </h3>
                  <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-xs">
                    <TrendingDown className="w-2.5 h-2.5 md:w-3 md:h-3 text-red-600 flex-shrink-0" />
                    <span className="text-red-600 font-medium">4.3%</span>
                    <span className="text-gray-500 truncate">bulan terakhir</span>
                  </div>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 ml-2">
                  <Activity className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Anjungan Aktif */}
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-3 md:p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-sm text-gray-600 mb-1 md:mb-2 truncate">
                    Anjungan Aktif
                  </p>
                  <h3 className="text-xl md:text-3xl font-bold text-gray-900 mb-1.5 md:mb-3">
                    123
                  </h3>
                  <div className="flex items-center gap-0.5 md:gap-1 text-[9px] md:text-xs">
                    <TrendingUp className="w-2.5 h-2.5 md:w-3 md:h-3 text-green-600 flex-shrink-0" />
                    <span className="text-green-600 font-medium">1.8%</span>
                    <span className="text-gray-500 truncate">bulan terakhir</span>
                  </div>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 ml-2">
                  <Timer className="w-4 h-4 md:w-6 md:h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {/* Data Kunjungan Anjungan */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 md:p-4">
              <div className="mb-3 md:mb-4">
                <h2 className="text-sm md:text-base font-semibold text-gray-900">
                  Data Kunjungan Anjungan
                </h2>
                <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">
                  *Data per Sabtu, 12 Desember 2025
                </p>
              </div>
              {renderDonutChart(anjunganData, "anjungan")}
            </CardContent>
          </Card>

          {/* Data Kunjungan Wahana */}
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-3 md:p-4">
              <div className="mb-3 md:mb-4">
                <h2 className="text-sm md:text-base font-semibold text-gray-900">
                  Data Kunjungan Wahana
                </h2>
                <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">
                  *Data per Sabtu, 12 Desember 2025
                </p>
              </div>
              {renderDonutChart(wahanaData, "wahana")}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}