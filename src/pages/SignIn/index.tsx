import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, SubTitle, InputContainer } from './styles';
import { Form, FormHandles } from '@unform/core';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback((data: SignInFormData) => {
    console.log(data);
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={136}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
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
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="username"
                autoFocus
                textContentType="username"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                placeholder="Senha"
                textContentType="password"
                autoCompleteType="password"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
