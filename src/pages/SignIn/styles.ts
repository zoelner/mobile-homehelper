import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
  align-items: center;
  justify-content: center;
  width: 300px;
  margin: auto;
`;

export const Image = styled.Image`
  width: 100%;
  resize-mode: contain;
  margin-bottom: 16px;
`;

export const SubTitle = styled.Text`
  font-size: 14px;
  margin: 12px 20px;
  text-align: center;
`;

export const InputContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 24px;
  width: 300px;

  height: 112px;
  justify-content: space-between;
`;
