import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: 104,
  enabled: true,
})`
  flex: 1;
  padding: 16px;
  position: relative;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  align-self: center;
  text-align: center;
`;

export const HeaderDescription = styled.Text`
  align-self: center;
  text-align: center;
  margin-top: 8px;
`;

export const Body = styled.View`
  margin-top: 32px;
  margin-bottom: auto;
`;
