"use client";

import React, { useState } from 'react';
import { ArrowLeft, Settings, Plus, CheckCircle, Upload, X } from 'lucide-react';

export default function MerchantSettings() {
  const [step, setStep] = useState('main');
  const [activeTab, setActiveTab] = useState('kategori');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form states
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    status: ''
  });

  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    image: null,
    status: ''
  });

  const merchantInfo = {
    name: 'Solaria Merchant',
    id: '3457584896848',
    category: 'F&B'
  };

  const menuOptions = [
    { title: 'Merchant', description: 'Tambah dan kelola kategori serta produk yang dijual', icon: '🏪' },
    { title: 'Ketentuan & Privasi', description: 'Cek ketentuan penggunaan dan perlindungan data', icon: '🔒' },
    { title: 'Pusat Bantuan', description: 'Temukan solusi untuk kebutuhanmu', icon: '❓' }
  ];

  const handleCategorySubmit = () => {
    setSuccessMessage('Tambah kategori berhasil!');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setStep('main');
      setCategoryForm({ name: '', status: '' });
    }, 2000);
  };

  const handleProductSubmit = () => {
    setSuccessMessage('Tambah produk berhasil!');
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setStep('main');
      setProductForm({ name: '', category: '', price: '', image: null, status: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => step === 'main' ? window.history.back() : setStep('main')}
            className="hover:bg-gray-100 p-2 rounded-lg mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">
            {step === 'main' ? 'Pengaturan' : step === 'add-category' ? 'Merchant' : 'Merchant'}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Main Settings */}
        {step === 'main' && (
          <div>
            {/* Merchant Info Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  SM
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{merchantInfo.name}</h2>
                  <p className="text-sm text-gray-500">ID: {merchantInfo.id}</p>
                  <p className="text-sm text-gray-500">Category: {merchantInfo.category}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Menu Options */}
            <div className="space-y-3">
              {menuOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => option.title === 'Merchant' && setStep('add-category')}
                  className="w-full bg-white rounded-2xl shadow-md p-5 flex items-center space-x-4 hover:shadow-lg transition text-left"
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-2xl">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{option.title}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">Versi 1.0</p>
            </div>

            <button className="w-full mt-6 bg-orange-100 text-orange-600 py-4 rounded-xl font-bold hover:bg-orange-200 transition">
              Keluar
            </button>
          </div>
        )}

        {/* Add Category/Product */}
        {(step === 'add-category' || step === 'add-product') && (
          <div className="bg-white rounded-2xl shadow-lg">
            {/* Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => { setStep('add-category'); setActiveTab('kategori'); }}
                className={`flex-1 py-4 text-center font-medium transition ${
                  activeTab === 'kategori'
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-500'
                }`}
              >
                Kategori
              </button>
              <button
                onClick={() => { setStep('add-product'); setActiveTab('produk'); }}
                className={`flex-1 py-4 text-center font-medium transition ${
                  activeTab === 'produk'
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-500'
                }`}
              >
                Produk
              </button>
            </div>

            <div className="p-6">
              {/* Category Form */}
              {step === 'add-category' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Tambah Kategori</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <input
                      type="text"
                      placeholder="Pilih kategori"
                      value={categoryForm.name}
                      onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={categoryForm.status}
                      onChange={(e) => setCategoryForm({...categoryForm, status: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Pilih status</option>
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Non-aktif</option>
                    </select>
                  </div>

                  <button
                    onClick={handleCategorySubmit}
                    disabled={!categoryForm.name || !categoryForm.status}
                    className={`w-full py-4 rounded-xl font-bold transition ${
                      categoryForm.name && categoryForm.status
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Simpan
                  </button>
                </div>
              )}

              {/* Product Form */}
              {step === 'add-product' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Tambah Kategori</h3>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Produk
                    </label>
                    <input
                      type="text"
                      placeholder="Nama produk"
                      value={productForm.name}
                      onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kategori
                    </label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Pilih kategori</option>
                      <option value="makanan">Makanan</option>
                      <option value="minuman">Minuman</option>
                      <option value="snack">Snack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harga
                    </label>
                    <input
                      type="text"
                      placeholder="Rp 5xxx"
                      value={productForm.price}
                      onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foto Produk
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="max 2mb"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <button className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition flex items-center space-x-2">
                        <Upload className="w-4 h-4" />
                        <span>Upload</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={productForm.status}
                      onChange={(e) => setProductForm({...productForm, status: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="">Pilih status</option>
                      <option value="aktif">Aktif</option>
                      <option value="nonaktif">Non-aktif</option>
                    </select>
                  </div>

                  <button
                    onClick={handleProductSubmit}
                    disabled={!productForm.name || !productForm.category || !productForm.price || !productForm.status}
                    className={`w-full py-4 rounded-xl font-bold transition ${
                      productForm.name && productForm.category && productForm.price && productForm.status
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Simpan
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">{successMessage}</h2>
              <p className="text-gray-600 text-sm">Kategori berhasil disimpan</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}