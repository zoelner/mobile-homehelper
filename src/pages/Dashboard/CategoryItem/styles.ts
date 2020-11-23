import styled from 'styled-components/native';
import { Image as ImageNative } from 'react-native';

export const Container = styled.View`
  margin: 16px 8px 0px 8px;

  align-items: center;
  box-shadow: 2px 4px 10px rgba(105, 62, 255, 0.1);
`;

export const Image = styled(ImageNative)`
  height: 80px;
  width: 160px;
  resize-mode: cover;
  border-radius: 8px;
  justify-content: center;
`;

export const CategoryText = styled.Text`
  margin-top: 8px;

  color: #020202;
  font-size: 12px;
  font-weight: 300;
`;
