import { UserInfoCookie } from '@/types/user';
import type { NextRequest } from 'next/server'

export function checkLoggedIn(request: NextRequest): boolean {
  const userEmailCookie = request.cookies.get('user-email');
  if (!userEmailCookie) return false
  return Boolean(userEmailCookie?.value) ?? false
}

export function deleteLoggedInCookie() {
  const cookies = ['user-email', 'user-id', 'user-full-name', 'user-role-id']
  cookies.forEach(cookie => {
    document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
}

export function getUserInfoCookie(): UserInfoCookie {
  if (!document) return {
    email: '',
    id: '',
    'full-name': '',
    'role-id': ''
  }

  const userInfoCookie: UserInfoCookie = {
    email: '',
    id: '',
    'full-name': '',
    'role-id': ''
  }
  const cookies = document.cookie?.split('; ')

  cookies.forEach(cookie => {
    const [name, value] = cookie.split('=')
    const nameParts = name.split('user-')
    userInfoCookie[nameParts[1] as keyof UserInfoCookie] = value
  })
  
  return userInfoCookie
}

export function setUserInfoCookie(userInfo: UserInfoCookie) {
  const cookies = Object.entries(userInfo)
  cookies.forEach(([key, value]) => {
    document.cookie = `user-${key}=${value}; path=/;`
  })
}