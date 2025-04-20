import React from 'react';
import { Product } from '../types';
import { Clock, Tag, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  isAdmin?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  isAdmin = false,
}) => {
  const {
    name,
    description,
    imageUrl,
    quantity,
    type,
    source,
    expiration,
    isAvailable,
  } = product;

  const isLowStock = quantity <= 5 && quantity > 0;
  const isOutOfStock = quantity === 0;

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${
        !isAvailable ? 'opacity-60' : ''
      }`}
      onClick={onClick}
    >
      <div className="h-40 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        {!isAvailable && (
          <div className="absolute inset-0 bg-[#EC7F47] flex items-center justify-center">
            <span className="text-white font-bold text-lg">Not Available</span>
          </div>
        )}
        {isAdmin && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            isOutOfStock
              ? 'bg-accent-red text-white'
              : isLowStock
              ? 'bg-primary-gold text-neutral-800'
              : 'bg-accent-green text-white'
          }`}>
            {isOutOfStock
              ? 'Out of Stock'
              : isLowStock
              ? 'Low Stock'
              : `${quantity} Available`}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center text-sm text-neutral-500 mb-3">
          <ShoppingBag size={16} className="mr-1" />
          <span className="capitalize">{source}</span>
          
          {expiration && (
            <>
              <span className="mx-2">•</span>
              <Clock size={16} className="mr-1" />
              <span>
                Expires: {new Date(expiration).toLocaleDateString()}
              </span>
            </>
          )}
        </div>
        
        {source.length > 0 && (
          <div className="flex flex-wrap gap-1">
              <div
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#658147] text-white"
              >
                {type}
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;