import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export type Variant = 'contained' | 'text';

const ButtonVariants = {
  contained: css`
    background-color: #41cebb;
  `,
  text: css`
    background-color: transparent;
  `,
};

const TextVariants = {
  contained: css`
    color: #ffffff;
  `,
  text: css`
    color: #212121;
  `,
};

interface Props {
  variant: Variant;
}

export const Container = styled(TouchableOpacity)<Props>`
  height: 40px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  ${({ variant }) => ButtonVariants[variant]}
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.4;
    `}
`;

export const Text = styled.Text<Props>`
  font-size: 14px;
  font-weight: bold;

  ${({ variant }) => TextVariants[variant]}
`;
