import React, { useState, useMemo } from 'react';
import { Search, Filter, X, Sliders } from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { MainLayout } from '../layouts';
import { Button, Input, Select } from '../components/FormElements';
import { Card } from '../components/UI';
import { EventCard, Loading } from '../components';
import { eventCategories } from '../data/mockData';
import { sortEvents, filterEvents } from '../utils/helpers';

/**
 * Marketplace - Browse and discover events for sponsorship
 */
export const Marketplace = () => {
  const { events, loading } = useMarketplace();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [location, setLocation] = useState('');

  // Filters
  const filters = useMemo(
    () => ({
      search: searchQuery,
      category: selectedCategory,
      minBudget: priceRange.min,
      maxBudget: priceRange.max,
      location,
    }),
    [searchQuery, selectedCategory, priceRange, location]
  );

  // Filtered & Sorted Events
  const filteredEvents = useMemo(() => {
    let result = filterEvents(events, filters);
    return sortEvents(result, sortBy);
  }, [events, filters, sortBy]);

  // Sidebar Component
  const Sidebar = () => (
    <div className="p-6 space-y-6">
      <h3 className="font-bold text-lg text-neutral-900">Filters</h3>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-3">
          Category
        </label>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
              !selectedCategory
                ? 'bg-primary-100 text-primary-700'
                : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            All Categories
          </button>
          {eventCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-3">
          Budget Range
        </label>
        <div className="space-y-3">
          <Input
            type="range"
            min="0"
            max="500000"
            step="50000"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: parseInt(e.target.value) })
            }
          />
          <div className="flex gap-2 text-sm text-neutral-600">
            <span>${(priceRange.min / 1000).toFixed(0)}K</span>
            <span>-</span>
            <span>${(priceRange.max / 1000).toFixed(0)}K</span>
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-neutral-900 mb-3">
          Location
        </label>
        <Input
          type="text"
          placeholder="Search location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {/* Clear Filters */}
      {(searchQuery || selectedCategory || location) && (
        <Button
          variant="secondary"
          fullWidth
          onClick={() => {
            setSearchQuery('');
            setSelectedCategory('');
            setLocation('');
            setPriceRange({ min: 0, max: 500000 });
          }}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  if (loading) {
    return <Loading message="Loading events..." />;
  }

  return (
    <MainLayout>
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">
            Discover Events to Sponsor
          </h1>
          <p className="text-lg text-neutral-600">
            Find the perfect sponsorship opportunities for your brand
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-12"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input appearance-none bg-white cursor-pointer"
            >
              <option value="recent">Latest First</option>
              <option value="price-low">Budget: Low to High</option>
              <option value="price-high">Budget: High to Low</option>
              <option value="audience-size">Audience Size</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn btn-secondary"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory || location) && (
            <div className="flex gap-2 flex-wrap">
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory('')}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {eventCategories.find((c) => c.id === selectedCategory)?.name}
                  <X className="w-4 h-4" />
                </button>
              )}
              {location && (
                <button
                  onClick={() => setLocation('')}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                >
                  {location}
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <Card size="lg">
              <Sidebar />
            </Card>
          </aside>

          {/* Mobile Sidebar */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowFilters(false)}>
              <Card className="m-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <Sidebar />
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            {filteredEvents.length === 0 ? (
              <Card size="lg" className="text-center py-12">
                <p className="text-neutral-600 font-medium mb-4">
                  No events found matching your criteria
                </p>
                <Button
                  variant="primary"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('');
                    setLocation('');
                    setPriceRange({ min: 0, max: 500000 });
                  }}
                >
                  Clear Filters
                </Button>
              </Card>
            ) : (
              <div>
                <p className="text-sm text-neutral-600 mb-6">
                  {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Marketplace;
