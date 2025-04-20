import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import ChatBot from '../components/ChatBot';

const ShopperPage: React.FC = () => {
  const { section } = useParams<{ section: 'pantry' | 'freedge' }>();
  const { 
    setActiveSection, 
    getFilteredProducts,
    filterOptions,
    setFilterOptions
  } = useAppContext();
  
  // Set the active section based on URL parameter
  useEffect(() => {
    if (section === 'pantry' || section === 'freedge') {
      setActiveSection(section);
    }
  }, [section, setActiveSection]);
  
  const filteredProducts = getFilteredProducts();
  
  const clearFilters = () => {
    setFilterOptions({
      type: [],
      source: [],
      searchTerm: '',
    });
  };
  
  return (
    <div className="min-h-screen bg-[#FDEED8] flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            {section === 'pantry' ? 'The Pantry' : 'Freedge'} Items
          </h1>
          <p className="text-neutral-600">
            {section === 'pantry'
              ? 'Browse food items available at The Pantry for UC Davis students'
              : 'Browse food items available in the community Freedges'}
          </p>
        </div>
        
        <FilterBar />
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState  
            title="No items found"
            description={`We couldn't find any ${section === 'pantry' ? 'Pantry' : 'Freedge'} items matching your criteria.`}
            actionLabel="Clear Filters"
            onAction={clearFilters}
          />
        )}
      </main>
      
      <ChatBot />
    </div>
  );
};

export default ShopperPage;