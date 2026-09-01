import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('stats');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bespoke, setBespoke] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, o, b, c, p] = await Promise.all([
        api.getAdminStats(),
        api.getAllOrders(),
        api.getAllBespoke(),
        api.getAllContacts(),
        api.getProducts(),
      ]);
      setStats(s);
      setOrders(o);
      setBespoke(b);
      setContacts(c);
      setProducts(p.products || []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) { navigate('/account'); return; }
    loadData();
  }, [isAdmin, navigate]);

  const updateOrderStatus = async (id, status) => {
    await api.updateOrderStatus(id, { status });
    setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
  };

  const updateBespokeStatus = async (id, status) => {
    await api.updateBespoke(id, { status });
    setBespoke(prev => prev.map(b => b._id === id ? { ...b, status } : b));
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await api.deleteProduct(id);
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  if (loading) return <div className="page-container container text-center"><p style={{ marginTop: '4rem' }}>Loading dashboard...</p></div>;

  return (
    <div className="page-container container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card"><h3>₹{stats.totalRevenue.toLocaleString()}</h3><p>Revenue</p></div>
          <div className="stat-card"><h3>{stats.totalOrders}</h3><p>Orders</p></div>
          <div className="stat-card"><h3>{stats.totalUsers}</h3><p>Users</p></div>
          <div className="stat-card"><h3>{stats.pendingContacts}</h3><p>Pending Messages</p></div>
        </div>
      )}

      <div className="admin-tabs">
        {['orders', 'bespoke', 'products', 'contacts'].map(t => (
          <button key={t} className={`admin-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id}>
                  <td>#{o._id.slice(-6).toUpperCase()}</td>
                  <td>{o.user?.name || 'N/A'}</td>
                  <td>₹{o.totalPrice.toLocaleString()}</td>
                  <td><span className={`status-badge status-${o.status}`}>{o.status}</span></td>
                  <td>
                    <select value={o.status} onChange={e => updateOrderStatus(o._id, e.target.value)}>
                      {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'bespoke' && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>ID</th><th>Customer</th><th>Status</th><th>Quote</th><th>Actions</th></tr></thead>
            <tbody>
              {bespoke.map(b => (
                <tr key={b._id}>
                  <td>#{b._id.slice(-6).toUpperCase()}</td>
                  <td>{b.user?.name || 'N/A'}</td>
                  <td><span className={`status-badge status-${b.status}`}>{b.status}</span></td>
                  <td>{b.quotedPrice ? `₹${b.quotedPrice.toLocaleString()}` : '-'}</td>
                  <td>
                    <select value={b.status} onChange={e => updateBespokeStatus(b._id, e.target.value)}>
                      {['submitted', 'reviewing', 'quoted', 'in_progress', 'completed', 'cancelled'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'products' && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Price</th><th>Category</th><th>Stock</th><th>Actions</th></tr></thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>₹{p.price.toLocaleString()}</td>
                  <td>{p.category}</td>
                  <td>{p.countInStock}</td>
                  <td><button className="delete-btn" onClick={() => deleteProduct(p._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'contacts' && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Message</th><th>Date</th></tr></thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.subject}</td>
                  <td style={{ maxWidth: 300 }}>{c.message.substring(0, 80)}...</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
