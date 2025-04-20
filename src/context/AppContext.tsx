import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, Supplier, Volunteer, FilterOptions } from '../types';
import { productData, supplierData, volunteerData } from '../data/mockData';
import { useAuth0 } from '@auth0/auth0-react';

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  suppliers: Supplier[];
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
  volunteers: Volunteer[];
  setVolunteers: React.Dispatch<React.SetStateAction<Volunteer[]>>;
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addVolunteer: (volunteer: Omit<Volunteer, 'id'>) => void;
  updateVolunteer: (id: string, updates: Partial<Volunteer>) => void;
  deleteVolunteer: (id: string) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  activeSection: 'pantry' | 'freedge';
  setActiveSection: React.Dispatch<React.SetStateAction<'pantry' | 'freedge'>>;
  getFilteredProducts: () => Product[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);     // fetch myself
  const [suppliers, setSuppliers] = useState<Supplier[]>(supplierData);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(volunteerData);
  const [activeSection, setActiveSection] = useState<'pantry' | 'freedge'>('pantry');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    type: [],
    source: [],
    searchTerm: '',
  });

  const { getAccessTokenSilently } = useAuth0();


  const fetchProducts = async () => {
    const token = await getAccessTokenSilently();
    try {
      const res = await fetch('/api/items/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
  
      const results = await res.json();
      const data = results.data;
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
    // to backend !
    const token = await getAccessTokenSilently();
    try {
      const res = await fetch('/api/items/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
  
      if (!res.ok) {
        throw new Error(`Failed to add product: ${res.status}`);
      }
  
      const result = await res.json();
      const message = result.message;
      console.log('Product saved to backend:', message);
    } catch (err) {
      console.error('Backend save failed:', err);
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
    // to backend !
    const token = await getAccessTokenSilently();
    try {
      const res = await fetch(`/api/items/${id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
  
      if (!res.ok) {
        throw new Error(`Failed to add product: ${res.status}`);
      }
  
      const result = await res.json();
      const message = result.message;
      console.log('Product saved to backend:', message);
    } catch (err) {
      console.error('Backend save failed:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
    
    // to backend !
    const token = await getAccessTokenSilently();
    try {
      const res = await fetch(`/api/items/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to delete product: ${res.status}`);
      }

      const result = await res.json();
      console.log('Deleted on backend:', result.message);
    } catch (err) {
      console.error('Backend delete failed:', err);
      // Optionally: rollback UI change or show toast
    }
  }




  // Volunteer and Supplier functions  
  const addVolunteer = (volunteer: Omit<Volunteer, 'id'>) => {
    const newVolunteer = {
      ...volunteer,
      id: Date.now().toString(),
    };
    setVolunteers([...volunteers, newVolunteer]);
  };

  const updateVolunteer = (id: string, updates: Partial<Volunteer>) => {
    setVolunteers(
      volunteers.map((volunteer) =>
        volunteer.id === id ? { ...volunteer, ...updates } : volunteer
      )
    );
  };

  const deleteVolunteer = (id: string) => {
    setVolunteers(volunteers.filter((volunteer) => volunteer.id !== id));
  };

  const addSupplier = (supplier: Omit<Supplier, 'id'>) => {
    const newSupplier = {
      ...supplier,
      id: Date.now().toString(),
    };
    setSuppliers([...suppliers, newSupplier]);
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(
      suppliers.map((supplier) =>
        supplier.id === id ? { ...supplier, ...updates } : supplier
      )
    );
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
  };

  const getFilteredProducts = () => {
    let filtered = products.filter(
      (product) => product.section === activeSection
    );

    if (filterOptions.searchTerm) {
      const searchLower = filterOptions.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    if (filterOptions.source.length > 0) {
      filtered = filtered.filter((product) =>
        filterOptions.source.some((diet) =>
          product.source.includes(diet)
        )
      );
    }

    if (filterOptions.type.length > 0) {
      filtered = filtered.filter((product) =>
        filterOptions.type.includes(product.type)
      );
    }

    return filtered;
  };

  return (
    <AppContext.Provider
      value={{
        products,
        setProducts,
        suppliers,
        setSuppliers,
        volunteers,
        setVolunteers,
        filterOptions,
        setFilterOptions,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        addVolunteer,
        updateVolunteer,
        deleteVolunteer,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        activeSection,
        setActiveSection,
        getFilteredProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};