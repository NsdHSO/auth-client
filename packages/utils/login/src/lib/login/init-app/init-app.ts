import { sanitizeNext } from './sanitize-next';

export function initApp(params: URLSearchParams) {
  const nextRaw = params.get('next');
  const client = params.get('client'); // optional
  const state = params.get('state');   // optional
  const nextEncrypted = sanitizeNext(nextRaw);

  if (nextEncrypted) {
    sessionStorage.setItem('next', nextEncrypted);
  }
  if (client) {
    sessionStorage.setItem('client', client);
  }
  if (state) {
    sessionStorage.setItem('state', state);
  }

  return Promise.resolve();
}
