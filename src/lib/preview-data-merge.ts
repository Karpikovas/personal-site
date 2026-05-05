const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== "object") return false;
  return Object.prototype.toString.call(value) === "[object Object]";
};

const mergeNode = (base: unknown, incoming: unknown): unknown => {
  if (incoming === undefined) return base;
  if (incoming === null) return null;

  if (Array.isArray(base) && Array.isArray(incoming)) {
    const maxLength = Math.max(base.length, incoming.length);
    const next: unknown[] = [];

    for (let index = 0; index < maxLength; index += 1) {
      next[index] = mergeNode(base[index], incoming[index]);
    }

    return next;
  }

  if (isPlainObject(base) && isPlainObject(incoming)) {
    const next: Record<string, unknown> = { ...base };

    for (const key of Object.keys(incoming)) {
      next[key] = mergeNode(base[key], incoming[key]);
    }

    return next;
  }

  // Live Preview can send relationship/upload values as IDs.
  // If we already have a populated object from server data, keep it.
  if (isPlainObject(base) && !isPlainObject(incoming)) {
    return base;
  }

  return incoming;
};

export const mergePreviewData = <T>(base: T, incoming: unknown): T => {
  if (incoming === undefined) return base;
  return mergeNode(base, incoming) as T;
};
