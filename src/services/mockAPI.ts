import { IApiClient } from './apiClient'

export class MockAPI implements IApiClient {
  login(email: any, password: any): Promise<any> {
    console.log('Mock login:', email, password)
    return Promise.resolve({
      token: 'mock-token',
      username: 'MockUser',
    })
  }
  register(email: any, password: any, username: any): Promise<any> {
    console.log('Mock register:', email, password, username)
    return Promise.resolve({
      success: true,
    })
  }
}
