import { Http } from 'cat-kit'

export const http = new Http({
  baseUrl: '/api',
  withCredentials: false,
  timeout: 18000
})
