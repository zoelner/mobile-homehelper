import styled from 'styled-components/native';
import { Dimensions, FlatList, SafeAreaView } from 'react-native';

import { CategoryType } from './CategoryItem';
import { ServiceType } from './ServiceItem';

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
  flex-grow: 0;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  margin: 16px 8px;
  font-size: 16px;
  font-weight: 500;
`;

export const ServiceList = styled(
  FlatList as new () => FlatList<ServiceType>,
)``;
