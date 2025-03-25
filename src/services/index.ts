import { RestMemberAPI } from './restMemberApi'
import { MockMemberApi } from './mockMemberApi'
import { MemberApi } from './memberApi'
import { MockTeamApi } from './mockTeamApi'
import { TeamApi } from './teamAPI'

const isMock = import.meta.env.VITE_USE_MOCK_API

export const memberApiClient: MemberApi =
  isMock === 'true' ? new MockMemberApi() : new RestMemberAPI()

export const teamApiClient: TeamApi = isMock === 'true' ? new MockTeamApi() : null
