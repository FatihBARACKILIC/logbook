export function isExternalURL(url: string | URL | null | undefined): boolean {
  if (typeof url === "string" && !url.startsWith("/") && !url.startsWith("#")) {
    return true;
  } else if (url instanceof URL && !url.pathname.startsWith("/") && !url.hash) {
    return true;
  }
  return false;
}
