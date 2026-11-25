import { useLocation, useSearch } from 'wouter';

/**
 * One query parameter as state, so a filtered view can be shared (?filter=ai,
 * ?skills=data). Setting it replaces the history entry (chips don't add one),
 * keeps every other parameter and the hash; null removes it.
 */
export function useQueryParam(name: string): [string | null, (value: string | null) => void] {
  const [location, navigate] = useLocation();
  const search = useSearch();
  const value = new URLSearchParams(search).get(name);
  const setValue = (next: string | null) => {
    const params = new URLSearchParams(search);
    if (next) params.set(name, next);
    else params.delete(name);
    const query = params.toString();
    navigate(`${location}${query ? `?${query}` : ''}${window.location.hash}`, { replace: true });
  };
  return [value, setValue];
}
