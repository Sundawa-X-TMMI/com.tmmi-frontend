import { HttpClientTypes } from '@/types/lib/http-client.type';

export namespace DashboardTypes {
  export namespace Service {
    export interface StatsData {
      annualPass: number;
      annualPassChange: number;
      totalPengunjung: number;
      totalPengunjungChange: number;
      jumlahEvent: number;
      jumlahEventChange: number;
      penjualanTiket: number;
      penjualanTiketChange: number;
    }

    export interface ChartDataPoint {
      name: string;
      value: number;
    }

    export interface PengunjungChartData {
      data: ChartDataPoint[];
      rataRata: number;
    }

    export interface RevenueChartData {
      data: ChartDataPoint[];
      totalCabang: number;
    }

    export interface DashboardData {
      stats: StatsData;
      pengunjungChart: PengunjungChartData;
      revenueChart: RevenueChartData;
    }

    export type DashboardResponse = HttpClientTypes.Response<DashboardData>;
  }
}