export type QueryRecord = Record<string, string | string[]>;
export function parseQuery(query: string): QueryRecord {
  if (typeof query !== 'string') throw new TypeError('Expected query text');
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query),
    out: QueryRecord = {};
  params.forEach((value, key) => {
    if (!Object.hasOwn(out, key))
      Object.defineProperty(out, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    else {
      const old = out[key]!;
      if (Array.isArray(old)) old.push(value);
      else
        Object.defineProperty(out, key, {
          value: [old, value],
          writable: true,
          enumerable: true,
          configurable: true,
        });
    }
  });
  return out;
}
export function stringifyQuery(
  record: Readonly<Record<string, string | readonly string[]>>,
): string {
  if (!record || typeof record !== 'object' || Array.isArray(record))
    throw new TypeError('Expected query record');
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(record)) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (typeof item !== 'string') throw new TypeError('Query values must be strings');
      params.append(key, item);
    }
  }
  return params.toString();
}
