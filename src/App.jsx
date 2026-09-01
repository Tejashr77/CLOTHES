import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/cursor/CustomCursor';
import Preloader from './components/preloader/Preloader';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import Shop from './pages/Shop';
import BespokeCouture from './pages/BespokeCouture';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import MyOrders from './pages/MyOrders';
import About from './pages/About';
import Contact from './pages/Contact';
import FindUs from './pages/FindUs';
import FAQs from './pages/FAQs';
import Policies from './pages/Policies';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Wishlist from './pages/Wishlist';
import Journal from './pages/Journal';
import Returns from './pages/Returns';
import AdminDashboard from './pages/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  const [loaded, setLoaded] = useState(false);
  const handlePreloaderDone = useCallback(() => setLoaded(true), []);

  return (
    <Router>
      <CustomCursor />
      {!loaded && <Preloader onComplete={handlePreloaderDone} />}
      <div className="app-wrapper" style={{ minHeight: '100vh' }}>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/bespoke" element={<BespokeCouture />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/about" element={<About />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/find-us" element={<FindUs />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </Router>
  );
}

export default App;
