import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { Form as UForm } from '@unform/mobile';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f2f2f2;
`;

export const Form = styled(UForm)`
  margin: 24px;
`;

export const FormField = styled.View`
  margin: 6px 0;
`;

export const FormFieldLabel = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #212121;
  margin: 2px 0;
`;

export const ProfileImage = styled.Image`
  height: 150px;
  width: 150px;
  border-radius: 75px;
  resize-mode: cover;
  align-self: center;

  border-color: #eee;
  border-width: 2px;
  margin-top: 16px;
`;
