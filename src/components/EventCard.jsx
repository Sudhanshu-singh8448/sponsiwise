import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, DollarSign, Star } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import { Card, Badge } from './UI';

/**
 * EventCard - Display event in marketplace listing
 */
export const EventCard = ({ event }) => {
  const minPrice = event.sponsorshipTiers[0]?.price || 0;
  const maxPrice = event.sponsorshipTiers[event.sponsorshipTiers.length - 1]?.price || 0;

  const categoryColors = {
    technology: 'primary',
    sports: 'error',
    entertainment: 'secondary',
    education: 'success',
    business: 'warning',
    nonprofit: 'error',
  };

  return (
    <Link to={`/event/${event.id}`}>
      <Card
        size="md"
        hoverable={true}
        className="h-full flex flex-col overflow-hidden hover:shadow-2xl transform hover:-translate-y-4 transition-all duration-500 group"
        style={{boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', borderColor: 'rgba(107, 197, 233, 0.2)'}}
      >
        {/* Image */}
        <div className="w-full h-48 bg-neutral-200 overflow-hidden mb-4 relative">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-3 right-3 bg-gradient-to-br from-blue-500 to-cyan-400 text-white px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" style={{boxShadow: '0 0 15px rgba(107, 197, 233, 0.5)'}}>
            View Details
          </div>
        </div>

        {/* Badge */}
        <div className="mb-2 animate-fade-in">
          <Badge variant={categoryColors[event.category] || 'primary'} style={{background: 'linear-gradient(135deg, rgba(107, 197, 233, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)', color: 'rgb(107, 197, 233)', fontWeight: '600'}}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-neutral-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
          {event.name}
        </h3>

        {/* Location & Date */}
        <div className="space-y-2 mb-4 text-sm text-neutral-600">
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
            <MapPin className="w-4 h-4" style={{color: 'rgb(107, 197, 233)'}} />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{transitionDelay: '50ms'}}>
            <Calendar className="w-4 h-4" style={{color: 'rgb(107, 197, 233)'}} />
            <span>{formatDate(event.date)}</span>
          </div>
        </div>

        {/* Audience & Budget */}
        <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-y border-neutral-200 group-hover:border-cyan-300 transition-colors duration-300">
          <div>
            <p className="text-xs text-neutral-500 font-medium">Audience</p>
            <p className="text-sm font-semibold text-neutral-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors duration-300">
              <Users className="w-4 h-4" style={{color: 'rgb(107, 197, 233)'}} />
              {event.audience.size.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 font-medium">Budget Range</p>
            <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent flex items-center gap-1">
              <DollarSign className="w-4 h-4" style={{color: 'rgb(107, 197, 233)'}} />
              {minPrice === maxPrice
                ? formatCurrency(minPrice)
                : `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 line-clamp-2 mb-4 flex-1 group-hover:text-neutral-700 transition-colors duration-300">
          {event.description}
        </p>

        {/* Organizer */}
        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between hover:translate-x-1 transition-transform duration-300 group-hover:border-cyan-300">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300" style={{background: 'linear-gradient(135deg, rgba(107, 197, 233, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)', color: 'rgb(107, 197, 233)', fontWeight: '600', fontSize: '0.875rem'}}>
              {event.organizer?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-neutral-900 group-hover:text-blue-600 transition-colors duration-300">
              {event.organizer?.organizationName || event.organizer?.companyName}
            </span>
          </div>
          <Star className="w-4 h-4 text-amber-400 fill-amber-400 hover:scale-125 hover:-rotate-12 transition-transform duration-300" />
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
