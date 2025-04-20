import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Sidebar from '../../components/Sidebar';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit, 
  Trash, 
  X, 
  Check,
  Calendar,
} from 'lucide-react';
import { Product } from '../../types';
import EmptyState from '../../components/EmptyState';

const InventoryPage: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [filterSection, setFilterSection] = useState<'pantry' | 'freedge' | 'all'>('pantry');
  
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    imageUrl: '',
    quantity: 0,
    dateAdded: new Date().toISOString().split('T')[0],
    type: '',
    source: '',
    isAvailable: true,
    section: 'pantry',
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    field: string
  ) => {
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [field]: e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value,
      });
    } else {
      setNewProduct({
        ...newProduct,
        [field]: e.target.type === 'number' ? parseInt(e.target.value, 10) : e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateProduct(editingProduct.id, editingProduct);
      setEditingProduct(null);
    } else {
      addProduct(newProduct);
      setNewProduct({
        name: '',
        description: '',
        imageUrl: '',
        quantity: 0,
        dateAdded: new Date().toISOString().split('T')[0],
        type: '',
        source: '',
        isAvailable: true,
        section: 'pantry',
      });
      setShowAddModal(false);
    }
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };
  
  const handleAvailabilityToggle = (id: string, currentStatus: boolean) => {
    updateProduct(id, { isAvailable: !currentStatus });
  };
  
  const filteredProducts = products.filter(product => 
      filterSection === 'all' ? true : product.section === filterSection
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  return (
    <div className="flex bg-neutral-50 min-h-screen">
      <Sidebar />
      
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Inventory Management</h1>
            <p className="text-neutral-600">Manage and track all food items in the Pantry and Freedge</p>
          </div>
          
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddModal(true);
            }}
            className="btn btn-primary flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Product
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full py-2 px-4 pl-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Filter size={18} className="text-neutral-400 mr-2" />
                <select
                  value={filterSection}
                  onChange={(e) => setFilterSection(e.target.value as 'pantry' | 'freedge' | 'all')}
                  className="py-2 px-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="pantry">Pantry</option>
                  <option value="freedge">Freedge</option>
                  <option value="all">All Sections</option>
                </select>
              </div>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Section
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={product.imageUrl}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-neutral-500 line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.quantity === 0
                              ? 'bg-red-100 text-red-800'
                              : product.quantity <= 5
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {new Date(product.dateAdded).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500 capitalize">
                        {product.type}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500">
                        {product.source}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleAvailabilityToggle(product.id, product.isAvailable)}
                          className={`px-3 py-1 inline-flex items-center text-xs rounded-full font-semibold ${
                            product.isAvailable
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                          }`}
                        >
                          {product.isAvailable ? (
                            <>
                              <Check size={12} className="mr-1" />
                              Available
                            </>
                          ) : (
                            <>
                              <X size={12} className="mr-1" />
                              Unavailable
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500 capitalize">
                        {product.section}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-primary hover:text-primary-blue mr-3"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-accent-red hover:text-red-700"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No products found"
              description="There are no products matching your search criteria."
              actionLabel="Add Product"
              onAction={() => {
                setEditingProduct(null);
                setShowAddModal(true);
              }}
            />
          )}
        </div>
      </div>
      
      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-200 px-6 py-4">
              <h2 className="text-xl font-semibold">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProduct(null);
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editingProduct ? editingProduct.imageUrl : newProduct.imageUrl}
                    onChange={(e) => handleInputChange(e, 'imageUrl')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    value={editingProduct ? editingProduct.description : newProduct.description}
                    onChange={(e) => handleInputChange(e, 'description')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editingProduct ? editingProduct.quantity : newProduct.quantity}
                    onChange={(e) => handleInputChange(e, 'quantity')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Date Added
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={editingProduct ? editingProduct.dateAdded : newProduct.dateAdded}
                      onChange={(e) => handleInputChange(e, 'dateAdded')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Expiration Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={editingProduct?.expiration || ''}
                      onChange={(e) => handleInputChange(e, 'expiration')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Source
                  </label>
                  <select
                    required
                    value={editingProduct ? editingProduct.source : newProduct.source}
                    onChange={(e) => handleInputChange(e, 'source')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Sysco">Sysco</option>
                    <option value="Daylight Foods">Daylight Foods</option>
                    <option value="Aggie Fresh">Aggie Fresh</option>
                    <option value="Donations">Donations</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Type
                  </label>
                  <select
                    required
                    value={editingProduct ? editingProduct.type : newProduct.type}
                    onChange={(e) => handleInputChange(e, 'type')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value=""> N/A </option>
                    <option value="vegan">Vegan</option>
                    <option value="nut-free">Nut-free</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="gluten-free">Gluten-free</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Section
                  </label>
                  <select
                    required
                    value={editingProduct ? editingProduct.section : newProduct.section}
                    onChange={(e) => handleInputChange(e, 'section')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="pantry">Pantry</option>
                    <option value="freedge">Freedge</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Availability
                  </label>
                  <select
                    required
                    value={(editingProduct ? editingProduct.isAvailable : newProduct.isAvailable) ? 'true' : 'false'}
                    onChange={(e) => {
                      const value = e.target.value === 'true';
                      if (editingProduct) {
                        setEditingProduct({
                          ...editingProduct,
                          isAvailable: value,
                        });
                      } else {
                        setNewProduct({
                          ...newProduct,
                          isAvailable: value,
                        });
                      }
                    }}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="true">Available</option>
                    <option value="false">Unavailable</option>
                  </select>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-blue"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;