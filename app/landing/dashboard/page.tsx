"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Settings,
  CreditCard,
  DollarSign,
  Car,
  Building2,
  Users,
} from "lucide-react";

type MenuItem = {
  label: string;
  icon: React.ElementType;
  href?: string;
};

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Wahana x Anjungan",
    icon: Users,
    href: "/landing/wahana",
  },
  {
    label: "Parkir",
    icon: Car,
    href: "/landing/parkir",
  },
  {
    label: "Merchant/Tenant",
    icon: Building2,
    href: "/landing/merchant",
  },
  {
    label: "Cek Saldo",
    icon: CreditCard,
    href: "/landing/saldo",
  },
  {
    label: "Top Up",
    icon: DollarSign,
    href: "/landing/topup"
  },
  {
    label: "Pengaturan",
    icon: Settings,
  },
];

export default function Dashboard() {
  const [saldo] = useState(250000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
          <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition">
            U
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Title Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 flex items-center justify-center">
          <h1 className="text-3xl font-bold text-red-600">tmii</h1>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-3 gap-6">
          {MENU_ITEMS.map(({ label, icon: Icon, href }) =>
            href ? (
              <Link
                key={label}
                href={href}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center justify-center gap-4 group hover:scale-105"
              >
                <Icon className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium text-center">
                  {label}
                </span>
              </Link>
            ) : (
              <button
                key={label}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center justify-center gap-4 group hover:scale-105"
              >
                <Icon className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium text-center">
                  {label}
                </span>
              </button>
            )
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Taman Mini Indonesia Indah - Platform Pembayaran Digital
          </p>
        </div>
      </main>
    </div>
  );
}
