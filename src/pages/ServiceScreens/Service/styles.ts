import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { ServiceTypeParsed } from './index';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ServiceList = styled(
  FlatList as new () => FlatList<ServiceTypeParsed>,
)`
  padding: 8px;
`;

export const ServiceItem = styled.View`
  flex-flow: row wrap;
  margin: 8px 0;
  padding: 12px;
  border: 1px;
  border-radius: 8px;
  border-color: #8a8a8f;
  border-width: 0.25px;
  background-color: #ffffff;
  box-shadow: 0px 3px 2px rgba(138, 138, 143, 0.15);
`;

export const ServiceItemImage = styled.Image`
  width: 56px;
  height: 56px;

  border-color: #8a8a8f;
  border-width: 0.5px;
  border-radius: 28px;
`;

export const ServiceItemBoxText = styled.View`
  margin-left: 16px;
  margin-top: 4px;
`;

export const ServiceItemText = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

export const ServiceItemWarning = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #c98b04;
`;
