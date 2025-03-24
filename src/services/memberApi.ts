import { FindInvitationsResponse } from './response/FindInvitationsResponse'

export interface MemberApi {
  login(email: string, password: string): Promise<any>
  register(email: string, password: string, username: string): Promise<void>
  resetPassword(password: string, confirmPassword: string): Promise<void>
  updateProfile(newUsername: string): Promise<void>
  getInvitations(): Promise<FindInvitationsResponse>
  acceptInvitation(invitationId: number): Promise<void>
  declineInvitation(invitationId: number): Promise<void>
}
