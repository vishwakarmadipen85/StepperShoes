'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCartStore } from '@/store/useCartStore';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import OrderTracker from '@/components/checkout/OrderTracker';
import config from '@/config';
import { useAuth } from '@/context/AuthContext';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
    const { items, clearCart } = useCartStore();
    const { token, isAuthenticated } = useAuth();
    const [step, setStep] = useState(1);
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [addressForm, setAddressForm] = useState({
        firstName: '', lastName: '', email: '', address: '', city: '', postalCode: ''
    });

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 250;
    const total = subtotal + shipping - discount;

    const handleApplyPromo = () => {
        if (promoCode.toUpperCase() === 'WELCOME10') {
            setDiscount(subtotal * 0.1);
        } else {
            alert('Invalid Promo Code');
        }
    };

    if (items.length === 0 && step !== 3) {
        return (
            <main className="min-h-screen bg-[#FAF9F6] pt-48 flex flex-col items-center justify-center text-center">
                <Navbar />
                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Your Cart is Empty</h1>
                <Link href="/collections" className="bg-black text-white px-8 py-4 font-bold rounded-full uppercase tracking-widest text-sm hover:bg-gray-900 transition-colors">
                    Continue Shopping
                </Link>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#FAF9F6] pt-32">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-12">
                    <span className={step >= 1 ? 'text-black' : ''}>1. Shipping</span>
                    <ChevronRight size={14} />
                    <span className={step >= 2 ? 'text-black' : ''}>2. Payment</span>
                    <ChevronRight size={14} />
                    <span className={step === 3 ? 'text-black' : ''}>3. Confirmation</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Column (Forms) */}
                    <div className="lg:col-span-7 space-y-8">
                        {step === 1 && (
                            <div className="bg-white p-8 rounded-3xl border border-black/5 space-y-6 shadow-sm">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Shipping Details</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input value={addressForm.firstName} onChange={e => setAddressForm({...addressForm, firstName: e.target.value})} type="text" placeholder="First Name" className="col-span-1 bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium outline-none focus:border-black" />
                                    <input value={addressForm.lastName} onChange={e => setAddressForm({...addressForm, lastName: e.target.value})} type="text" placeholder="Last Name" className="col-span-1 bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium outline-none focus:border-black" />
                                    <input value={addressForm.email} onChange={e => setAddressForm({...addressForm, email: e.target.value})} type="email" placeholder="Email Address" className="col-span-2 bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium outline-none focus:border-black" />
                                    <input value={addressForm.address} onChange={e => setAddressForm({...addressForm, address: e.target.value})} type="text" placeholder="Address" className="col-span-2 bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium outline-none focus:border-black" />
                                    <input value={addressForm.city} onChange={e => setAddressForm({...addressForm, city: e.target.value})} type="text" placeholder="City" className="col-span-1 bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium outline-none focus:border-black" />
                                    <input value={addressForm.postalCode} onChange={e => setAddressForm({...addressForm, postalCode: e.target.value})} type="text" placeholder="Postal Code" className="col-span-1 bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium outline-none focus:border-black" />
                                </div>
                                <button onClick={() => setStep(2)} className="w-full bg-black text-white font-bold py-5 rounded-xl uppercase tracking-widest hover:bg-gray-900 transition-all">
                                    Continue to Payment
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="bg-white p-8 rounded-3xl border border-black/5 space-y-6 shadow-sm">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Payment Method</h2>
                                <div className="grid grid-cols-1 gap-4">
                                    {/* Razorpay Option */}
                                    <label className={`cursor-pointer p-6 border rounded-xl flex flex-col gap-4 transition-all ${paymentMethod === 'razorpay' ? 'border-black bg-gray-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="payment" value="razorpay" checked={paymentMethod === 'razorpay'} onChange={() => setPaymentMethod('razorpay')} className="w-5 h-5 accent-black" />
                                                <span className="font-bold uppercase tracking-widest text-sm">Razorpay</span>
                                            </div>
                                            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded">WALLETS / NETBANKING</span>
                                        </div>
                                    </label>

                                    {/* UPI Option */}
                                    <label className={`cursor-pointer p-6 border rounded-xl flex flex-col gap-4 transition-all ${paymentMethod === 'upi' ? 'border-black bg-gray-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <div className="flex items-center gap-3">
                                            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-5 h-5 accent-black" />
                                            <span className="font-bold uppercase tracking-widest text-sm">UPI (GPay, PhonePe, Paytm)</span>
                                        </div>
                                        {paymentMethod === 'upi' && (
                                            <div className="pl-8 pt-2">
                                                <input type="text" placeholder="Enter UPI ID (e.g., name@okicici)" className="w-full max-w-sm bg-white border border-gray-300 p-3 rounded-lg font-medium outline-none focus:border-black text-sm transition-all" />
                                            </div>
                                        )}
                                    </label>

                                    {/* Credit/Debit Card Option */}
                                    <label className={`cursor-pointer p-6 border rounded-xl flex flex-col gap-4 transition-all ${paymentMethod === 'card' ? 'border-black bg-gray-50 shadow-md' : 'border-gray-200 hover:border-gray-300'}`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 accent-black" />
                                                <span className="font-bold uppercase tracking-widest text-sm">Credit / Debit Card</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="w-8 h-5 bg-blue-800 rounded flex items-center justify-center text-[8px] font-bold text-white italic">VISA</div>
                                                <div className="w-8 h-5 bg-orange-500 rounded flex items-center justify-center text-[8px] font-bold text-white italic">MC</div>
                                            </div>
                                        </div>
                                        {paymentMethod === 'card' && (
                                            <div className="pl-8 space-y-3 pt-2">
                                                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-1">
                                                    <ShieldCheck size={14} className="text-green-600" /> Secure encrypted payment
                                                </div>
                                                <input type="text" placeholder="Card Number" className="w-full bg-white border border-gray-300 p-3 rounded-lg font-medium outline-none focus:border-black text-sm" />
                                                <div className="grid grid-cols-2 gap-3 max-w-xs">
                                                    <input type="text" placeholder="MM/YY" className="w-full bg-white border border-gray-300 p-3 rounded-lg font-medium outline-none focus:border-black text-sm" />
                                                    <input type="text" placeholder="CVC" className="w-full bg-white border border-gray-300 p-3 rounded-lg font-medium outline-none focus:border-black text-sm" />
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} disabled={isProcessing} className="flex-1 bg-gray-100 text-black font-bold py-5 rounded-xl uppercase tracking-widest hover:bg-gray-200 transition-all disabled:opacity-50">
                                        Back
                                    </button>
                                    <button 
                                        disabled={isProcessing}
                                        onClick={async () => { 
                                            if (!isAuthenticated) {
                                                alert("Please log in first to complete your checkout.");
                                                return;
                                            }
                                            setIsProcessing(true);
                                            try {
                                                if (paymentMethod === 'razorpay' || paymentMethod === 'upi') {
                                                    const res = await fetch(`${config.API_URL}/payments/razorpay/order`, {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': `Bearer ${token}`
                                                        },
                                                        body: JSON.stringify({
                                                            items: items.map(item => ({
                                                                id: item.productId || item.id,
                                                                vendor: (item as any).vendor || '65e0f7f3a7d4a211e4000001',
                                                                variant: {
                                                                    sku: item.variant?.sku || `SKU-${item.productId || item.id}`,
                                                                    size: item.variant?.size || 9,
                                                                    color: item.variant?.color || 'Black'
                                                                },
                                                                quantity: item.quantity,
                                                                price: item.price
                                                            })),
                                                            totalAmount: total,
                                                            shippingAddress: `${addressForm.firstName} ${addressForm.lastName}, ${addressForm.address}, ${addressForm.city}, ${addressForm.postalCode}`
                                                        })
                                                    });
                                                    const data = await res.json();
                                                    if (!res.ok || data.status !== 'success') {
                                                        throw new Error(data.message || 'Failed to create Razorpay order');
                                                    }
                                                    
                                                    const options = {
                                                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_dummykey123',
                                                        amount: data.razorpayOrder.amount,
                                                        currency: data.razorpayOrder.currency,
                                                        name: "Stepper Shoes",
                                                        description: "Order Checkout Payment",
                                                        order_id: data.razorpayOrder.id,
                                                        handler: async function (response: any) {
                                                            setIsProcessing(true);
                                                            try {
                                                                const verifyRes = await fetch(`${config.API_URL}/payments/razorpay/verify`, {
                                                                    method: 'POST',
                                                                    headers: {
                                                                        'Content-Type': 'application/json',
                                                                        'Authorization': `Bearer ${token}`
                                                                    },
                                                                    body: JSON.stringify({
                                                                        razorpay_payment_id: response.razorpay_payment_id,
                                                                        razorpay_order_id: response.razorpay_order_id,
                                                                        razorpay_signature: response.razorpay_signature,
                                                                        orderId: data.orderId
                                                                    })
                                                                });
                                                                const verifyData = await verifyRes.json();
                                                                if (verifyRes.ok && verifyData.status === 'success') {
                                                                    clearCart();
                                                                    setStep(3);
                                                                } else {
                                                                    alert("Payment verification failed: " + verifyData.message);
                                                                }
                                                            } catch (err: any) {
                                                                console.error("Verification error:", err);
                                                                alert("Payment verification failed. Please try again.");
                                                            } finally {
                                                                setIsProcessing(false);
                                                            }
                                                        },
                                                        prefill: {
                                                            name: `${addressForm.firstName} ${addressForm.lastName}`,
                                                            email: addressForm.email,
                                                            contact: "9999999999"
                                                        },
                                                        theme: {
                                                            color: "#000000"
                                                        }
                                                    };
                                                    const rzp = new (window as any).Razorpay(options);
                                                    rzp.open();
                                                } else if (paymentMethod === 'card') {
                                                    // Stripe flow
                                                    const res = await fetch(`${config.API_URL}/payments/create-checkout-session`, {
                                                        method: 'POST',
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': `Bearer ${token}`
                                                        },
                                                        body: JSON.stringify({
                                                            items: items.map(item => ({
                                                                name: item.name,
                                                                price: item.price,
                                                                quantity: item.quantity,
                                                                image: item.image,
                                                                vendor: (item as any).vendor || '65e0f7f3a7d4a211e4000001'
                                                            })),
                                                            shippingAddress: `${addressForm.firstName} ${addressForm.lastName}, ${addressForm.address}, ${addressForm.city}, ${addressForm.postalCode}`
                                                        })
                                                    });
                                                    const data = await res.json();
                                                    if (data.url) {
                                                        window.location.href = data.url;
                                                    } else {
                                                        throw new Error("Failed to create Stripe checkout session");
                                                    }
                                                }
                                            } catch (error: any) {
                                                console.error(error);
                                                alert(error.message || "Checkout failed. Please try again.");
                                            } finally {
                                                setIsProcessing(false);
                                            }
                                        }} 
                                        className="flex-[2] bg-black text-white font-bold py-5 rounded-xl uppercase tracking-widest hover:bg-gray-900 transition-all disabled:opacity-50"
                                    >
                                        {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="bg-white p-12 rounded-3xl border border-black/5 text-center space-y-6 shadow-sm">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <ShieldCheck size={40} />
                                </div>
                                <h2 className="text-4xl font-black uppercase tracking-tight">Order Confirmed</h2>
                                <p className="text-gray-500 font-medium text-center">Thank you for your purchase. Your order number is #ORD-{Math.floor(Math.random() * 1000000)}.</p>
                                
                                <OrderTracker />

                                <Link href="/" className="inline-block mt-8 bg-black text-white px-8 py-4 font-bold rounded-full uppercase tracking-widest text-sm hover:bg-gray-900 transition-colors">
                                    Return to Home
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Order Summary) */}
                    {step !== 3 && (
                        <div className="lg:col-span-5">
                            <div className="bg-gray-50 p-8 rounded-3xl space-y-6 sticky top-32">
                                <h2 className="text-xl font-black uppercase tracking-tight">Order Summary</h2>
                                
                                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                                    {items.map(item => (
                                        <div key={item.id} className="flex gap-4 items-center">
                                            <div className="w-20 h-20 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold uppercase text-sm">{item.name}</h4>
                                                <p className="text-xs text-gray-500 uppercase">Size: {item.variant.size} | Color: {item.variant.color}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-gray-200 space-y-4">
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="Promo Code" 
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="flex-1 bg-white border border-gray-200 px-4 py-3 rounded-lg outline-none text-sm font-bold uppercase tracking-widest"
                                        />
                                        <button onClick={handleApplyPromo} className="bg-gray-900 text-white px-4 py-3 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-black">
                                            Apply
                                        </button>
                                    </div>
                                    
                                    <div className="space-y-2 text-sm font-bold text-gray-500">
                                        <div className="flex justify-between">
                                            <span>Subtotal</span>
                                            <span className="text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        {discount > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Discount</span>
                                                <span>-₹{discount.toLocaleString('en-IN')}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between">
                                            <span>Shipping</span>
                                            <span className="text-black">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                                        <span className="font-black uppercase tracking-widest text-gray-400 text-sm">Total</span>
                                        <span className="text-3xl font-black tracking-tighter">₹{total.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    );
}
