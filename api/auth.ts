import { HOST } from './index';

export const fetchUserStatus = async (): Promise<{ user?: string }> => {
  if (typeof fetch === 'undefined') return {};

  const response = await fetch(`${HOST}/user`, { credentials: 'include' });

  if (!response.ok) {
    return {};
  }

  return await response.json();
};

export const fetchLogin = async () => {
  if (typeof fetch === 'undefined') return {};

  const response = await fetch(`${HOST}/login`, { method: 'POST', credentials: 'include' });

  if (!response.ok) {
    return {};
  }

  return await fetchUserStatus();
};

export const fetchLogout = async () => {
  if (typeof fetch === 'undefined') return {};

  return await fetch(`${HOST}/logout`, { method: 'POST', credentials: 'include' });
};
