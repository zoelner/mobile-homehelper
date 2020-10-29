import styled from 'styled-components/native';
import { FlatList, SafeAreaView } from 'react-native';
import { Category } from '.';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
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

export const CategoryList = styled(FlatList as new () => FlatList<Category>)`
  flex: 1;
`;

export const CategoryItem = styled.TouchableOpacity`
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(105, 62, 255, 0.18);
  border-radius: 20px;

  height: 80px;
  margin: 16px 8px 0px 8px;

  justify-content: center;

  padding: 8px 16px;
`;

export const CategoryText = styled.Text`
  color: #6c6c6c;
  font-size: 16px;
  font-weight: 500;
`;
