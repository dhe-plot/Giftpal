import React, { useState } from "react";
import { Link } from "react-router-dom";

const recentOrders = [
  { id: "ORD-001", customer: "Emily Carter", product: "Luxury Spa Set", date: "2025-01-07", status: "Shipped", total: 89.99 },
  { id: "ORD-002", customer: "David Lee", product: "Artisan Coffee Set", date: "2025-01-07", status: "Processing", total: 45.99 },
  { id: "ORD-003", customer: "Olivia Chen", product: "Personalized Jewelry", date: "2025-01-06", status: "Delivered", total: 129.99 },
  { id: "ORD-004", customer: "Ethan Ramirez", product: "Tech Organizer", date: "2025-01-06", status: "Shipped", total: 34.99 },
  { id: "ORD-005", customer: "Sophia Patel", product: "Scented Candles", date: "2025-01-05", status: "Delivered", total: 19.99 },
];

const products = [
  {
    id: 1,
    name: 'Luxury Spa Set',
    price: 89.99,
    stock: 15,
    sales: 45,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Artisan Coffee Set',
    price: 45.99,
    stock: 8,
    sales: 32,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Personalized Jewelry',
    price: 129.99,
    stock: 0,
    sales: 28,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=200&q=80',
    status: 'Out of Stock'
  }
];

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null
  });

  const sellerStats = {
    totalSales: 15420.50,
    totalOrders: 127,
    totalProducts: 23,
    rating: 4.8,
    reviews: 89,
    followers: 1250
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    console.log('Adding product:', newProduct);
    setShowAddProductModal(false);
    setNewProduct({ name: '', description: '', price: '', category: '', image: null });
  };

  return (
    <div style={{ background: '#181312', minHeight: '100vh', color: 'white' }}>
      {/* Navigation */}
      <nav style={{
        background: '#181111',
        padding: '1rem 2rem',
        borderBottom: '1px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: '#4ecdc4', textDecoration: 'none', fontWeight: 600 }}>
          ← Back to Home
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link
            to="/seller-profile"
            style={{
              color: '#b8a89c',
              textDecoration: 'none',
              fontWeight: 500
            }}
          >
            My Profile
          </Link>
          <button style={{
            background: '#ff6347',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 600
          }}>
            Sign Out
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            marginBottom: '0.5rem',
            background: 'linear-gradient(135deg, #4ecdc4, #ff6347)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Seller Dashboard
          </h1>
          <p style={{ color: '#b8a89c', fontSize: '1.1rem' }}>
            Manage your products, orders, and grow your business
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ color: '#4ecdc4', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              ${sellerStats.totalSales.toLocaleString()}
            </div>
            <div style={{ color: '#b8a89c' }}>Total Sales</div>
          </div>

          <div style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ff6347', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {sellerStats.totalOrders}
            </div>
            <div style={{ color: '#b8a89c' }}>Total Orders</div>
          </div>

          <div style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ color: '#ffd700', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              {sellerStats.totalProducts}
            </div>
            <div style={{ color: '#b8a89c' }}>Products</div>
          </div>

          <div style={{
            background: '#1a1a1a',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ color: '#4ecdc4', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              ⭐ {sellerStats.rating}
            </div>
            <div style={{ color: '#b8a89c' }}>{sellerStats.reviews} Reviews</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '1px solid #333',
          paddingBottom: '1rem'
        }}>
          {['overview', 'products', 'orders', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#4ecdc4' : 'transparent',
                color: activeTab === tab ? '#000' : '#b8a89c',
                border: 'none',
                padding: '0.8rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 600,
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Recent Activity</h2>
            <div style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              border: '1px solid #333',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #333' }}>
                <h3 style={{ color: '#4ecdc4', marginBottom: '1rem' }}>Recent Orders</h3>
              </div>
              {recentOrders.map(order => (
                <div key={order.id} style={{
                  padding: '1rem 1.5rem',
                  borderBottom: '1px solid #333',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{order.product}</div>
                    <div style={{ color: '#b8a89c', fontSize: '0.9rem' }}>
                      {order.customer} • {order.date}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#4ecdc4', fontWeight: 600, marginBottom: '0.3rem' }}>
                      ${order.total}
                    </div>
                    <div style={{
                      background: order.status === 'Delivered' ? '#4ecdc4' :
                                 order.status === 'Shipped' ? '#ffd700' : '#ff6347',
                      color: order.status === 'Delivered' ? '#000' : '#fff',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem' }}>My Products</h2>
              <button
                onClick={() => setShowAddProductModal(true)}
                style={{
                  background: '#4ecdc4',
                  color: '#000',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                + Add Product
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {products.map(product => (
                <div key={product.id} style={{
                  background: '#1a1a1a',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: '1px solid #333'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}
                  />
                  <h3 style={{ color: '#4ecdc4', marginBottom: '0.5rem' }}>{product.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ color: '#b8a89c' }}>Price: ${product.price}</span>
                    <span style={{ color: '#b8a89c' }}>Stock: {product.stock}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#ffd700' }}>Sales: {product.sales}</span>
                    <span style={{
                      background: product.status === 'Active' ? '#4ecdc4' : '#ff6347',
                      color: product.status === 'Active' ? '#000' : '#fff',
                      padding: '0.3rem 0.8rem',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {product.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddProductModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: '#1a1a1a',
              padding: '2rem',
              borderRadius: '12px',
              border: '1px solid #333',
              maxWidth: '500px',
              width: '90%'
            }}>
              <h3 style={{ color: '#4ecdc4', marginBottom: '1.5rem' }}>Add New Product</h3>
              <form onSubmit={handleAddProduct}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#b8a89c', display: 'block', marginBottom: '0.5rem' }}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: '#0f0f0f',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: 'white'
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ color: '#b8a89c', display: 'block', marginBottom: '0.5rem' }}>
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      background: '#0f0f0f',
                      border: '1px solid #333',
                      borderRadius: '6px',
                      color: 'white',
                      minHeight: '80px'
                    }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ color: '#b8a89c', display: 'block', marginBottom: '0.5rem' }}>
                      Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: '#0f0f0f',
                        border: '1px solid #333',
                        borderRadius: '6px',
                        color: 'white'
                      }}
                      required
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label style={{ color: '#b8a89c', display: 'block', marginBottom: '0.5rem' }}>
                      Category
                    </label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        background: '#0f0f0f',
                        border: '1px solid #333',
                        borderRadius: '6px',
                        color: 'white'
                      }}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Beauty & Wellness">Beauty & Wellness</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Technology">Technology</option>
                      <option value="Home & Living">Home & Living</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    style={{
                      flex: 1,
                      background: 'transparent',
                      color: '#b8a89c',
                      border: '1px solid #333',
                      padding: '0.8rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      background: '#4ecdc4',
                      color: '#000',
                      border: 'none',
                      padding: '0.8rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}