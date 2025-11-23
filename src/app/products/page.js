'use client';
import { useState, useEffect } from 'react';
import { Search, Menu, X, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

// WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ category: 'All', brand: 'All', minPrice: '', maxPrice: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const whatsappNumber = "94711858594"; 

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setProducts(data);
      })
      .catch(err => console.error("Failed to load products", err));
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];
  const brands = ['All', ...new Set(products.map(p => p.brand).filter(Boolean))];

  // --- FIXED FILTER LOGIC ---
  const filteredProducts = products.filter(p => {
    const matchCategory = filter.category === 'All' || p.category === filter.category;
    const matchBrand = filter.brand === 'All' || p.brand === filter.brand;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Fix: Remove commas from price string before converting to number
    const rawPrice = p.price ? p.price.toString().replace(/,/g, '') : "0";
    const price = parseFloat(rawPrice);

    const min = filter.minPrice ? Number(filter.minPrice) : 0;
    const max = filter.maxPrice ? Number(filter.maxPrice) : 10000000;
    const matchPrice = price >= min && price <= max;

    return matchCategory && matchBrand && matchSearch && matchPrice;
  });
  // --------------------------

  const getWhatsAppLink = (productName, price) => {
    const message = `Hi, I am interested in buying: ${productName} (Rs.${price}). Is it available?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-blue-900 text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link href="/">
               <h1 className="text-xl md:text-2xl font-extrabold tracking-wider cursor-pointer">
                 HALGAHAWATTA <span className="text-yellow-400">HARDWARE</span>
               </h1>
            </Link>
            <nav className="hidden md:flex gap-8 font-bold text-sm uppercase items-center">
              <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
              <Link href="/products" className="text-yellow-400">Products</Link>
              <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
            </nav>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-blue-800 p-4 flex flex-col gap-4">
            <Link href="/">Home</Link>
            <Link href="/products" className="text-yellow-400">Products</Link>
            <Link href="/contact" className="text-white">Contact</Link>
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 bg-white p-5 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-20">
          <div 
            className="flex justify-between items-center mb-4 border-b-2 border-yellow-400 pb-2 cursor-pointer md:cursor-default"
            onClick={() => setShowFilters(!showFilters)}
          >
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-blue-900"/>
              <h3 className="font-bold text-lg text-blue-900">FILTERS</h3>
            </div>
            <div className="md:hidden text-blue-900">
               {showFilters ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
            </div>
          </div>
          
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-6`}>
            <div>
               <div className="relative">
                  <input type="text" placeholder="Search..." className="w-full p-2 pl-8 border rounded bg-gray-50"
                     onChange={(e) => setSearchTerm(e.target.value)} />
                  <Search size={16} className="absolute left-2 top-3 text-gray-400"/>
               </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm">Category</h4>
              <select className="w-full p-2 border rounded" onChange={(e) => setFilter({...filter, category: e.target.value})}>
                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm">Brand</h4>
              <select className="w-full p-2 border rounded" onChange={(e) => setFilter({...filter, brand: e.target.value})}>
                {brands.map((b, i) => <option key={i} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
               <h4 className="font-semibold mb-2 text-sm">Price (LKR)</h4>
               <div className="flex gap-2">
                 <input type="number" placeholder="Min" className="w-full border p-2 rounded text-sm" onChange={e => setFilter({...filter, minPrice: e.target.value})} />
                 <input type="number" placeholder="Max" className="w-full border p-2 rounded text-sm" onChange={e => setFilter({...filter, maxPrice: e.target.value})} />
               </div>
            </div>
          </div>
        </aside>

        <section className="w-full md:w-3/4">
          <div className="mb-4 flex justify-between items-center">
             <h2 className="text-2xl font-bold text-gray-700">All Products</h2>
             <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">{filteredProducts.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white border p-4 rounded-lg hover:shadow-xl transition group flex flex-col">
                <div className="h-48 w-full mb-4 flex items-center justify-center overflow-hidden rounded bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} className="object-contain h-full w-full group-hover:scale-105 transition" />
                </div>
                <div className="flex-grow">
                  <p className="text-xs font-bold text-gray-400 uppercase">{product.category}</p>
                  <h3 className="font-bold text-gray-800 mb-2 h-12 overflow-hidden">{product.name}</h3>
                </div>
                <div className="mt-auto flex justify-between items-center pt-2">
                   <p className="text-xl font-bold text-blue-900">Rs.{product.price}</p>
                   <a 
                     href={getWhatsAppLink(product.name, product.price)}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600 transition flex items-center gap-2 px-4 text-sm font-bold"
                   >
                     <WhatsAppIcon />
                   </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-blue-950 text-gray-400 py-6 text-center text-sm">
         <p>© 2025 Halgahawatta Hardware. All Rights Reserved.</p>
      </footer>
    </div>
  );
}