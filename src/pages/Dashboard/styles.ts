import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const CategoryList = styled(FlatList)`
  flex: 1;
`;

export const Category = styled.TouchableOpacity`
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
