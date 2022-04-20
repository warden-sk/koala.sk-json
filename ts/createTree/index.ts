/*
 * Copyright 2022 Marek Kobida
 */

import { Destination } from '../createDestination';
import EnhancedDestination from './EnhancedDestination';
import EnhancedHotel from './EnhancedHotel';
import EnhancedHotelTerm from './EnhancedHotelTerm';

export interface FilterConditions {
  hotel: ((hotel: EnhancedHotel) => boolean)[];
  hotelTerm: ((hotelTerm: EnhancedHotelTerm) => boolean)[];
}

export interface SearchInput {
  category?: number[] | number;
  days?: [from: number, to: number];
  destinationId?: number;
  hasDiscount?: boolean;
  hotelId?: number;
  name?: string;
  price?: [from: number, to: number];
  serviceId?: number[] | number;
  stars?: number[] | number;
  transportationId?: number[] | number;
}

export class Tree {
  destinations: EnhancedDestination[];

  constructor(destinations: Destination[]) {
    this.destinations = destinations.map(this.#createEnhancedDestination);
  }

  #createEnhancedDestination = (destination: Destination): EnhancedDestination => {
    return new EnhancedDestination(destination);
  };

  search({
    category,
    days,
    destinationId,
    hasDiscount,
    hotelId,
    name,
    price,
    serviceId,
    stars,
    transportationId,
  }: SearchInput = {}): EnhancedHotel[] {
    const filterConditions: FilterConditions = {
      hotel: [
        // has category
        hotel =>
          category
            ? Array.isArray(category)
              ? category.findIndex(hotel.hasCategory) !== -1
              : hotel.hasCategory(category)
            : true,
        // has id
        hotel => (hotelId ? hotel.id === hotelId : true),
        // has name
        hotel => (name ? new RegExp(name).test(hotel.name) : true),
        // has serviceId
        hotel =>
          serviceId
            ? Array.isArray(serviceId)
              ? serviceId.findIndex(hotel.hasServiceId) !== -1
              : hotel.hasServiceId(serviceId)
            : true,
        // has stars
        hotel =>
          stars ? (Array.isArray(stars) ? stars.findIndex(hotel.hasStars) !== -1 : hotel.hasStars(stars)) : true,
      ],
      hotelTerm: [
        // has days
        hotelTerm => (days ? hotelTerm.hasDays(days[0], days[1]) : true),
        // has discount
        hotelTerm => (hasDiscount ? hotelTerm.hasDiscount() : true),
        // has price
        hotelTerm => (price ? hotelTerm.hasPrice(price[0], price[1]) : true),
        // has transportationId
        hotelTerm =>
          transportationId
            ? Array.isArray(transportationId)
              ? transportationId.findIndex(hotelTerm.hasTransportationId) !== -1
              : hotelTerm.hasTransportationId(transportationId)
            : true,
      ],
    };

    const hotels = this.destinations.flatMap(destination =>
      destination.hotels(true).filter(
        hotel =>
          // 1
          filterConditions.hotel.every(filterCondition => filterCondition(hotel)) &&
          // 2
          hotel.terms.filter(hotelTerm =>
            filterConditions.hotelTerm.every(filterCondition => filterCondition(hotelTerm))
          ).length
      )
    );

    return hotels.filter(hotel =>
      destinationId
        ? hotel
            .breadcrumbs(hotel.parent, destination => destination.id)
            .findIndex(breadcrumb => breadcrumb === destinationId) !== -1
        : true
    );
  }
}

function createTree(destinations: Destination[]): Tree {
  return new Tree(destinations);
}

export default createTree;
