import React, { useState } from 'react';
import { ShoppingCart, User, LogIn, Laptop, Smartphone, Watch, ShieldCheck } from 'lucide-react';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Cloud Native Developer Laptop', price: 1299, category: 'Hardware', desc: 'Pre-configured with Docker, Minikube, and 64GB RAM.', icon: Laptop },
  { id: 2, name: 'Prod-Ready Monitor Smartphone', price: 799, category: 'Devices', desc: 'AMOLED screen optimized for reading Grafana alerts on the go.', icon: Smartphone },
  { id: 3, name: 'K8s Cluster Smartwatch', price: 249, category: 'Wearables', desc: 'Vibrates when production pods hit CrashLoopBackOff.', icon: Watch }
];

export default function App() {
  const [view, setView] = useState('landing'); // landing, catalog, cart, login
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useState({ loggedIn: false, email: '' });

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div class="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav class="bg-slate-900 text-white p-4 shadow-md sticky top-0 z-50">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <h1 onClick={() => setView('landing')} class="text-xl font-bold tracking-wider cursor-pointer flex items-center gap-2">
            <ShieldCheck class="text-emerald-400" /> DevOpsShop
          </h1>
          <div class="flex items-center gap-6">
            <button onClick={() => setView('catalog')} class="hover:text-emerald-400 transition">Catalog</button>
            <button onClick={() => setView('cart')} class="relative hover:text-emerald-400 transition flex items-center gap-1">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span class="absolute -top-2 -right-3 bg-emerald-500 text-xs text-slate-900 font-extrabold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            {auth.loggedIn ? (
              <span class="text-sm bg-slate-800 px-3 py-1 rounded border border-slate-700 flex items-center gap-2">
                <User size={16} class="text-emerald-400" /> {auth.email}
              </span>
            ) : (
              <button onClick={() => setView('login')} class="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-medium px-4 py-1.5 rounded transition flex items-center gap-1">
                <LogIn size={16} /> Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main class="flex-grow max-w-6xl w-full mx-auto p-6">
        
        {/* View: Landing Page */}
        {view === 'landing' && (
          <div class="py-12 text-center">
            <h2 class="text-4xl font-extrabold text-slate-800 mb-4">Production-Grade Infrastructure, Consumer-Grade Speed</h2>
            <p class="text-slate-600 text-lg max-w-2xl mx-auto mb-8">Welcome to DevOpsShop. Securely deployed via multi-stage containers and fully automated CI/CD pipelines.</p>
            <button onClick={() => setView('catalog')} class="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3 rounded-lg shadow transition">
              Browse Production Hardware
            </button>
          </div>
        )}

        {/* View: Product Catalog */}
        {view === 'catalog' && (
          <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-6">Product Catalog</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_PRODUCTS.map(product => {
                const IconComponent = product.icon;
                return (
                  <div key={product.id} class="bg-white rounded-xl shadow p-6 border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div class="p-3 bg-slate-50 inline-block rounded-lg mb-4 text-slate-700">
                        <IconComponent size={24} />
                      </div>
                      <span class="block text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">{product.category}</span>
                      <h3 class="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
                      <p class="text-slate-600 text-sm mb-4">{product.desc}</p>
                    </div>
                    <div class="mt-4 flex items-center justify-between">
                      <span class="text-2xl font-black text-slate-900">${product.price}</span>
                      <button onClick={() => addToCart(product)} class="bg-slate-900 hover:bg-slate-800 text-white text-sm px-4 py-2 rounded font-medium transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View: Shopping Cart */}
        {view === 'cart' && (
          <div>
            <h2 class="text-2xl font-bold text-slate-800 mb-6">Your Cart</h2>
            {cart.length === 0 ? (
              <p class="text-slate-500">Your shopping cart is currently empty.</p>
            ) : (
              <div class="space-y-4 max-w-2xl">
                {cart.map((item, idx) => (
                  <div key={idx} class="bg-white p-4 rounded-lg shadow border border-slate-100 flex justify-between items-center">
                    <div>
                      <h4 class="font-bold text-slate-900">{item.name}</h4>
                      <p class="text-xs text-slate-500">${item.price}</p>
                    </div>
                    <span class="font-bold text-slate-900">${item.price}</span>
                  </div>
                ))}
                <div class="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span class="text-lg font-bold">Total Matrix:</span>
                  <span class="text-2xl font-black">${cart.reduce((acc, curr) => acc + curr.price, 0)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* View: Login */}
        {view === 'login' && (
          <div class="max-w-md mx-auto bg-white rounded-xl shadow border border-slate-100 p-8 mt-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 text-center">Identity Provider Gateway</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              setAuth({ loggedIn: true, email: 'admin@devops.local' });
              setView('landing');
            }} class="space-y-4">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1">DevOps Email</label>
                <input type="email" required placeholder="admin@devops.local" class="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500" />
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-1">Secret Password</label>
                <input type="password" required placeholder="••••••••" class="w-full border border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-500" />
              </div>
              <button type="submit" class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded transition shadow mt-2">
                Authenticate JWT
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer class="bg-slate-50 border-t border-slate-200 p-4 text-center text-xs text-slate-500">
        DevOpsShop Production Environment © 2026. Designed for CI/CD demonstration.
      </footer>
    </div>
  );
}