import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { ProfessionalListType } from '.';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ProfessionalList = styled(
  FlatList as new () => FlatList<ProfessionalListType>,
)`
  padding: 8px;
`;

export const ProfessionalItem = styled.View`
  flex-flow: row nowrap;
  align-items: center;
  margin: 8px 0;
  padding: 12px;
  border: 1px;
  border-radius: 8px;
  border-color: #8a8a8f;
  border-width: 0.25px;
  background-color: #ffffff;
  box-shadow: 0px 3px 2px rgba(138, 138, 143, 0.15);
  width: 100%;
`;

export const ProfessionalItemImage = styled.Image`
  width: 48px;
  height: 48px;

  margin-left: 8px;

  border-color: #8a8a8f;
  border-width: 0.5px;
  border-radius: 24px;
`;

export const ProfessionalItemBoxText = styled.View`
  margin-left: 16px;
  margin-top: 4px;
  width: 80%;
`;

export const ProfessionalItemText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

export const ProfessionalItemDescription = styled.Text`
  margin-top: 4px;
  font-size: 14px;
  color: #8a8a8f;
`;
