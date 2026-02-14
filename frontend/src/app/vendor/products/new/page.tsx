'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';

export default function NewProductPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">Add New Product</h1>
                <p className="text-sm text-gray-500">Fill in the details to list your product on the marketplace.</p>
            </div>

            <form className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-8">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">Basic Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Product Name</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border">
                                <option>Sneakers</option>
                                <option>Loafers</option>
                                <option>Slides</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border"></textarea>
                        </div>
                    </div>
                </div>

                {/* Media */}
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">Product Images</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-black transition-colors cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <span className="mt-2 block text-sm font-medium text-gray-900">Drop images here or click to upload</span>
                    </div>
                </div>

                {/* Inventory */}
                <div className="space-y-4">
                    <h3 className="text-base font-semibold text-gray-900 pb-2 border-b border-gray-100">Inventory</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">SKU</label>
                            <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2 border" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button type="button" className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}
