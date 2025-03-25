export interface TeamApi {
  createTeam(name: string, description: string): Promise<void>
}
