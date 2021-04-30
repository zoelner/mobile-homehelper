import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  height: 40px;
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
