import {errServiceHandler} from "@/lib/utils";
import {isApiError} from "@/lib/exception";
import {DashboardTypes} from "@/types/features/dashboard.type";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class MockDashboardService {
  async getDashboardData(): Promise<DashboardTypes.Service.DashboardResponse> {
    try {
      await delay(500);

      return {
        code: 200,
        status: "OK",
        message: "Dashboard data retrieved successfully",
        data: {
          stats: {
            annualPass: 500234,
            annualPassChange: 8.5,
            totalPengunjung: 80876,
            totalPengunjungChange: 1.3,
            jumlahEvent: 5,
            jumlahEventChange: -4.3,
            penjualanTiket: 20000,
            penjualanTiketChange: -4.3,
          },
          pengunjungChart: {
            data: [
              { name: "Senin", value: 3000 },
              { name: "Selasa", value: 5000 },
              { name: "Rabu", value: 4500 },
              { name: "Kamis", value: 2500 },
              { name: "Jumat", value: 22000 },
              { name: "Sabtu", value: 15000 },
              { name: "Minggu", value: 8000 },
            ],
            rataRata: 2500,
          },
          revenueChart: {
            data: [
              { name: "Senin", value: 250 },
              { name: "Selasa", value: 320 },
              { name: "Rabu", value: 180 },
              { name: "Kamis", value: 280 },
              { name: "Jumat", value: 200 },
              { name: "Sabtu", value: 350 },
              { name: "Minggu", value: 400 },
            ],
            totalCabang: 8000,
          },
        },
      };
    } catch (err) {
      if (isApiError(err)) throw err;
      throw errServiceHandler(err as Error);
    }
  }
}

export default new MockDashboardService();