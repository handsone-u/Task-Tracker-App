import { IApiClient } from './apiClient'
import { FindInvitationsResponse, Invitation } from './response/FindInvitationsResponse'

export class MockAPI implements IApiClient {
  async login(email: string, password: string): Promise<any> {
    console.log('Mock login:', email, password)
    return Promise.resolve({
      token: 'mock-token',
      username: 'MockUser',
    })
  }

  async register(email: string, password: string, username: string): Promise<void> {
    console.log('Mock register:', email, password, username)
    return Promise.resolve()
  }

  async resetPassword(password: string, confirmPassword: string): Promise<void> {
    if (password !== confirmPassword) {
      return Promise.reject(new Error('Passwords do not match'))
    } else {
      return Promise.resolve()
    }
  }

  async updateProfile(newUsername: string): Promise<void> {
    return Promise.resolve()
  }

  async getInvitations(): Promise<FindInvitationsResponse> {
    const response = new FindInvitationsResponse()
    response.setInvitations([
      new Invitation(1, 10, 'Mock Team'),
      new Invitation(2, 20, 'Mock Team 2'),
    ])
    return Promise.resolve(response)
  }

  async acceptInvitation(invitationId: number): Promise<void> {
    console.log('Mock accept invitaion:', invitationId)
    return Promise.resolve()
  }

  async declineInvitation(invitationId: number): Promise<void> {
    console.log('Mock decline invitaion:', invitationId)
    return Promise.resolve()
  }
}
