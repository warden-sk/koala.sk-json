/*
 * Copyright 2022 Marek Kobida
 */

type T0<T1> = T1 extends any[]
  ? { [K in keyof T1]: T0<T1[K]> }
  : T1 extends object
  ? { [K in keyof T1 as Exclude<K, symbol>]: T0<T1[K]> }
  : T1;

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function decode_json<T1>(json: T1): T0<T1>;
export function decode_json<T1>(json: T1) {
  return test(json, k => keys[alphabet.indexOf(k)] || k);
}

export function encode_json<T1>(json: T1): T0<T1>;
export function encode_json<T1>(json: T1) {
  return test(json, k => alphabet[keys.indexOf(k)] || k);
}

const keys: string[] = [
  'category',
  'date',
  'days',
  'destinations',
  'discount',
  'equipment',
  'hotels',
  'id',
  'isNew',
  'latitude',
  'level',
  'longitude',
  'name',
  'parentId',
  'photoId',
  'price',
  'serviceId',
  'stars',
  'terms',
  'transportationId',
  'type',
  'videoId',
];

function test<T1>(json: T1, $: (k: string) => string): T0<T1>;
function test<T1>(json: T1, $: (k: string) => string) {
  if (Array.isArray(json)) return json.map($$ => test($$, $));

  if (typeof json === 'object')
    return Object.entries(json).reduce<{ [k: string]: T1 }>((l, r) => {
      if (typeof r[1] === 'object') {
        l[$(r[0])] = test(r[1], $);
        return l;
      }

      l[$(r[0])] = r[1];

      return l;
    }, {});

  return json;
}
