import { RestMemberAPI } from './restMemberApi'
import { MockMemberApi } from './mockMemberApi'
import { MemberApi } from './memberApi'

export const memberApiClient: MemberApi =
  import.meta.env.VITE_USE_MOCK_API === 'true' ? new MockMemberApi() : new RestMemberAPI()
