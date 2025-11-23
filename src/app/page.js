'use client';
import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Truck, Phone, MapPin, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) {
            // Logic: හැම Category එකෙන්ම එක Product එක බැගින් තෝරා ගැනීම (උපරිම 6ක්)
            const uniqueCategories = new Map();
            data.forEach(item => {
                if (!uniqueCategories.has(item.category)) {
                    uniqueCategories.set(item.category, item);
                }
            });
            setFeaturedProducts(Array.from(uniqueCategories.values()).slice(0, 6));
        }
      })
      .catch(err => console.error("Failed to load products", err));
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* --- NAVBAR --- */}
      <header className="bg-blue-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div>
               <h1 className="text-xl md:text-2xl font-extrabold tracking-wider">
                 HALGAHAWATTA <span className="text-yellow-400">HARDWARE</span>
               </h1>
            </div>
            <nav className="hidden md:flex gap-8 font-bold text-sm uppercase items-center">
              <Link href="/" className="text-yellow-400 border-b-2 border-yellow-400 pb-1">Home</Link>
              <Link href="/products" className="hover:text-yellow-400 transition">Products</Link>
              {/* වෙනස් කළා: දැන් කෙලින්ම Contact Page එකට යනවා */}
              <Link href="/contact" className="hover:text-yellow-400 transition">Contact Us</Link>
            </nav>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-800 p-4 flex flex-col gap-4 text-center">
            <Link href="/" className="text-yellow-400">Home</Link>
            <Link href="/products" className="text-white">Products</Link>
            <Link href="/contact" className="text-white">Contact Us</Link>
            <Link href="/admin" className="text-white">Admin Login</Link>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative bg-blue-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="bg-yellow-400 text-blue-900 px-3 py-1 text-xs font-bold rounded mb-4 inline-block uppercase tracking-widest">
              Build With Confidence
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              Premium <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">Hardware</span> <br/> Supplies.
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Dompe's most trusted partner for paints, tools, and construction materials. Quality you can trust, prices you can afford.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link href="/products" className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition flex items-center gap-2 shadow-lg hover:shadow-yellow-400/50">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-900 transition">
                Contact Us
              </Link>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
             <div className="w-72 h-72 md:w-96 md:h-96 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center relative z-10 shadow-2xl border-4 border-white/20">
                <div className="text-center">
                   <h2 className="text-6xl font-black text-white/20">2025</h2>
                   <p className="font-bold text-white/60 uppercase tracking-[0.5em]">Collection</p>
                </div>
             </div>
             <div className="absolute top-0 right-10 w-24 h-24 bg-yellow-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
             <div className="absolute bottom-0 left-10 w-32 h-32 bg-blue-500 rounded-full blur-2xl opacity-60"></div>
          </div>
        </div>
      </section>

      {/* --- FEATURES STRIP --- */}
      <div className="bg-yellow-400 py-6">
         <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-between gap-6 text-blue-900 font-bold">
            <div className="flex items-center gap-2"><CheckCircle /> 100% Genuine Quality</div>
            <div className="flex items-center gap-2"><Truck /> Fast Delivery Available</div>
            <div className="flex items-center gap-2"><Phone /> 24/7 Customer Support</div>
            <div className="flex items-center gap-2"><MapPin /> Located in Dompe</div>
         </div>
      </div>

      {/* --- FEATURED PRODUCTS --- */}
      <section className="py-20 container mx-auto px-4">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">Featured Products</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Explore our wide range of categories. From heavy construction materials to the finest paints.</p>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
               <div key={product.id} className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-300 border border-gray-100 overflow-hidden">
                  <div className="h-60 w-full bg-gray-50 flex items-center justify-center overflow-hidden relative">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={product.image} alt={product.name} className="object-contain h-48 w-48 group-hover:scale-110 transition duration-500 mix-blend-multiply" />
                     <div className="absolute top-4 right-4 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {product.category}
                     </div>
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition">{product.name}</h3>
                     <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                     <div className="flex justify-between items-center border-t pt-4">
                        <span className="text-2xl font-bold text-blue-900">Rs.{product.price}</span>
                        <Link href="/products" className="text-yellow-600 font-bold hover:underline text-sm flex items-center gap-1">
                           View Details <ArrowRight size={14}/>
                        </Link>
                     </div>
                  </div>
               </div>
            )) : (
               <p className="text-center col-span-3 text-gray-400">Loading featured products...</p>
            )}
         </div>

         <div className="text-center mt-12">
            <Link href="/products" className="inline-block border-2 border-blue-900 text-blue-900 px-10 py-3 rounded-full font-bold hover:bg-blue-900 hover:text-white transition duration-300">
               View All Products
            </Link>
         </div>
      </section>

      {/* --- FOOTER (Simplified) --- */}
      <footer className="bg-blue-950 text-white py-12 border-t-8 border-yellow-400">
         <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <div>
               <h2 className="text-2xl font-bold mb-4">Halgahawatta Hardware</h2>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Your trusted partner in construction. Visit us at Ramya Building, Dompe for the best deals in town.
               </p>
            </div>
            <div>
               <h3 className="text-lg font-bold mb-4 text-yellow-400">Contact Us</h3>
               <p className="mb-2">Ramya Building, Dompe</p>
               <p className="mb-2">071 185 8594</p>
            </div>
            <div>
               <h3 className="text-lg font-bold mb-4 text-yellow-400">Quick Links</h3>
               <div className="flex flex-col gap-2 text-gray-400">
                  <Link href="/" className="hover:text-white">Home</Link>
                  <Link href="/products" className="hover:text-white">All Products</Link>
                  <Link href="/contact" className="hover:text-white">Contact Page</Link>
               </div>
            </div>
         </div>
         <div className="text-center mt-12 pt-8 border-t border-blue-900 text-gray-500 text-sm">
            © 2025 Halgahawatta Hardware. All Rights Reserved.
         </div>
      </footer>
    </div>
  );
}