"use client";

import React, { useState, useCallback, useMemo, useReducer } from 'react';
import { ArrowLeft, Plus, Minus, CheckCircle, Mail, Printer, X } from 'lucide-react';

type WahanaItem = {
  id: number;
  name: string;
  image: string;
  price: number;
};

// FIXED: Use reducer for better state management
type State = {
  activeTab: 'wahana' | 'anjungan';
  selectedItem: WahanaItem | null;
  quantity: number;
  step: 'list' | 'detail' | 'payment' | 'success';
  showReceipt: boolean;
};

type Action =
  | { type: 'SET_TAB'; payload: 'wahana' | 'anjungan' }
  | { type: 'SELECT_ITEM'; payload: WahanaItem }
  | { type: 'SET_QUANTITY'; payload: number }
  | { type: 'INCREASE_QUANTITY' }
  | { type: 'DECREASE_QUANTITY' }
  | { type: 'SET_STEP'; payload: State['step'] }
  | { type: 'SHOW_RECEIPT' }
  | { type: 'RESET' };

const initialState: State = {
  activeTab: 'wahana',
  selectedItem: null,
  quantity: 1,
  step: 'list',
  showReceipt: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'SELECT_ITEM':
      return { ...state, selectedItem: action.payload, quantity: 1, step: 'detail' };
    case 'SET_QUANTITY':
      // FIXED: Validate quantity (min 1, max 50)
      const validQuantity = Math.max(1, Math.min(50, action.payload));
      return { ...state, quantity: validQuantity };
    case 'INCREASE_QUANTITY':
      return { ...state, quantity: Math.min(50, state.quantity + 1) };
    case 'DECREASE_QUANTITY':
      return { ...state, quantity: Math.max(1, state.quantity - 1) };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'SHOW_RECEIPT':
      return { ...state, step: 'success', showReceipt: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function WahanaAnjungan() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Data definitions
  const wahanaItems: WahanaItem[] = useMemo(() => [
    { id: 1, name: 'Museum', image: '🏛️', price: 25000 },
    { id: 2, name: 'Rumah Ibadah', image: '🕌', price: 25000 },
    { id: 3, name: 'Wahana Rekreasi', image: '🎢', price: 25000 },
    { id: 4, name: 'Taman Mini Hijau', image: '🌳', price: 25000 }
  ], []);

  const anjunganItems: WahanaItem[] = useMemo(() => [
    { id: 1, name: 'Museum', image: '🏛️', price: 25000 },
    { id: 2, name: 'Rumah Ibadah', image: '🕌', price: 25000 }
  ], []);

  const items = state.activeTab === 'wahana' ? wahanaItems : anjunganItems;

  // FIXED: Memoize calculations to prevent unnecessary recalculations
  const calculations = useMemo(() => {
    if (!state.selectedItem) {
      return { subtotal: 0, admin: 2500, total: 2500 };
    }
    const subtotal = state.selectedItem.price * state.quantity;
    const admin = 2500;
    return { subtotal, admin, total: subtotal + admin };
  }, [state.selectedItem, state.quantity]);

  const handleSelectItem = useCallback((item: WahanaItem): void => {
    dispatch({ type: 'SELECT_ITEM', payload: item });
  }, []);

  const handleBackClick = useCallback((): void => {
    if (state.step === 'list') {
      window.history.back();
    } else {
      dispatch({ type: 'SET_STEP', payload: 'list' });
    }
  }, [state.step]);

  const handleTabChange = useCallback((tab: 'wahana' | 'anjungan'): void => {
    dispatch({ type: 'SET_TAB', payload: tab });
  }, []);

  const handleQuantityDecrease = useCallback((): void => {
    dispatch({ type: 'DECREASE_QUANTITY' });
  }, []);

  const handleQuantityIncrease = useCallback((): void => {
    dispatch({ type: 'INCREASE_QUANTITY' });
  }, []);

  const handlePayment = useCallback((): void => {
    dispatch({ type: 'SET_STEP', payload: 'payment' });
  }, []);

  const handleSuccess = useCallback((): void => {
    dispatch({ type: 'SHOW_RECEIPT' });
  }, []);

  const handleCloseReceipt = useCallback((): void => {
    dispatch({ type: 'RESET' });
  }, []);

  const formatCurrency = useCallback((amount: number): string => {
    return `Rp ${amount.toLocaleString('id-ID')}`;
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={handleBackClick}
            className="hover:bg-gray-100 p-2 rounded-lg mr-4"
            type="button"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Wahana x Anjungan</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* List View */}
        {state.step === 'list' && (
          <div>
            {/* Tabs */}
            <div className="flex border-b mb-6">
              <button
                onClick={() => handleTabChange('wahana')}
                className={`flex-1 pb-3 text-center font-medium transition ${
                  state.activeTab === 'wahana'
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
                  state.activeTab === 'anjungan'
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
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 active:scale-95"
                  type="button"
                >
                  <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 rounded-xl mb-3 flex items-center justify-center text-6xl">
                    {item.image}
                  </div>
                  <h3 className="font-medium text-center">{item.name}</h3>
                  <p className="text-sm text-gray-500 text-center mt-1">
                    {formatCurrency(item.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Detail View */}
        {state.step === 'detail' && state.selectedItem && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <span className="text-9xl">{state.selectedItem.image}</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{state.selectedItem.name}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  *Harga Tiket {formatCurrency(state.selectedItem.price)}
                </p>
                <p className="text-gray-700 mb-6">
                  Museum Pusaka yang memiliki luas 1.535 m² ini menarik mata dengan atapnya yang berbentuk keris.
                  Kunjungi dan rasakan pengalaman budaya yang tak terlupakan.
                </p>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih Jumlah Tiket
                  </label>
                  <div className="flex items-center justify-center space-x-4 bg-gray-50 rounded-xl p-4">
                    <button
                      onClick={handleQuantityDecrease}
                      disabled={state.quantity <= 1}
                      className={`w-12 h-12 border border-gray-300 rounded-xl flex items-center justify-center transition ${
                        state.quantity <= 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      type="button"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-3xl font-bold w-20 text-center">{state.quantity}</span>
                    <button
                      onClick={handleQuantityIncrease}
                      disabled={state.quantity >= 50}
                      className={`w-12 h-12 border border-gray-300 rounded-xl flex items-center justify-center transition ${
                        state.quantity >= 50
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                      type="button"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Maximum 50 tiket per transaksi
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Subtotal ({state.quantity} tiket)</p>
                      <p className="text-2xl font-bold">{formatCurrency(calculations.subtotal)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Biaya admin</p>
                      <p className="text-sm text-gray-600">{formatCurrency(calculations.admin)}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg">{formatCurrency(calculations.total)}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition active:scale-95"
                  type="button"
                >
                  Bayar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Payment View */}
        {state.step === 'payment' && state.selectedItem && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
              <h2 className="text-xl font-bold mb-6">{state.selectedItem.name}</h2>

              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 text-gray-300 animate-pulse">
                  <svg viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="30" cy="50" r="20" opacity="0.3" />
                    <circle cx="30" cy="50" r="15" opacity="0.5" />
                    <circle cx="30" cy="50" r="10" />
                    <path d="M45 35 L70 35 L70 45 L55 45 L55 55 L70 55 L70 65 L45 65 Z" opacity="0.7" />
                  </svg>
                </div>
                <p className="text-gray-600 text-lg mb-4">
                  Silakan tap kartu untuk melakukan pembayaran tiket {state.selectedItem.name}.
                </p>
                <div className="bg-gray-50 rounded-xl p-4 inline-block">
                  <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
                  <p className="text-2xl font-bold">{formatCurrency(calculations.total)}</p>
                </div>
              </div>

              {/* Simulate card tap for demo */}
              <button
                onClick={handleSuccess}
                className="bg-blue-500 text-white px-8 py-3 rounded-xl hover:bg-blue-600 transition mb-3"
                type="button"
              >
                Simulate Card Tap (Demo)
              </button>

              <button
                onClick={() => dispatch({ type: 'SET_STEP', payload: 'detail' })}
                className="text-gray-600 hover:text-gray-800 block mx-auto"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Success Receipt */}
        {state.step === 'success' && state.showReceipt && state.selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <button
                    onClick={handleCloseReceipt}
                    className="text-gray-500 hover:text-gray-700"
                    type="button"
                    aria-label="Close"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    type="button"
                    aria-label="Share"
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
                    <span className="text-gray-600">Nama {state.activeTab === 'wahana' ? 'Wahana' : 'Anjungan'}</span>
                    <span className="font-medium">{state.selectedItem.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jam Operasional</span>
                    <span className="font-medium">10:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })} WIB
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Transaksi</span>
                    <span className="font-medium">WA{Date.now().toString().slice(-8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah Tiket</span>
                    <span className="font-medium">{state.quantity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Harga per Tiket</span>
                    <span className="font-medium">{formatCurrency(state.selectedItem.price)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(calculations.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Admin</span>
                    <span className="font-medium">{formatCurrency(calculations.admin)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total Pembayaran</span>
                    <span className="font-bold">{formatCurrency(calculations.total)}</span>
                  </div>
                </div>

                <div className="flex space-x-3 mb-6">
                  <button
                    className="flex-1 py-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
                    type="button"
                    onClick={() => alert('Email feature not implemented')}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="text-sm">Kirim ke Email</span>
                  </button>
                  <button
                    className="flex-1 py-3 border border-gray-300 rounded-xl flex items-center justify-center space-x-2 hover:bg-gray-50 transition"
                    type="button"
                    onClick={() => window.print()}
                  >
                    <Printer className="w-5 h-5" />
                    <span className="text-sm">Print Struk</span>
                  </button>
                </div>

                <button
                  onClick={handleCloseReceipt}
                  className="w-full bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition"
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