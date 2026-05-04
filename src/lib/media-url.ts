export const resolveUploadRecord = (value: any): any | null => {
  if (!value || typeof value !== "object") return null;

  if (typeof value.url === "string" || typeof value.thumbnailURL === "string") {
    return value;
  }

  if (value.value && typeof value.value === "object") {
    return resolveUploadRecord(value.value);
  }

  return value;
};

export const resolveUploadURL = (value: any): string | undefined => {
  const upload = resolveUploadRecord(value);
  if (!upload) return undefined;

  return (
    upload.url ||
    upload.thumbnailURL ||
    upload?.sizes?.thumbnail?.url ||
    upload?.sizes?.card?.url ||
    undefined
  );
};
