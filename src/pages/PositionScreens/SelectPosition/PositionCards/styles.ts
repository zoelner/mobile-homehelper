import styled, { css } from 'styled-components/native';

interface ICurrentLocalization {
  active: boolean;
}

export const CurrentLocalization = styled.TouchableOpacity<
  ICurrentLocalization
>`
  padding: 16px 24px;
  flex-direction: row;
  background-color: #ffffff;
  margin: 8px;

  border-radius: 8px;

  ${(props) =>
    props.active &&
    css`
      border: 0.5px solid #41cebb;
    `}
`;

export const CurrentLocalizationIcon = styled.View`
  margin-right: 16px;
  justify-content: center;
`;

export const CurrentLocalizationTitle = styled.Text`
  font-size: 14px;
`;

export const CurrentLocalizationSubtitle = styled.Text`
  margin-top: 2px;
  font-size: 12px;
  color: #8a8a8f;
`;
