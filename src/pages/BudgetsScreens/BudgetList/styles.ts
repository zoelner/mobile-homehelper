import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView).attrs({
  edges: ['top', 'right', 'left'],
})`
  flex: 1;
  background-color: #f2f2f2;
  padding: 16px 16px 0;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  height: 20px;
  margin-bottom: 8px;
`;

export const HeaderText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #212121;
`;
