import { action } from 'typesafe-actions';
import { UserTypes } from './types';

interface UpdateProfile {
  profile: ProfileType;
}

export const updateProfile = ({ profile }: UpdateProfile) =>
  action(UserTypes.UPDATE_PROFILE, { profile });
