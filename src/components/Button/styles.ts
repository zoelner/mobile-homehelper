import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 40px;
  width: 300px;
  border-radius: 4px;
  background-color: #41cebb;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #ffffff;
  font-weight: bold;
`;
