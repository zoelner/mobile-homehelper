import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 48px;
  border-radius: 4px;
  padding: 12px 16px;
  font-size: 14px;

  background-color: #ffffff;

  ${(props) =>
    props.isErrored &&
    css`
      border-width: 1px;
      border-color: #fa7d7d;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      box-shadow: 0px 2px 4px rgba(178, 178, 178, 0.25);
    `};
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 14px;
  color: #b2b2b2;
`;
