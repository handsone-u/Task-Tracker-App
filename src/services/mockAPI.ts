import { IApiClient } from './apiClient'

export class MockAPI implements IApiClient {
  login(email: string, password: string): Promise<any> {
    console.log('Mock login:', email, password)
    return Promise.resolve({
      token: 'mock-token',
      username: 'MockUser',
    })
  }

  register(email: string, password: string, username: string): Promise<void> {
    console.log('Mock register:', email, password, username)
    return Promise.resolve()
  }

  resetPassword(password: string, confirmPassword: string): Promise<void> {
    if (password !== confirmPassword) {
      return Promise.reject(new Error('Passwords do not match'))
    } else {
      return Promise.resolve()
    }
  }

  updateProfile(newUsername: string): Promise<void> {
    return Promise.resolve()
  }
}
