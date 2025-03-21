import { RestAPI } from './restAPI'
import { MockAPI } from './mockAPI'
import { IApiClient } from './apiClient'

export const api: IApiClient =
  import.meta.env.VITE_USE_MOCK_API === 'true' ? new MockAPI() : new RestAPI()
