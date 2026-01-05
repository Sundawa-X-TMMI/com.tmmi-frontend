"use client";

import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Eye, EyeOff } from 'lucide-react';

export default function CekSaldo() {
  const [step, setStep] = useState('tap'); // tap, info
  const [showBalance, setShowBalance] = useState(true);

  const cardInfo = {
    name: 'Raden Rocky',
    balance: 500000,
    cardNumber: '2746 9847',
    validUntil: '12/2027'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => window.history.back()} className="hover:bg-gray-100 p-2 rounded-lg mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Cek Saldo</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Tap Card Screen */}
        {step === 'tap' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">Tempel Kartu</h2>

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
                Silakan tap kartu untuk melakukan pengecekan saldo.
              </p>
            </div>

            <button
              onClick={() => setStep('info')}
              className="bg-gray-100 text-gray-400 px-8 py-3 rounded-xl cursor-not-allowed"
              disabled
            >
              Menunggu tap kartu...
            </button>
          </div>
        )}

        {/* Card Info Screen */}
        {step === 'info' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
              <h2 className="text-xl font-bold mb-6">Info Kartu</h2>

              {/* Card Visual */}
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-left">
                      <p className="text-xs opacity-80 mb-1">KARTU TANDA MASUK</p>
                      <p className="text-sm font-bold">TMII</p>
                    </div>
                    <CreditCard className="w-10 h-10 opacity-80" />
                  </div>

                  <div className="mb-6">
                    <p className="text-xs opacity-80 mb-2">Nama Pemegang Kartu</p>
                    <p className="text-xl font-bold">{cardInfo.name}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-80 mb-1">Nomor Kartu</p>
                      <p className="text-sm font-mono">{cardInfo.cardNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-80 mb-1">Valid Thru</p>
                      <p className="text-sm font-mono">{cardInfo.validUntil}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Balance Display */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Sisa Saldo</p>
                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                  >
                    {showBalance ? (
                      <Eye className="w-5 h-5 text-gray-600" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {showBalance ? (
                    `Rp ${cardInfo.balance.toLocaleString('id-ID')}`
                  ) : (
                    'Rp •••••••'
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep('tap')}
              className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition"
            >
              Selesai
            </button>
          </div>
        )}
      </div>
    </div>
  );
}