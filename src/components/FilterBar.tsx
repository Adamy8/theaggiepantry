import React, { useState } from 'react';
import { Filter, Search, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const filterOptions = {
  keywords: [
    'vegetables',
    'fruit',
    'dairy',
    'snacks',
    'available',
    'non-perishable',
    'fresh',
    'refrigerated',
    'toiletries',
    'bakery',
  ],
  dietary: ['vegan', 'vegetarian', 'gluten-free', 'nut-free'],
  type: ['safeway', 'organic', 'local'],
};

const FilterBar: React.FC = () => {
  const { filterOptions: selectedFilters, setFilterOptions } = useAppContext();
  const [searchTerm, setSearchTerm] = useState(selectedFilters.searchTerm);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilterOptions({
      ...selectedFilters,
      searchTerm,
    });
  };

  const toggleFilter = (category: 'keywords' | 'dietary' | 'type', value: string) => {
    const currentFilters = [...selectedFilters[category]];
    const index = currentFilters.indexOf(value);

    if (index === -1) {
      // Add filter
      setFilterOptions({
        ...selectedFilters,
        [category]: [...currentFilters, value],
      });
    } else {
      // Remove filter
      currentFilters.splice(index, 1);
      setFilterOptions({
        ...selectedFilters,
        [category]: currentFilters,
      });
    }
  };

  const clearFilters = () => {
    setFilterOptions({
      keywords: [],
      dietary: [],
      type: [],
      searchTerm: '',
    });
    setSearchTerm('');
  };

  const hasActiveFilters =
    selectedFilters.keywords.length > 0 ||
    selectedFilters.dietary.length > 0 ||
    selectedFilters.type.length > 0 ||
    selectedFilters.searchTerm !== '';

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full py-2 px-4 pl-10 border border-[#FDEED8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#EC7F47] focus:border-transparent"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
          />
          <button type="submit" className="hidden">
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center px-4 py-2 rounded-lg border ${
              isFilterOpen || hasActiveFilters
                ? 'bg-[#EC7F47] text-white border-primary'
                : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'
            } transition-colors`}
          >
            <Filter size={18} className="mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-white text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {selectedFilters.keywords.length +
                  selectedFilters.dietary.length +
                  selectedFilters.type.length +
                  (selectedFilters.searchTerm ? 1 : 0)}
              </span>
            )}
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center px-4 py-2 rounded-lg text-accent-red border border-accent-red hover:bg-accent-red hover:text-white transition-colors"
            >
              <X size={18} className="mr-2" />
              Clear
            </button>
          )}
        </div>
      </div>

      {isFilterOpen && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
          <div>
            <h3 className="font-medium mb-2 text-neutral-900">Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.keywords.map((keyword) => (
                <button
                  key={keyword}
                  onClick={() => toggleFilter('keywords', keyword)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFilters.keywords.includes(keyword)
                      ? 'bg-[#EC7F47] text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  } transition-colors`}
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-neutral-900">Dietary</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.dietary.map((diet) => (
                <button
                  key={diet}
                  onClick={() => toggleFilter('dietary', diet)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFilters.dietary.includes(diet)
                      ? 'bg-[#EC7F47] text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  } transition-colors`}
                >
                  {diet}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 text-neutral-900">Type</h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions.type.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleFilter('type', type)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedFilters.type.includes(type)
                      ? 'bg-[#EC7F47] text-white '
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  } transition-colors`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;