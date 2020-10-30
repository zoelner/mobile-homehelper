import styled from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

export const Container = styled.SafeAreaView`
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
