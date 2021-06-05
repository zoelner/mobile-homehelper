import React from 'react';

import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { Container, Text, Variant } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
  variant?: Variant;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'contained',
  loading = false,
  disabled = false,
  ...rest
}) => (
  <Container {...rest} variant={variant} disabled={disabled}>
    {loading ? (
      <ActivityIndicator
        size="small"
        color={variant === 'contained' ? '#fff' : '#212121'}
      />
    ) : (
      <Text variant={variant}>{children}</Text>
    )}
  </Container>
);

export default Button;
