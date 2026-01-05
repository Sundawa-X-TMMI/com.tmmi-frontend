"use client";

import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Mail, Printer, X } from 'lucide-react';

export default function TopUp() {
  const [step, setStep] = useState('input'); // input, card, success
  const [amount, setAmount] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);

  const handleNumberClick = (num) => {
    if (num === 'del') {
      setAmount(amount.slice(0, -1));
    } else {
      setAmount(amount + num);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return 'Rp 0';
    return `Rp ${parseInt(value).toLocaleString('id-ID')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button onClick={() => window.history.back()} className="hover:bg-gray-100 p-2 rounded-lg mr-4">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Top Up Saldo</h1>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Input Amount */}
        {step === 'input' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Masukkan Nominal Top Up</p>
              <div className="text-4xl font-bold text-gray-900 mb-4 min-h-[3rem] flex items-center justify-center">
                {formatCurrency(amount)}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="aspect-square text-2xl font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl transition"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleNumberClick('del')}
                  className="aspect-square text-xl bg-gray-50 hover:bg-gray-100 rounded-xl transition"
                >
                  ←
                </button>
                <button
                  onClick={() => handleNumberClick('0')}
                  className="aspect-square text-2xl font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl transition"
                >
                  0
                </button>
                <button
                  onClick={() => setStep('card')}
                  disabled={!amount || parseInt(amount) === 0}
                  className={`aspect-square text-xl rounded-xl transition ${
                    amount && parseInt(amount) > 0
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tap Card */}
        {step === 'card' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-bold mb-6">Top Up Saldo</h2>

            <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-6 text-gray-300">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="30" cy="50" r="20" opacity="0.3"/>
                  <circle cx="30" cy="50" r="15" opacity="0.5"/>
                  <circle cx="30" cy="50" r="10"/>
                  <path d="M45 35 L70 35 L70 45 L55 45 L55 55 L70 55 L70 65 L45 65 Z" opacity="0.7"/>
                </svg>
              </div>
              <p className="text-gray-600 text-lg mb-4">
                Silakan tap kartu untuk melakukan top up saldo.
              </p>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(amount)}
              </div>
            </div>

            <button
              onClick={() => { setStep('success'); setShowReceipt(true); }}
              className="bg-gray-100 text-gray-400 px-8 py-3 rounded-xl cursor-not-allowed"
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
                  <button onClick={() => { setShowReceipt(false); setStep('input'); setAmount(''); }} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Top Up Saldo Berhasil</h2>
                  <p className="text-gray-600 text-sm">Transaksimu berhasil dilakukan.</p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top Up Saldo</span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Transaksi</span>
                    <span className="font-medium">235135678</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal</span>
                    <span className="font-medium">Selasa, 02 Des 2025, 12:45:23 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">No. Kartu</span>
                    <span className="font-medium">2746 9847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saldo Awal</span>
                    <span className="font-medium">Rp 50.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nominal Top Up</span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Admin</span>
                    <span className="font-medium">Rp 2.500</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total Pembayaran</span>
                    <span className="font-bold">Rp {(parseInt(amount || 0) + 2500).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-green-600">Sisa Saldo</span>
                    <span className="font-bold text-green-600">Rp {(50000 + parseInt(amount || 0)).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mb-6">
                  <button className="flex-1 py-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50">
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">Kirim ke Email</span>
                  </button>
                  <button className="flex-1 py-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50">
                    <Printer className="w-5 h-5" />
                    <span className="text-sm">Print Struk</span>
                  </button>
                </div>

                <button
                  onClick={() => { setShowReceipt(false); setStep('input'); setAmount(''); }}
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