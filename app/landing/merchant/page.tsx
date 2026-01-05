"use client";

import React, { useState } from 'react';
import { ArrowLeft, Search, ShoppingCart, Plus, Minus, Mail, Printer, X, CheckCircle } from 'lucide-react';
type Merchant = {
  id: number;
  name: string;
  type: string;
  status: string;
};


export default function MerchantTenant() {
  const [step, setStep] = useState('list'); // list, order, payment, success
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [cart, setCart] = useState([]);
  const [showReceipt, setShowReceipt] = useState(false);

  const merchants = [
    { id: 1, name: 'Solaria Merchant', type: 'Restaurant', status: 'kasir' },
    { id: 1, name: 'Chicken Merchant', type: 'Restaurant', status: 'kasir' }
  ];

  const menuItems = [
    { id: 1, name: 'Latte', price: 29000, image: '☕' },
    { id: 2, name: 'Nasi Goreng', price: 35000, image: '🍚' },
    { id: 3, name: 'Kentang Goreng', price: 24000, image: '🍟' }
  ];

  const [orderItems, setOrderItems] = useState([
    { id: 1, name: 'Latte', price: 29000, qty: 0 },
    { id: 2, name: 'Nasi Goreng', price: 35000, qty: 0 },
    { id: 3, name: 'Kentang Goreng', price: 24000, qty: 0 }
  ]);

  const updateQty = (id, delta) => {
    setOrderItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const calculateTotal = () => {
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const service = 12000;
    const tax = 12000;
    return { subtotal, service, tax, total: subtotal + service + tax };
  };

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={() => setStep('list')} className="hover:bg-gray-100 p-2 rounded-lg">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-bold">
                {step === 'list' ? 'Merchant/Tenant' : 'Order #12345'}
              </h1>
              {step !== 'list' && (
                <p className="text-sm text-blue-500">Solaria Merchant</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* List Merchant */}
        {step === 'list' && (
          <div>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Cari menu"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {merchants.map(merchant => (
                <button
                  key={merchant.id}
                  onClick={() => { setSelectedMerchant(merchant); setStep('order'); }}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{merchant.name}</h3>
                      <p className="text-sm text-gray-500">{merchant.type}</p>
                    </div>
                    <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                      {merchant.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div className="bg-red-50 px-4 py-2 rounded-lg flex-1 text-center">
                      <p className="text-sm text-gray-600">Order #12345</p>
                      <p className="text-xs text-gray-500">3 items</p>
                    </div>
                    <div className="bg-red-50 px-4 py-2 rounded-lg flex-1 text-center">
                      <p className="text-sm text-gray-600">Order #12345</p>
                      <p className="text-xs text-gray-500">5 items</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Order Details */}
        {step === 'order' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Nomor Meja</h2>
                <button className="text-red-500 text-sm">Dine in</button>
              </div>

              <div className="mb-4">
                <h3 className="text-sm text-gray-600 mb-2">Customer</h3>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    A
                  </div>
                  <span className="font-medium">Amelia</span>
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-4">Item</h3>
            <div className="space-y-3">
              {orderItems.map(item => (
                <div key={item.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-xl">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">
                    {item.name.includes('Latte') ? '☕' : item.name.includes('Nasi') ? '🍚' : '🍟'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="font-bold text-lg w-24 text-right">
                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep('payment')}
              className="w-full mt-6 bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition"
            >
              Proses Order
            </button>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 py-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50">
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Payment */}
        {step === 'payment' && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
              <h2 className="text-lg font-bold mb-2">Masukkan Nominal Bayar</h2>
              <div className="text-4xl font-bold text-gray-900 mb-4">
                Rp 150.000
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-24 h-24 text-gray-300">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="30" cy="50" r="20" opacity="0.3"/>
                    <circle cx="30" cy="50" r="15" opacity="0.5"/>
                    <circle cx="30" cy="50" r="10"/>
                    <path d="M45 35 L70 35 L70 45 L55 45 L55 55 L70 55 L70 65 L45 65 Z" opacity="0.7"/>
                  </svg>
                </div>
              </div>
              <p className="text-center text-gray-600 mb-6">
                Silakan tap kartu untuk melakukan pembayaran.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-4 mt-4">
              <div className="grid grid-cols-3 gap-2">
                {[1,2,3,4,5,6,7,8,9].map(num => (
                  <button key={num} className="py-4 text-xl font-semibold hover:bg-gray-100 rounded-xl">
                    {num}
                  </button>
                ))}
                <button className="py-4 text-xl hover:bg-gray-100 rounded-xl">* #</button>
                <button className="py-4 text-xl font-semibold hover:bg-gray-100 rounded-xl">0</button>
                <button className="py-4 text-xl hover:bg-gray-100 rounded-xl">+ .</button>
              </div>
              <button
                onClick={() => { setStep('success'); setShowReceipt(true); }}
                className="w-full mt-4 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600"
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {step === 'success' && showReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <button onClick={() => setShowReceipt(false)} className="text-gray-500 hover:text-gray-700">
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
                  <h2 className="text-xl font-bold mb-2">Bayar Merchant Berhasil</h2>
                  <p className="text-gray-600 text-sm">Transaksimu berhasil dilakukan.</p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nomor Bill</span>
                    <span className="font-medium">B26q8658</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nominal Bill</span>
                    <span className="font-medium">Rp 112.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transaksi</span>
                    <span className="font-medium">Solaria Merchant</span>
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
                    <span className="text-gray-600">Biaya Admin</span>
                    <span className="font-medium">Rp 2.500</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total Pembayaran</span>
                    <span className="font-bold">Rp 124.500</span>
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
                  onClick={() => { setShowReceipt(false); setStep('list'); }}
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