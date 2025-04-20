import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Sidebar from '../../components/Sidebar';
import { 
  Truck, 
  Phone, 
  Mail, 
  Calendar, 
  Tag, 
  Clock,
  CheckCircle,
  AlertCircle,
  Box,
  Plus,
  Edit,
  Trash,
  Search,
  X
} from 'lucide-react';
import { Supplier } from '../../types';
import { format } from 'date-fns';

const SupplierPage: React.FC = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  
  const [newSupplier, setNewSupplier] = useState<Omit<Supplier, 'id'>>({
    name: '',
    contact: '',
    email: '',
    products: [],
    productTypes: [],
    status: 'pending',
    lastDelivery: format(new Date(), 'yyyy-MM-dd'),
    nextDelivery: '',
  });
  
  const [productInput, setProductInput] = useState('');
  const [productTypeInput, setProductTypeInput] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: string
  ) => {
    if (editingSupplier) {
      setEditingSupplier({
        ...editingSupplier,
        [field]: e.target.value,
      });
    } else {
      setNewSupplier({
        ...newSupplier,
        [field]: e.target.value,
      });
    }
  };
  
  const handleAddProduct = () => {
    if (!productInput.trim()) return;
    
    if (editingSupplier) {
      setEditingSupplier({
        ...editingSupplier,
        products: [...editingSupplier.products, productInput.trim()],
      });
    } else {
      setNewSupplier({
        ...newSupplier,
        products: [...newSupplier.products, productInput.trim()],
      });
    }
    
    setProductInput('');
  };
  
  const handleRemoveProduct = (product: string) => {
    if (editingSupplier) {
      setEditingSupplier({
        ...editingSupplier,
        products: editingSupplier.products.filter(p => p !== product),
      });
    } else {
      setNewSupplier({
        ...newSupplier,
        products: newSupplier.products.filter(p => p !== product),
      });
    }
  };
  
  const handleAddProductType = () => {
    if (!productTypeInput.trim()) return;
    
    if (editingSupplier) {
      setEditingSupplier({
        ...editingSupplier,
        productTypes: [...editingSupplier.productTypes, productTypeInput.trim()],
      });
    } else {
      setNewSupplier({
        ...newSupplier,
        productTypes: [...newSupplier.productTypes, productTypeInput.trim()],
      });
    }
    
    setProductTypeInput('');
  };
  
  const handleRemoveProductType = (type: string) => {
    if (editingSupplier) {
      setEditingSupplier({
        ...editingSupplier,
        productTypes: editingSupplier.productTypes.filter(t => t !== type),
      });
    } else {
      setNewSupplier({
        ...newSupplier,
        productTypes: newSupplier.productTypes.filter(t => t !== type),
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSupplier) {
      updateSupplier(editingSupplier.id, editingSupplier);
      setEditingSupplier(null);
    } else {
      addSupplier(newSupplier);
      setNewSupplier({
        name: '',
        contact: '',
        email: '',
        products: [],
        productTypes: [],
        status: 'pending',
        lastDelivery: format(new Date(), 'yyyy-MM-dd'),
        nextDelivery: '',
      });
    }
    
    setShowAddModal(false);
  };
  
  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setShowAddModal(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      deleteSupplier(id);
    }
  };
  
  const handleStatusToggle = (id: string, currentStatus: 'arrived' | 'pending') => {
    updateSupplier(id, { 
      status: currentStatus === 'arrived' ? 'pending' : 'arrived' 
    });
  };
  
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.products.some(product => product.toLowerCase().includes(searchTerm.toLowerCase())) ||
    supplier.productTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div className="flex bg-neutral-50 min-h-screen">
      <Sidebar />
      
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Supplier Management</h1>
            <p className="text-neutral-600">Manage relationships with product suppliers</p>
          </div>
          
          <button
            onClick={() => {
              setEditingSupplier(null);
              setShowAddModal(true);
            }}
            className="btn btn-primary flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Supplier
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative w-full md:w-96 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search suppliers..."
              className="w-full py-2 px-4 pl-10 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSuppliers.map((supplier) => (
              <div 
                key={supplier.id} 
                className="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className={`p-4 ${
                  supplier.status === 'arrived' 
                    ? 'bg-green-50 border-b border-green-100' 
                    : 'bg-yellow-50 border-b border-yellow-100'
                }`}>
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-neutral-900">{supplier.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(supplier)}
                        className="text-primary hover:text-primary-blue"
                        aria-label="Edit supplier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="text-accent-red hover:text-red-700"
                        aria-label="Delete supplier"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-sm">
                    {supplier.status === 'arrived' ? (
                      <div className="flex items-center text-green-700">
                        <CheckCircle size={16} className="mr-1" />
                        <span>Last delivery: {supplier.lastDelivery}</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-yellow-700">
                        <AlertCircle size={16} className="mr-1" />
                        <span>Expected: {supplier.nextDelivery}</span>
                      </div>
                    )}
                    <button
                      onClick={() => handleStatusToggle(supplier.id, supplier.status)}
                      className="ml-auto text-sm underline hover:no-underline"
                    >
                      {supplier.status === 'arrived' ? 'Mark as Pending' : 'Mark as Arrived'}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-neutral-600 mb-3">
                    <Phone size={16} className="mr-2" />
                    <span>{supplier.contact}</span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-600 mb-4">
                    <Mail size={16} className="mr-2" />
                    <span>{supplier.email}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-neutral-700 mb-2 flex items-center">
                      <Box size={16} className="mr-2 text-neutral-500" />
                      Products
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {supplier.products.map((product) => (
                        <span
                          key={product}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-neutral-700 mb-2 flex items-center">
                      <Tag size={16} className="mr-2 text-neutral-500" />
                      Product Types
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {supplier.productTypes.map((type) => (
                        <span
                          key={type}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-gold text-neutral-800"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredSuppliers.length === 0 && (
            <div className="text-center py-12">
              <Truck size={48} className="mx-auto text-neutral-300 mb-4" />
              <h3 className="text-lg font-semibold text-neutral-700 mb-1">No suppliers found</h3>
              <p className="text-neutral-500 mb-4">Try adjusting your search or add a new supplier.</p>
              <button
                onClick={() => {
                  setEditingSupplier(null);
                  setShowAddModal(true);
                }}
                className="btn btn-primary"
              >
                Add Supplier
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Add/Edit Supplier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-neutral-200 px-6 py-4">
              <h2 className="text-xl font-semibold">
                {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingSupplier(null);
                }}
                className="text-neutral-500 hover:text-neutral-700"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSupplier ? editingSupplier.name : newSupplier.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Contact Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={editingSupplier ? editingSupplier.contact : newSupplier.contact}
                      onChange={(e) => handleInputChange(e, 'contact')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="555-123-4567"
                    />
                    <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={editingSupplier ? editingSupplier.email : newSupplier.email}
                      onChange={(e) => handleInputChange(e, 'email')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="supplier@example.com"
                    />
                    <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Status
                  </label>
                  <select
                    required
                    value={editingSupplier ? editingSupplier.status : newSupplier.status}
                    onChange={(e) => handleInputChange(e, 'status')}
                    className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="arrived">Arrived</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Last Delivery
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={editingSupplier ? editingSupplier.lastDelivery : newSupplier.lastDelivery}
                      onChange={(e) => handleInputChange(e, 'lastDelivery')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Next Delivery
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={editingSupplier ? editingSupplier.nextDelivery : newSupplier.nextDelivery}
                      onChange={(e) => handleInputChange(e, 'nextDelivery')}
                      className="w-full p-2 pl-10 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Products
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={productInput}
                      onChange={(e) => setProductInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddProduct();
                        }
                      }}
                      placeholder="Add product and press Enter"
                      className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddProduct}
                      className="ml-2 px-3 py-2 bg-primary text-white rounded hover:bg-primary-blue"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(editingSupplier ? editingSupplier.products : newSupplier.products).map((product) => (
                      <span
                        key={product}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-700"
                      >
                        {product}
                        <button
                          type="button"
                          onClick={() => handleRemoveProduct(product)}
                          className="ml-1 text-neutral-500 hover:text-neutral-700"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Product Types
                  </label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={productTypeInput}
                      onChange={(e) => setProductTypeInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddProductType();
                        }
                      }}
                      placeholder="Add product type and press Enter"
                      className="w-full p-2 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={handleAddProductType}
                      className="ml-2 px-3 py-2 bg-primary text-white rounded hover:bg-primary-blue"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(editingSupplier ? editingSupplier.productTypes : newSupplier.productTypes).map((type) => (
                      <span
                        key={type}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-gold text-neutral-800"
                      >
                        {type}
                        <button
                          type="button"
                          onClick={() => handleRemoveProductType(type)}
                          className="ml-1 text-neutral-800 hover:text-neutral-900"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingSupplier(null);
                  }}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-neutral-700 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-blue"
                >
                  {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierPage;