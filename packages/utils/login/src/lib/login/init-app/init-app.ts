import { sanitizeNext } from './sanitize-next';

export function initApp(params: URLSearchParams) {
  const nextRaw = params.get('next');
  const client = params.get('client'); // optional
  const state = params.get('state');   // optional

  console.log(nextRaw, client, state, sanitizeNext(nextRaw));
}
