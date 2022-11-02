/*
 * Copyright 2022 Marek Kobida
 */

import isObject from './isObject';
import keys from './keys';

// @ts-ignore
function decode_json(json) {
  if (Array.isArray(json)) {
    return json.map(decode_json);
  }

  if (isObject(json)) {
    return Object.entries(json).reduce(($, [l, r]) => {
      // @ts-ignore
      const key = keys[l] ?? l;

      // @ts-ignore
      $[key] = decode_json(r);

      return $;
    }, {});
  }

  return json;
}

export default decode_json;
