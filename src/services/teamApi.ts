import GetMyTeamsWithManagerResponse from './response/GetMyTeamsWithManagerResponse'

export interface TeamApi {
  createTeam(name: string, description: string): Promise<void>
  leaveTeam(teamId: number): Promise<void>
  getMyTeamsWithManager(): Promise<GetMyTeamsWithManagerResponse>
}
