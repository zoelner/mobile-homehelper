import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  background-color: #ffffff;
  margin: 16px 16px 0 16px;
`;

export const ImageBudget = styled.Image`
  height: 200px;
  width: ${Dimensions.get('screen').width}px;
  resize-mode: cover;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin: 16px 0;
`;

export const LabelWrapper = styled.View`
  flex-flow: row nowrap;
  margin-top: 8px;
`;

export const Label = styled.Text`
  font-size: 13px;
  color: #8a8a8f;
  box-shadow: 2px 4px 4px rgba(138, 138, 143, 0.25);
`;

export const FooterBudgetDescription = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: row;
  z-index: 1;
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
`;

export const ProfessionalImage = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  margin: 8px 0;
`;

export const Header = styled.View`
  align-items: center;
  margin-bottom: 32px;
`;
