export interface IApiClient {
  login(email, password): Promise<any>
  register(email, password, username): Promise<any>
}
