export interface IApiClient {
  login(email: string, password: string): Promise<any>
  register(email: string, password: string, username: string): Promise<void>
  resetPassword(password: string, confirmPassword: string): Promise<void>
  updateProfile(newUsername: string): Promise<void>
}
