const normalizePath = (value: string) => {
  const parts = value.split("/").filter(Boolean);
  if (!parts.length) return "";
  return `/${parts.join("/")}`;
};

const isPagesPreview = process.env.NEXT_PUBLIC_IS_PAGES_PREVIEW === "true";
const repositoryName =
  process.env.NEXT_PUBLIC_PAGES_REPOSITORY || process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const branchDir = process.env.NEXT_PUBLIC_PAGES_BRANCH_PATH || "";

export const publicBasePath = isPagesPreview ? normalizePath(`${repositoryName}/${branchDir}`) : "";

export const withBasePath = (value: string) => {
  const path = value.startsWith("/") ? value : `/${value}`;
  if (!publicBasePath) return path;
  return `${publicBasePath}${path}`;
};
