import React, { useRef, useEffect } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
}

interface InputValueReference {
  value: string;
}

function Input(props: InputProps): React.ReactElement<InputProps> {
  const { name, ...rest } = props;

  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={(value: string) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
        placeholderTextColor="#8A8A8F"
        keyboardAppearance="light"
      />
    </Container>
  );
}

export default Input;
