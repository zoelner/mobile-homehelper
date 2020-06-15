import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  width: 300px;
  border-radius: 23px;
  background-color: #41cebb;
  align-items: center;
  padding-top: 13px;
  padding-bottom: 13px;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
`;
