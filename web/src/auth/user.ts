import type { NextRequest } from 'next/server'

export function checkLoggedIn(request: NextRequest): boolean {
  const userEmailCookie = request.cookies.get('user-email');
  if (!userEmailCookie) return false
  return Boolean(userEmailCookie?.value) ?? false
}

export function deleteLoggedInCookie() {
  document.cookie = 'user-email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}