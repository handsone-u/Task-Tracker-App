import { TeamApi } from './teamAPI'

export class MockTeamApi implements TeamApi {
  createTeam(name: string, description: string): Promise<void> {
    console.log(`Mock API: Creating team ${name} with description ${description}`)
    return Promise.resolve()
  }
}
