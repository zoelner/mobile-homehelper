import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 144px;
  background: #ffffff;
  border-radius: 5px;
  padding: 18px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: #363f5f;
  font-size: 14px;
`;

export const Description = styled.Text`
  margin-top: 8px;
  color: #969cb3;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16px;
  justify-content: space-between;
  margin-top: auto;
`;

export const FooterWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CategoryText = styled.Text`
  margin-left: 8px;
  color: #363f5f;
`;

export const CreatedAtText = styled.Text`
  color: #363f5f;
`;
