'use client';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Menu, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ඔයාගේ ෂොප් එකේ විස්තර මෙතන වෙනස් කරන්න
  const contactInfo = {
    phone: "071 185 8594",
    address: "Ramya Building, Dompe, Sri Lanka",
    email: "halgahawattahardware@gmail.com", // මේක නැත්නම් අයින් කරන්න පුළුවන්
    hours: "Tue - Sun: 9:300 AM - 7:30 PM"
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* --- NAVBAR --- */}
      <header className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/">
               <h1 className="text-xl md:text-2xl font-extrabold tracking-wider cursor-pointer">
                 HALGAHAWATTA <span className="text-yellow-400">HARDWARE</span>
               </h1>
            </Link>
            <nav className="hidden md:flex gap-8 font-bold text-sm uppercase items-center">
              <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
              <Link href="/products" className="hover:text-yellow-400 transition">Products</Link>
              <Link href="/contact" className="text-yellow-400">Contact</Link>
            </nav>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-800 p-4 flex flex-col gap-4">
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/contact" className="text-yellow-400">Contact</Link>
          </div>
        )}
      </header>

      {/* --- PAGE HEADER --- */}
      <div className="bg-blue-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <h1 className="text-4xl font-bold relative z-10">Get in Touch</h1>
        <p className="text-blue-200 mt-2 relative z-10">We are here to help with your construction needs</p>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Left Side: Contact Details */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-yellow-400">
               <h2 className="text-2xl font-bold text-blue-900 mb-6">Contact Information</h2>
               
               <div className="space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-900"><Phone size={24}/></div>
                    <div>
                      <h3 className="font-bold text-gray-700">Phone Number</h3>
                      <p className="text-gray-500 text-lg">{contactInfo.phone}</p>
                      <p className="text-xs text-green-600 font-semibold mt-1">Available during working hours</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-yellow-100 p-3 rounded-full text-yellow-600"><MapPin size={24}/></div>
                    <div>
                      <h3 className="font-bold text-gray-700">Our Location</h3>
                      <p className="text-gray-500">{contactInfo.address}</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-900"><Clock size={24}/></div>
                    <div>
                      <h3 className="font-bold text-gray-700">Opening Hours</h3>
                      <p className="text-gray-500">{contactInfo.hours}</p>
                      <p className="text-gray-400 text-sm">Monday: Closed</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-full text-gray-600"><Mail size={24}/></div>
                    <div>
                      <h3 className="font-bold text-gray-700">Email Us</h3>
                      <p className="text-gray-500">{contactInfo.email}</p>
                    </div>
                 </div>
               </div>

               {/* Direct Action Buttons */}
               <div className="mt-8 flex flex-col gap-3">
                 <a href={`tel:${contactInfo.phone}`} className="bg-blue-900 text-white py-3 rounded-lg font-bold text-center hover:bg-blue-800 transition">
                   Call Now
                 </a>
                 {/* WhatsApp Button - ඔයාගේ අංකය මෙතනට දාන්න (94...) */}
                 <a href="https://wa.me/94711858594" target="_blank" className="bg-green-500 text-white py-3 rounded-lg font-bold text-center hover:bg-green-600 transition flex justify-center items-center gap-2">
                   Chat on WhatsApp
                 </a>
               </div>
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="bg-white p-2 rounded-xl shadow-sm h-[500px] border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.286605458886!2d80.0206675757536!3d6.975469693025269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2542027293477%3A0x581880751813573e!2sDompe!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk" 
              width="100%" 
              height="100%" 
              style={{border:0, borderRadius: '8px'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
            {/* Note: මම දැම්මේ දොම්පේ නගරයේ පොදු මැප් එකක්. ඔයාගේ හරියටම තැන මැප් එකෙන් අරගෙන මෙතන src එක මාරු කරන්න පුළුවන් */}
          </div>

        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-blue-950 text-gray-400 py-6 text-center text-sm mt-12">
         <p>© 2025 Halgahawatta Hardware. All Rights Reserved.</p>
      </footer>
    </div>
  );
}