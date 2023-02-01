/*
 * Copyright 2023 Marek Kobida
 */

const c = [
  'address',
  'branches',
  'email',
  'hours',
  'id',
  'latitude',
  'longitude',
  'name',
  'phoneNumber',
  'sellers',
] as const;

const d = [
  'category',
  'destinations',
  'hotels',
  'id',
  'isActive',
  'latitude',
  'level',
  'longitude',
  'name',
  'parentId',
  'url',
] as const;

const h = [
  'category',
  'equipment',
  'id',
  'latitude',
  'longitude',
  'name',
  'parentId',
  'photoId',
  'starCount',
  'terms',
  'type',
  'url',
  'videoId',
] as const;

const t = [
  'adultCount',
  'childAge',
  'code',
  'date',
  'dayCount',
  'discount',
  'id',
  'isActive',
  'personCount',
  'price',
  'room',
  'roomCount',
  'service',
  'serviceId',
  'transportation',
  'transportationFrom',
  'transportationFromId',
  'transportationId',
  'type',
  'url',
] as const;

export default [...c, ...d, ...h, ...t];
