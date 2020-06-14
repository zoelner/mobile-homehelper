import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 58px;
  border-radius: 90px;
  background-color: #ffffff;
  padding: 18px 24px;
  margin-bottom: 16px;

  ${(props) =>
    props.isErrored &&
    css`
      border-width: 2px;
      border-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;
