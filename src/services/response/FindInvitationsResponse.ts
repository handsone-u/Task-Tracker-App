export class FindInvitationsResponse {
  private invitations: Invitation[]

  public getInvitations(): Invitation[] {
    return this.invitations
  }

  public setInvitations(invitations: Invitation[]): void {
    this.invitations = invitations
  }
}

export class Invitation {
  private id: number

  private teamId: number

  private teamName: string

  constructor(id: number, teamId: number, teamName: string) {
    this.id = id
    this.teamId = teamId
    this.teamName = teamName
  }
}
