import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 16px 0;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  align-self: center;
  text-align: center;
`;

export const HeaderDescription = styled.Text`
  align-self: center;
  text-align: center;
  margin-top: 8px;
  padding: 8px;
`;

export const Content = styled.View`
  margin: 16px 0;
`;

export const ContentButton = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const ButtonSelect = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  border: 1px solid #242424;
  border-radius: 4px;
  width: 120px;
  padding: 8px;
`;

export const ButtonSelectText = styled.Text`
  text-align: center;
  color: #242424;
  margin: 4px;
`;

export const ContentImages = styled.View`
  margin-top: 60px;
  border-radius: 4px;
`;
