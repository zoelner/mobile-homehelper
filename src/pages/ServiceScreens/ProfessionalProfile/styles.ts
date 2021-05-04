import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ProfileImageContainer = styled.View`
  margin-top: 32px;
  border-width: 2px;
  border-style: solid;
  border-color: rgba(138, 138, 143, 0.65);
  border-radius: 70px;
  box-shadow: 2px 4px 4px rgba(138, 138, 143, 0.25);
`;

export const ProfileImage = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
`;

export const Title = styled.Text`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 500;
`;

export const LabelWrapper = styled.View`
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export const Label = styled.Text`
  font-size: 13px;
  color: #8a8a8f;
  box-shadow: 2px 4px 4px rgba(138, 138, 143, 0.25);
`;

export const DescriptionContainer = styled.View`
  margin: 24px 8px;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(138, 138, 143, 0.15);
`;

export const Description = styled.Text`
  text-align: justify;
  color: #222222;
  letter-spacing: 0.2px;
`;

export const Budget = styled.View`
  width: 50%;
`;
