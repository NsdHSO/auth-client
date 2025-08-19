export function sanitizeNext(next: string | null): string | null {
  if (!next) return null;

  // Option A: allow only relative paths (recommended)
  if (next.startsWith('/')) return next;

  // Option B: if you also allow full URLs, enforce a strict allowlist
  try {
    const nextDecoded = atob(next);
    const url = new URL(decodeURIComponent(nextDecoded));
    const allowed = new Set([
      'http://localhost:4200',
      'https://tevet-troc-client.vercel.app/',
      'https://nsdhso.github.io/tevet-troc-client/',
      'https://tevet-troc-client-git-appointments-nechiforel-davids-projects.vercel.app/',
    ]);
    if (allowed.has(url.origin)) return next;
  } catch {
    return null;
  }

  return null;
}
