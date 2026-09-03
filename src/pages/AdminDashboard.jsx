import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { BarChart3, Package, Users, MessageSquare, ShoppingBag, ChevronDown, Trash2, Eye, RefreshCw } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [bespoke, setBespoke] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [expandedBespoke, setExpandedBespoke] = useState(null);

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
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) { navigate('/account'); return; }
    loadData();
  }, [isAdmin, navigate]);

  const updateOrderStatus = async (id, status) => {
    try {
      await api.updateOrderStatus(id, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) {
      console.error('Failed to update order:', err);
    }
  };

  const updateBespokeStatus = async (id, status) => {
    try {
      await api.updateBespoke(id, { status });
      setBespoke(prev => prev.map(b => b._id === id ? { ...b, status } : o));
    } catch (err) {
      console.error('Failed to update bespoke:', err);
    }
  };

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled',
      submitted: 'status-pending',
      reviewing: 'status-processing',
      quoted: 'status-confirmed',
      in_progress: 'status-shipped',
      completed: 'status-delivered',
    };
    return colors[status] || 'status-pending';
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-header-left">
            <h1>Admin Dashboard</h1>
            <p>Manage your store</p>
          </div>
          <button className="admin-refresh-btn" onClick={loadData}>
            <RefreshCw size={18} strokeWidth={1.5} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="stat-icon stat-icon-revenue">
                <BarChart3 size={24} strokeWidth={1.5} />
              </div>
              <div className="stat-content">
                <span className="stat-value">₹{stats.totalRevenue.toLocaleString('en-IN')}</span>
                <span className="stat-label">Revenue</span>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-icon stat-icon-orders">
                <ShoppingBag size={24} strokeWidth={1.5} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats.totalOrders}</span>
                <span className="stat-label">Orders</span>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-icon stat-icon-users">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats.totalUsers}</span>
                <span className="stat-label">Users</span>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-icon stat-icon-messages">
                <MessageSquare size={24} strokeWidth={1.5} />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stats.pendingContacts}</span>
                <span className="stat-label">Messages</span>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="admin-tabs-nav">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'bespoke', label: 'Bespoke', icon: Package },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'contacts', label: 'Messages', icon: MessageSquare },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`admin-tab-btn ${tab === id ? 'active' : ''}`}
              onClick={() => setTab(id)}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="admin-content">
          {/* Overview */}
          {tab === 'overview' && (
            <div className="admin-overview">
              <div className="overview-section">
                <h3>Recent Orders</h3>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(o => (
                        <tr key={o._id}>
                          <td className="order-id">#{o._id.slice(-6).toUpperCase()}</td>
                          <td>{o.user?.name || 'N/A'}</td>
                          <td className="order-total">₹{o.totalPrice.toLocaleString()}</td>
                          <td>
                            <span className={`status-pill ${getStatusColor(o.status)}`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="overview-section">
                <h3>Products</h3>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 5).map(p => (
                        <tr key={p._id}>
                          <td className="product-name">{p.name}</td>
                          <td>₹{p.price.toLocaleString()}</td>
                          <td><span className="category-badge">{p.category}</span></td>
                          <td>{p.countInStock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Orders */}
          {tab === 'orders' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <h2>All Orders</h2>
                <span className="section-count">{orders.length} orders</span>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <React.Fragment key={o._id}>
                        <tr className={expandedOrder === o._id ? 'expanded-row' : ''}>
                          <td className="order-id">#{o._id.slice(-6).toUpperCase()}</td>
                          <td>{o.user?.name || 'N/A'}</td>
                          <td>{o.orderItems?.length || 0} items</td>
                          <td className="order-total">₹{o.totalPrice.toLocaleString()}</td>
                          <td>
                            <span className={`status-pill ${getStatusColor(o.status)}`}>
                              {o.status}
                            </span>
                          </td>
                          <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className="action-group">
                              <select
                                className="status-select"
                                value={o.status}
                                onChange={e => updateOrderStatus(o._id, e.target.value)}
                              >
                                {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
                                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                ))}
                              </select>
                              <button
                                className="icon-btn"
                                onClick={() => setExpandedOrder(expandedOrder === o._id ? null : o._id)}
                              >
                                <Eye size={16} strokeWidth={1.5} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedOrder === o._id && (
                          <tr className="order-details-row">
                            <td colSpan="7">
                              <div className="order-details">
                                <div className="detail-grid">
                                  <div>
                                    <strong>Shipping Address</strong>
                                    <p>{o.shippingAddress?.address || 'N/A'}</p>
                                    <p>{o.shippingAddress?.city}, {o.shippingAddress?.postalCode}</p>
                                  </div>
                                  <div>
                                    <strong>Payment</strong>
                                    <p>{o.paymentMethod || 'N/A'}</p>
                                  </div>
                                </div>
                                {o.orderItems && (
                                  <div className="order-items-list">
                                    <strong>Items</strong>
                                    {o.orderItems.map((item, i) => (
                                      <div key={i} className="order-item">
                                        <span>{item.name}</span>
                                        <span>Qty: {item.quantity}</span>
                                        <span>₹{item.price?.toLocaleString()}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bespoke */}
          {tab === 'bespoke' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <h2>Bespoke Orders</h2>
                <span className="section-count">{bespoke.length} requests</span>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Request ID</th>
                      <th>Customer</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Quote</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bespoke.map(b => (
                      <React.Fragment key={b._id}>
                        <tr className={expandedBespoke === b._id ? 'expanded-row' : ''}>
                          <td className="order-id">#{b._id.slice(-6).toUpperCase()}</td>
                          <td>{b.user?.name || 'N/A'}</td>
                          <td className="bespoke-desc">{b.description?.substring(0, 50)}...</td>
                          <td>
                            <span className={`status-pill ${getStatusColor(b.status)}`}>
                              {b.status}
                            </span>
                          </td>
                          <td>{b.quotedPrice ? `₹${b.quotedPrice.toLocaleString()}` : '-'}</td>
                          <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                          <td>
                            <div className="action-group">
                              <select
                                className="status-select"
                                value={b.status}
                                onChange={e => updateBespokeStatus(b._id, e.target.value)}
                              >
                                {['submitted', 'reviewing', 'quoted', 'in_progress', 'completed', 'cancelled'].map(s => (
                                  <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}</option>
                                ))}
                              </select>
                              <button
                                className="icon-btn"
                                onClick={() => setExpandedBespoke(expandedBespoke === b._id ? null : b._id)}
                              >
                                <Eye size={16} strokeWidth={1.5} />
                              </button>
                            </div>
                          </td>
                        </tr>
                        {expandedBespoke === b._id && (
                          <tr className="order-details-row">
                            <td colSpan="7">
                              <div className="order-details">
                                <div className="detail-grid">
                                  <div>
                                    <strong>Full Description</strong>
                                    <p>{b.description}</p>
                                  </div>
                                  <div>
                                    <strong>Measurements</strong>
                                    <p>{b.measurements || 'Not provided'}</p>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Products */}
          {tab === 'products' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <h2>All Products</h2>
                <span className="section-count">{products.length} products</span>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Stock</th>
                      <th>Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id}>
                        <td className="product-name">{p.name}</td>
                        <td>₹{p.price.toLocaleString()}</td>
                        <td><span className="category-badge">{p.category}</span></td>
                        <td>{p.countInStock}</td>
                        <td>
                          {p.isPreorder && <span className="type-badge type-preorder">Pre-order</span>}
                          {p.scarcity && <span className="type-badge type-scarcity">{p.scarcity}</span>}
                        </td>
                        <td>
                          <button className="icon-btn danger" onClick={() => deleteProduct(p._id)}>
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Contacts */}
          {tab === 'contacts' && (
            <div className="admin-section">
              <div className="admin-section-header">
                <h2>Messages</h2>
                <span className="section-count">{contacts.length} messages</span>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map(c => (
                      <tr key={c._id}>
                        <td>{c.name}</td>
                        <td className="contact-email">{c.email}</td>
                        <td>{c.subject}</td>
                        <td className="message-preview">{c.message.substring(0, 80)}...</td>
                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
