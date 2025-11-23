'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Product Form State
  const [product, setProduct] = useState({
    name: '', category: '', brand: '', price: '', description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  
  // Existing Data for Dropdowns
  const [existingCategories, setExistingCategories] = useState([]);
  const [existingBrands, setExistingBrands] = useState([]);

  // 1. Fetch existing data (for dropdowns)
  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)){
            setExistingCategories([...new Set(data.map(item => item.category))]);
            setExistingBrands([...new Set(data.map(item => item.brand))]);
        }
      })
      .catch(err => console.error("Error loading data", err));
  }, []);

  // 2. Login Logic
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === process.env.NEXT_PUBLIC_ADMIN_USER && 
        password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setIsLoggedIn(true);
    } else {
      alert("Invalid Username or Password!");
    }
  };

  // 3. Upload Image to Cloudinary
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error("Image upload failed", error);
      throw new Error("Image upload failed");
    }
  };

  // 4. Update GitHub (Main Logic)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!imageFile) {
        alert("Please select an image");
        return;
    }

    setLoading(true);
    setStatus('Uploading Image...');

    try {
      // A. Upload Image and get the link
      const imageUrl = await uploadImage();
      
      setStatus('Fetching GitHub data...');
      // B. Read existing products.json from GitHub (SHA is required)
      const repoUrl = `https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/contents/public/products.json`;
      
      const getRes = await axios.get(repoUrl, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` }
      });

      // Decode Data (GitHub sends content in Base64)
      const currentContent = decodeURIComponent(escape(atob(getRes.data.content)));
      const currentData = JSON.parse(currentContent);
      const sha = getRes.data.sha;

      // C. Add new product
      const newProduct = {
        id: Date.now(),
        ...product,
        image: imageUrl
      };
      const updatedData = [...currentData, newProduct];

      // D. Save back to GitHub
      setStatus('Saving to GitHub...');
      
      // Encode JSON back to Base64 (for UTF-8 support)
      const newContent = btoa(unescape(encodeURIComponent(JSON.stringify(updatedData, null, 2))));

      await axios.put(repoUrl, {
        message: `Add product: ${product.name}`,
        content: newContent,
        sha: sha
      }, {
        headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}` }
      });

      setStatus('Success! Site will update in 1-2 mins.');
      alert('Product Added Successfully!');
      
      // Reset Form
      setProduct({ name: '', category: '', brand: '', price: '', description: '' });
      setImageFile(null);

    } catch (error) {
      console.error(error);
      setStatus('An error occurred. Check console.');
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  // Show login form if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-900">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Admin Login</h2>
          <input type="text" placeholder="Username" className="w-full p-2 border mb-4 text-black rounded" onChange={e => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-2 border mb-4 text-black rounded" onChange={e => setPassword(e.target.value)} />
          <button className="w-full bg-yellow-500 text-blue-900 font-bold py-2 rounded hover:bg-yellow-400">Login</button>
        </form>
      </div>
    );
  }

  // Show product form after login
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-blue-900 border-b pb-2">Add New Hardware Product</h1>
        
        <form onSubmit={handleSave} className="space-y-4 text-black">
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">Product Name</label>
            <input required type="text" placeholder="Example: Waterproofing Paint 1L" className="w-full p-2 border rounded focus:outline-none focus:border-blue-500" 
              value={product.name} onChange={e => setProduct({...product, name: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Category */}
             <div>
                <label className="block text-sm font-semibold mb-1">Category</label>
                <input list="categories" placeholder="Select or Type New" className="w-full p-2 border rounded" 
                  value={product.category} onChange={e => setProduct({...product, category: e.target.value})} />
                <datalist id="categories">
                  {existingCategories.map((c, index) => <option key={index} value={c} />)}
                </datalist>
             </div>
             
             {/* Brand */}
             <div>
                <label className="block text-sm font-semibold mb-1">Brand / Manufacturer</label>
                <input list="brands" placeholder="Select or Type New" className="w-full p-2 border rounded" 
                  value={product.brand} onChange={e => setProduct({...product, brand: e.target.value})} />
                <datalist id="brands">
                   {existingBrands.map((b, index) => <option key={index} value={b} />)}
                </datalist>
             </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold mb-1">Price (LKR)</label>
            <input required type="number" placeholder="2500" className="w-full p-2 border rounded" 
                value={product.price} onChange={e => setProduct({...product, price: e.target.value})} />
          </div>
          
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea placeholder="Enter product details..." className="w-full p-2 border rounded h-24" 
                value={product.description} onChange={e => setProduct({...product, description: e.target.value})} />
          </div>

          {/* Image Upload */}
          <div className="border-2 border-dashed border-gray-300 p-4 rounded bg-gray-50">
            <label className="block text-sm font-semibold mb-2">Product Image</label>
            <input required type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} className="w-full" />
          </div>

          {/* Status Message */}
          {status && <p className={`text-sm font-bold ${status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>{status}</p>}

          {/* Submit Button */}
          <button disabled={loading} className="w-full bg-blue-900 text-white py-3 font-bold rounded hover:bg-blue-800 transition disabled:bg-gray-400">
            {loading ? "Processing..." : "Save Product to System"}
          </button>
        </form>
      </div>
    </div>
  );
}