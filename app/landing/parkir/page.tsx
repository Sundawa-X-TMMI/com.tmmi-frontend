"use client";

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Printer, X } from 'lucide-react';

export default function Parkir() {
  const [step, setStep] = useState('checkin'); // checkin, checkout, success
  const [showReceipt, setShowReceipt] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => window.history.back()} className="hover:bg-gray-100 p-2 rounded-lg mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Parkir</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Check In */}
        {step === 'checkin' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Selamat Datang di TMII!</h2>

            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="30" cy="50" r="20" opacity="0.3"/>
                  <circle cx="30" cy="50" r="15" opacity="0.5"/>
                  <circle cx="30" cy="50" r="10"/>
                  <path d="M45 35 L70 35 L70 45 L55 45 L55 55 L70 55 L70 65 L45 65 Z" opacity="0.7"/>
                </svg>
              </div>
              <p className="text-gray-600 text-lg">
                Tap kartu pada sensor untuk masuk.
              </p>
            </div>

            <button
              onClick={() => setStep('checkout')}
              className="bg-gray-100 text-gray-400 px-6 py-3 rounded-xl cursor-not-allowed"
              disabled
            >
              Menunggu tap kartu...
            </button>
          </div>
        )}

        {/* Check Out */}
        {step === 'checkout' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Sampai Jumpa lagi di TMII!</h2>

            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="30" cy="50" r="20" opacity="0.3"/>
                  <circle cx="30" cy="50" r="15" opacity="0.5"/>
                  <circle cx="30" cy="50" r="10"/>
                  <path d="M45 35 L70 35 L70 45 L55 45 L55 55 L70 55 L70 65 L45 65 Z" opacity="0.7"/>
                </svg>
              </div>
              <p className="text-gray-600 text-lg">
                Tap kartu pada sensor untuk keluar.
              </p>
            </div>

            <button
              onClick={() => { setStep('success'); setShowReceipt(true); }}
              className="bg-gray-100 text-gray-400 px-6 py-3 rounded-xl cursor-not-allowed"
              disabled
            >
              Menunggu tap kartu...
            </button>
          </div>
        )}

        {/* Success Receipt */}
        {step === 'success' && showReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <button onClick={() => { setShowReceipt(false); setStep('checkin'); }} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Check out berhasil!</h2>
                  <p className="text-gray-600 text-sm">Sisa saldo: Rp. 320.000</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Transaksi</span>
                    <span className="font-medium">TD243595</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check in</span>
                    <span className="font-medium">07:30 GATE 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check out</span>
                    <span className="font-medium">08:00 GATE 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Terminal ID</span>
                    <span className="font-medium">EDC-SELADA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kiosir</span>
                    <span className="font-medium">kasir</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jenis Kendaraan</span>
                    <span className="font-medium">Mobil</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nomor Polisi</span>
                    <span className="font-medium">D234650</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori</span>
                    <span className="font-medium">Pengunjung</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal Masuk</span>
                    <span className="font-medium">19/12/2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal Keluar</span>
                    <span className="font-medium">19/12/2025 08:14:15</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tarif per flat</span>
                    <span className="font-medium">Rp 3.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Pembayaran</span>
                    <span className="font-medium">Rp 6.500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Metode Pembayaran</span>
                    <span className="font-medium">Kartu</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Approval Code</span>
                    <span className="font-medium">23850214</span>
                  </div>
                </div>

                <button className="w-full mb-3 py-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50">
                  <Printer className="w-5 h-5" />
                  <span>Print Struk</span>
                </button>

                <button
                  onClick={() => { setShowReceipt(false); setStep('checkin'); }}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600"
                >
                  Selesai
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}