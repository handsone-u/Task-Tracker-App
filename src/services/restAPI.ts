import axios from 'axios'
import { IApiClient } from './apiClient'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export class RestAPI implements IApiClient {
  async login(email: any, password: any): Promise<any> {
    const response = await apiClient.post('/v0/members/login', {
      id: email,
      password: password,
    })
    return response.data
  }

  async register(email: any, password: any, username: any): Promise<any> {
    const response = await apiClient.post('/v0/members/register', {
      id: email,
      password: password,
      username: username,
    })
    return response.data
  }
}
