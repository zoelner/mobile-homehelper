import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';

import { TextInputProps, TextInput as TextInputRN } from 'react-native';
import { useField } from '@unform/core';
import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, containerStyle = {}, ...rest },
  ref,
) => {
  const inputElementRef = useRef<TextInputRN & { value: unknown }>(null);

  const { registerField, defaultValue, fieldName, error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  useEffect(() => {
    if (inputElementRef.current) inputElementRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputElementRef.current,
      getValue() {
        if (inputElementRef.current) return inputElementRef.current.value;
        return '';
      },
      setValue(ref, value) {
        if (inputElementRef.current) {
          inputElementRef.current.setNativeProps({ text: value });
          inputElementRef.current.value = value;
        }
      },
      clearValue() {
        if (inputElementRef.current) {
          inputElementRef.current.setNativeProps({ text: '' });
          inputElementRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = (text: unknown) => {
    if (inputElementRef.current) inputElementRef.current.value = text;
  };

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <TextInputRN
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={handleChangeText}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
        style={{
          flex: 1,
          fontSize: 14,
          color: '#b2b2b2',
        }}
        placeholderTextColor="#8A8A8F"
      />
    </Container>
  );
};

export default forwardRef(Input);
