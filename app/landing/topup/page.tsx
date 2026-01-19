"use client";

import React, { useState, useCallback, useEffect, useReducer } from 'react';
import { ArrowLeft, CheckCircle, Mail, Printer, X } from 'lucide-react';

// FIXED: Use reducer for complex state management to prevent race conditions
type State = {
  step: 'input' | 'card' | 'success';
  amount: string;
  showReceipt: boolean;
};

type Action =
  | { type: 'SET_AMOUNT'; payload: string }
  | { type: 'PROCEED_TO_CARD' }
  | { type: 'SHOW_SUCCESS' }
  | { type: 'RESET' };

const initialState: State = {
  step: 'input',
  amount: '',
  showReceipt: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload };
    case 'PROCEED_TO_CARD':
      return { ...state, step: 'card' };
    case 'SHOW_SUCCESS':
      return { ...state, step: 'success', showReceipt: true };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export default function TopUp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleNumberClick = useCallback((num: string): void => {
    if (num === 'del') {
      dispatch({ type: 'SET_AMOUNT', payload: state.amount.slice(0, -1) });
    } else {
      // FIXED: Prevent adding multiple leading zeros
      if (state.amount === '0' && num === '0') return;
      if (state.amount === '' && num === '0') return;

      // FIXED: Limit to reasonable amount (max 10 digits)
      if (state.amount.length >= 10) return;

      dispatch({ type: 'SET_AMOUNT', payload: state.amount + num });
    }
  }, [state.amount]);

  const formatCurrency = useCallback((value: string): string => {
    if (!value) return 'Rp 0';
    const numValue = parseInt(value);
    if (isNaN(numValue)) return 'Rp 0';
    return `Rp ${numValue.toLocaleString('id-ID')}`;
  }, []);

  const handleCardStep = useCallback((): void => {
    const numAmount = parseInt(state.amount || '0');
    if (numAmount > 0) {
      dispatch({ type: 'PROCEED_TO_CARD' });
    }
  }, [state.amount]);

  const handleSuccess = useCallback((): void => {
    dispatch({ type: 'SHOW_SUCCESS' });
  }, []);

  const handleCloseReceipt = useCallback((): void => {
    dispatch({ type: 'RESET' });
  }, []);

  // FIXED: Calculate values with proper validation
  const calculations = useCallback(() => {
    const amount = parseInt(state.amount || '0');
    const adminFee = 2500;
    const initialBalance = 50000;

    return {
      amount: isNaN(amount) ? 0 : amount,
      adminFee,
      total: isNaN(amount) ? adminFee : amount + adminFee,
      finalBalance: isNaN(amount) ? initialBalance : initialBalance + amount,
      initialBalance
    };
  }, [state.amount]);

  const calc = calculations();

  // FIXED: Keyboard support for number input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (state.step !== 'input') return;

      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (e.key === 'Backspace') {
        handleNumberClick('del');
      } else if (e.key === 'Enter') {
        handleCardStep();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.step, handleNumberClick, handleCardStep]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => window.history.back()}
            className="hover:bg-gray-100 p-2 rounded-lg mr-4"
            type="button"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Top Up Saldo</h1>
        </div>
      </header>

      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Input Amount */}
        {state.step === 'input' && (
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Masukkan Nominal Top Up</p>
              <div className="text-4xl font-bold text-gray-900 mb-4 min-h-[3rem] flex items-center justify-center">
                {formatCurrency(state.amount)}
              </div>
              <p className="text-xs text-gray-500">
                Minimum: Rp 10.000 | Maximum: Rp 10.000.000
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="aspect-square text-2xl font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl transition active:scale-95"
                    type="button"
                    aria-label={`Number ${num}`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => handleNumberClick('del')}
                  className="aspect-square text-xl bg-gray-50 hover:bg-gray-100 rounded-xl transition active:scale-95"
                  type="button"
                  aria-label="Delete"
                  disabled={!state.amount}
                >
                  ←
                </button>
                <button
                  onClick={() => handleNumberClick('0')}
                  className="aspect-square text-2xl font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl transition active:scale-95"
                  type="button"
                  aria-label="Number 0"
                >
                  0
                </button>
                <button
                  onClick={handleCardStep}
                  disabled={!state.amount || parseInt(state.amount) === 0}
                  className={`aspect-square text-xl rounded-xl transition active:scale-95 ${
                    state.amount && parseInt(state.amount) > 0
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  type="button"
                  aria-label="Proceed"
                >
                  →
                </button>
              </div>

              {/* Quick amount buttons */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                {[50000, 100000, 200000].map(amount => (
                  <button
                    key={amount}
                    onClick={() => dispatch({ type: 'SET_AMOUNT', payload: amount.toString() })}
                    className="py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                    type="button"
                  >
                    {formatCurrency(amount.toString())}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tap Card */}
        {state.step === 'card' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-bold mb-6">Top Up Saldo</h2>

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
                Silakan tap kartu untuk melakukan top up saldo.
              </p>
              <div className="text-2xl font-bold text-gray-900 mb-2">
                {formatCurrency(state.amount)}
              </div>
              <p className="text-sm text-gray-500">
                Total: {formatCurrency(calc.total.toString())}
              </p>
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
              onClick={() => dispatch({ type: 'RESET' })}
              className="text-gray-600 hover:text-gray-800"
              type="button"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Success Receipt */}
        {state.step === 'success' && state.showReceipt && (
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
                  <h2 className="text-xl font-bold mb-2">Top Up Saldo Berhasil</h2>
                  <p className="text-gray-600 text-sm">Transaksimu berhasil dilakukan.</p>
                </div>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Top Up Saldo</span>
                    <span className="font-medium">{formatCurrency(calc.amount.toString())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Transaksi</span>
                    <span className="font-medium">TU{Date.now().toString().slice(-8)}</span>
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
                    <span className="text-gray-600">No. Kartu</span>
                    <span className="font-medium">2746 9847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saldo Awal</span>
                    <span className="font-medium">Rp {calc.initialBalance.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nominal Top Up</span>
                    <span className="font-medium">{formatCurrency(calc.amount.toString())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Admin</span>
                    <span className="font-medium">Rp {calc.adminFee.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="font-bold">Total Pembayaran</span>
                    <span className="font-bold">Rp {calc.total.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-green-600">Sisa Saldo</span>
                    <span className="font-bold text-green-600">Rp {calc.finalBalance.toLocaleString('id-ID')}</span>
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