export enum Roles {
  ROLE_PROFESSIONAL = 'ROLE_PROFESSIONAL',
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
}

export type UserState = {
  profile: ProfileType;
  roles: Roles[];
};

export enum UserTypes {
  UPDATE_PROFILE = 'UPDATE_PROFILE',
}
