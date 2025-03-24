import axios from 'axios'
import { IApiClient } from './apiClient'
import { FindInvitationsResponse } from './response/FindInvitationsResponse'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export class RestAPI implements IApiClient {
  async login(email: string, password: string): Promise<any> {
    const response = await apiClient.post('/v0/members/login', {
      id: email,
      password: password,
    })
    return response.data
  }

  async register(email: string, password: string, username: string): Promise<void> {
    const response = await apiClient.post('/v0/members/register', {
      id: email,
      password: password,
      username: username,
    })
    return response.data
  }

  async resetPassword(password: string, confirmPassword: string): Promise<void> {
    const response = await apiClient.post('/v0/members/reset-password', {
      password: password,
      confirmPassword: confirmPassword,
    })
    return response.data
  }

  async updateProfile(newUsername: string): Promise<void> {
    const response = await apiClient.patch('/v0/members/me', {
      newUsername: newUsername,
    })
    return response.data
  }

  async getInvitations(): Promise<FindInvitationsResponse> {
    throw new Error('Method not implemented.')
  }

  async acceptInvitation(invitationId: number): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async declineInvitation(invitationId: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
