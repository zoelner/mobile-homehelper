export enum Roles {
  ROLE_PROFESSIONAL = 'ROLE_PROFESSIONAL',
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}

export type UserState = {
  profile: null;
  roles: Roles[];
};
