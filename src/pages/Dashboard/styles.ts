import styled from 'styled-components/native';
import { Dimensions, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  width: ${Dimensions.get('screen').width}px;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-left: 16px;
  align-items: center;
  height: 40px;
`;

export const HeaderButton = styled.TouchableHighlight.attrs({
  underlayColor: '#DDDDDD',
})``;

export const HeaderButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: #212121;
`;

export const CategoryList = styled(
  FlatList as new () => FlatList<CategoryType>,
)`
  height: 146px;
  flex-grow: 1;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  margin: 8px;
  font-size: 16px;
  font-weight: bold;
`;

export const ServiceList = styled(
  FlatList as new () => FlatList<ServiceType>,
)``;
