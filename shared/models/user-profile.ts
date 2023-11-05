export const UserRoles = {
  admin: 'Administrador',
  editor: 'Editor',
}

export type Role = keyof typeof UserRoles

export interface UserProfile {
  id: string
  avatar?: string
  name: string
  email: string
  username: string
  role: Role
}
