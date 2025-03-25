import GetMyTeamsWithManagerResponse from './response/GetMyTeamsWithManagerResponse'
import { MyTeam } from './response/GetMyTeamsWithManagerResponse'
import { TeamApi } from './teamAPI'

export class MockTeamApi implements TeamApi {
  async createTeam(name: string, description: string): Promise<void> {
    console.log(`Mock API: Creating team ${name} with description ${description}`)
    return Promise.resolve()
  }

  async leaveTeam(teamId: number): Promise<void> {
    console.log('leave team')
    return Promise.resolve()
  }

  async getMyTeamsWithManager(): Promise<GetMyTeamsWithManagerResponse> {
    console.log('get my teams with manager')
    return Promise.resolve(
      new GetMyTeamsWithManagerResponse([
        new MyTeam(1, 'Team 1', 'Manager 1', 'TEAM_MANAGER'),
        new MyTeam(2, 'Team 2', 'Manager 2', 'TEAM_MEMBER'),
      ]),
    )
  }
}
