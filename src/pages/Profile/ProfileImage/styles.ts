import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  height: 180px;
  width: 180px;
  align-self: center;
`;

export const Image = styled.ImageBackground.attrs({
  imageStyle: {
    borderRadius: 90,
    borderColor: '#e2e2e2',
    borderWidth: 4,
    resizeMode: 'cover',
  },
})`
  height: 180px;
  width: 180px;

  margin-top: 16px;
`;
