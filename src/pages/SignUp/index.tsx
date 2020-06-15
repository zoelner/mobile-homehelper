import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, SubTitle, InputContainer } from './styles';
import { Form, FormHandles } from '@unform/core';
import getValidationError from '../../utils/getValidationError';

interface SignInFormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  username: Yup.string().required('Usuário obrigatório'),
  email: Yup.string().email().required('Usuário obrigatório'),
  password: Yup.string().min(6).required('Digite uma senha válida'),
});

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const usernameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);

        formRef.current?.setErrors(errors);

        return;
      }
    }
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
          <Title>Crie sua conta.</Title>
          <SubTitle>
            Você irá se surpreender com a experiência de utilizar a nossa
            plataforma.
          </SubTitle>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <InputContainer>
              <Input
                name="name"
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="name"
                textContentType="name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  usernameInputRef.current?.focus();
                }}
              />
              <Input
                ref={usernameInputRef}
                name="username"
                placeholder="Usuário"
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="username"
                textContentType="username"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                name="email"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                keyboardType="email-address"
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
            Cadastrar
          </Button>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
