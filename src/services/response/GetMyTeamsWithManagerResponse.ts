export default class GetMyTeamsWithManagerResponse {
  myTeams: MyTeam[]

  constructor(myTeams: MyTeam[]) {
    this.myTeams = myTeams
  }
}

export class MyTeam {
  teamId: number
  teamName: string
  myTeamRole: string
  teamManagerUsername: string

  constructor(teamId: number, teamName: string, teamManagerUsername: string, myTeamRole: string) {
    this.teamId = teamId
    this.teamName = teamName
    this.myTeamRole = myTeamRole
    this.teamManagerUsername = teamManagerUsername
  }
}
