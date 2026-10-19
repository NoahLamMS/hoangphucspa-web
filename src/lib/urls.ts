export function serviceUrl(slug: string): string {
  return `/dich-vu/${slug}`;
}

export function subServiceUrl(id: number, slug: string): string {
  return `/dich-vu/${id}/${slug}`;
}

export function newsUrl(publicId: number, slug: string): string {
  return `/tin-tuc/${publicId}/${slug}`;
}

export function libraryUrl(publicId: number, slug: string): string {
  return `/bai-dang/${publicId}/${slug}`;
}

export function pageUrl(key: string): string {
  return `/${key}`;
}
