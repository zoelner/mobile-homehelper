import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, SubTitle, InputContainer } from './styles';
import { Form, FormHandles } from '@unform/core';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={136}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Title>Bem Vindo</Title>
          <SubTitle>
            Estamos felizes em te encontrar! Gostariamos de ajudar a resolver o
            seu problema.
          </SubTitle>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <InputContainer>
              <Input
                name="user"
                placeholder="Usuário"
                autoFocus
                autoCapitalize="none"
                textContentType="username"
                autoCompleteType="username"
              />
              <Input
                name="password"
                placeholder="Senha"
                textContentType="password"
                autoCompleteType="password"
                secureTextEntry
              />
            </InputContainer>
          </Form>

          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Entrar
          </Button>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
