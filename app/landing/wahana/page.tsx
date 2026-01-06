"use client";

import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, CheckCircle, Mail, Printer, X } from 'lucide-react';

type WahanaItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export default function WahanaAnjungan() {
  const [activeTab, setActiveTab] = useState<string>('wahana');
  const [selectedItem, setSelectedItem] = useState<WahanaItem | null>(null);
  const [quantity, setQuantity] = useState<number>(25);
  const [step, setStep] = useState<string>('list');
  const [showReceipt, setShowReceipt] = useState<boolean>(false);

  const wahanaItems: WahanaItem[] = [
    { id: 1, name: 'Museum', image: '🏛️', price: 25000 },
    { id: 2, name: 'Rumah Ibadah', image: '🕌', price: 25000 },
    { id: 3, name: 'Wahana Rekreasi', image: '🎢', price: 25000 },
    { id: 4, name: 'Taman Mini Hijau', image: '🌳', price: 25000 }
  ];

  const anjunganItems: WahanaItem[] = [
    { id: 1, name: 'Museum', image: '🏛️', price: 25000 },
    { id: 2, name: 'Rumah Ibadah', image: '🕌', price: 25000 }
  ];

  const items = activeTab === 'wahana' ? wahanaItems : anjunganItems;

  const handleSelectItem = (item: WahanaItem): void => {
    setSelectedItem(item);
    setStep('detail');
  };

  const calculateTotal = (): { subtotal: number; admin: number; total: number } => {
    const subtotal = selectedItem ? selectedItem.price * quantity : 0;
    const admin = 2500;
    return { subtotal, admin, total: subtotal + admin };
  };

  const totals = calculateTotal();

  const handleBackClick = (): void => {
    if (step === 'list') {
      window.history.back();
    } else {
      setStep('list');
    }
  };

  const handleTabChange = (tab: string): void => {
    setActiveTab(tab);
  };

  const handleQuantityDecrease = (): void => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleQuantityIncrease = (): void => {
    setQuantity(quantity + 1);
  };

  const handlePayment = (): void => {
    setStep('payment');
  };

  const handleSuccess = (): void => {
    setStep('success');
    setShowReceipt(true);
  };

  const handleCloseReceipt = (): void => {
    setShowReceipt(false);
    setStep('list');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={handleBackClick}
            className="hover:bg-gray-100 p-2 rounded-lg mr-4"
            type="button"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Wahana x Anjungan</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* List View */}
        {step === 'list' && (
          <div>
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                onClick={() => handleTabChange('wahana')}
                className={`flex-1 pb-3 text-center font-medium transition ${
                  activeTab === 'wahana'
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-500'
                }`}
                type="button"
              >
                Wahana
              </button>
              <button
                onClick={() => handleTabChange('anjungan')}
                className={`flex-1 pb-3 text-center font-medium transition ${
                  activeTab === 'anjungan'
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-500'
                }`}
                type="button"
              >
                Anjungan
              </button>
            </div>

            {/* Grid Items */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4"
                  type="button"
                >
                  <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-3 flex items-center justify-center text-6xl">
                    {item.image}
                  </div>
                  <h3 className="font-medium text-center">{item.name}</h3>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detail View */}
        {step === 'detail' && selectedItem && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <span className="text-9xl">{selectedItem.image}</span>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-2">*Harga Tiket Rp {selectedItem.price.toLocaleString('id-ID')}</p>
                <p className="text-gray-700 mb-4">
                  Museum Pusaka yang memiliki luas 1.535 m2 ini menarik mata dengan atapnya yang berbentuk keris.
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Jumlah Tiket
                  </label>
                  <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-xl p-4">
                    <button
                      onClick={handleQuantityDecrease}
                      className="w-12 h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-100"
                      type="button"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-3xl font-bold w-20 text-center">{quantity}</span>
                    <button
                      onClick={handleQuantityIncrease}
                      className="w-12 h-12 bg-white border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-100"
                      type="button"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">Rp {totals.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition"
                  type="button"
                >
                  Bayar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment View */}
        {step === 'payment' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
              <h2 className="text-xl font-bold mb-6">{selectedItem?.name}</h2>

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
                  Silakan tap kartu untuk melakukan pembayaran tiket {selectedItem?.name}.
                </p>
              </div>

              <button
                onClick={handleSuccess}
                className="bg-gray-100 text-gray-400 px-8 py-3 rounded-xl cursor-not-allowed"
                disabled
                type="button"
              >
                Menunggu tap kartu...
              </button>
            </div>
          </div>
        )}

        {/* Success Receipt */}
        {step === 'success' && showReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <button
                    onClick={handleCloseReceipt}
                    className="text-gray-500 hover:text-gray-700"
                    type="button"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    type="button"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>

                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">Pembelian Tiket Berhasil</h2>
                  <p className="text-gray-600 text-sm">Transaksimu berhasil dilakukan.</p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nama Wahana/Anjungan</span>
                    <span className="font-medium">{selectedItem?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jam Operasional</span>
                    <span className="font-medium">10:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal</span>
                    <span className="font-medium">Selasa, 02 Des 2025, 12:45:23 WIB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah Tiket</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga per Tiket</span>
                    <span className="font-medium">Rp {selectedItem?.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rp {totals.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Admin</span>
                    <span className="font-medium">Rp {totals.admin.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total Pembayaran</span>
                    <span className="font-bold">Rp {totals.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mb-6">
                  <button
                    className="flex-1 py-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50"
                    type="button"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">Kirim ke Email</span>
                  </button>
                  <button
                    className="flex-1 py-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50"
                    type="button"
                  >
                    <Printer className="w-5 h-5" />
                    <span className="text-sm">Print Struk</span>
                  </button>
                </div>

                <button
                  onClick={handleCloseReceipt}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600"
                  type="button"
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