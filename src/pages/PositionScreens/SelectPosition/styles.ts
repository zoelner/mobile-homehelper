import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
`;

export const Header = styled.View`
  position: relative;
`;

export const HeaderBackButton = styled(Feather).attrs({
  name: 'chevron-left',
  size: 30,
  color: '#41cebb',
})`
  position: absolute;
  top: 16px;
  left: 16px;
`;

export const FakeUserInput = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;

  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  margin: 8px;
`;

export const FakeUserInputText = styled.Text`
  font-size: 14px;
  color: #8a8a8f;
  margin-left: 16px;
  font-weight: bold;
`;
