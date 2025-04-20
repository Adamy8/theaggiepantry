import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, Supplier, Volunteer, FilterOptions } from '../types';
import { productData, supplierData, volunteerData } from '../data/mockData';

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  suppliers: Supplier[];
  setSuppliers: React.Dispatch<React.SetStateAction<Supplier[]>>;
  volunteers: Volunteer[];
  setVolunteers: React.Dispatch<React.SetStateAction<Volunteer[]>>;
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
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
  const [products, setProducts] = useState<Product[]>(productData);
  const [suppliers, setSuppliers] = useState<Supplier[]>(supplierData);
  const [volunteers, setVolunteers] = useState<Volunteer[]>(volunteerData);
  const [activeSection, setActiveSection] = useState<'pantry' | 'freedge'>('pantry');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    keywords: [],
    dietary: [],
    type: [],
    searchTerm: '',
  });

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updates } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

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

    if (filterOptions.keywords.length > 0) {
      filtered = filtered.filter((product) =>
        filterOptions.keywords.some((keyword) =>
          product.tags.includes(keyword)
        )
      );
    }

    if (filterOptions.dietary.length > 0) {
      filtered = filtered.filter((product) =>
        filterOptions.dietary.some((diet) =>
          product.dietary.includes(diet)
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