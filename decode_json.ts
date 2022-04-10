/*
 * Copyright 2022 Marek Kobida
 */

import keys from './keys';

type Test<T> = T extends readonly unknown[]
  ? { [K in keyof T]: Test<T[K]> }
  : T extends object
  ? {
      // @ts-ignore
      [K in keyof T as typeof keys[K] extends string ? typeof keys[K] : K]: Test<T[K]>;
    }
  : T;

function decode_json<T>(json: T): Test<T> {
  if (Array.isArray(json)) return json.map(decode_json) as readonly unknown[] as Test<T>;

  if (typeof json === 'object')
    return Object.entries(json).reduce<{ [K: string]: string }>((t, [l, r]) => {
      const key = keys[l as keyof typeof keys] || l;

      t[key] = decode_json(r);

      return t;
    }, {}) as unknown as Test<T>;

  return json as Test<T>;
}

export default decode_json;
