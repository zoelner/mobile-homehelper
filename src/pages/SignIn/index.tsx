import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';
import { Form, FormHandles } from '@unform/core';
import { useDispatch } from 'react-redux';

import getValidationError from '../../utils/getValidationError';
import { signInRequest } from '../../store/modules/auth/actions';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, SubTitle, InputContainer } from './styles';

interface SignInFormData {
  username: string;
  password: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required('Usuário obrigatório'),
  password: Yup.string().required('Digite uma senha válida'),
});

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(signInRequest(data));
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
          <Title>Bem Vindo</Title>
          <SubTitle>
            Estamos felizes em te encontrar! Gostariamos de ajudar a resolver o
            seu problema.
          </SubTitle>

          <Form ref={formRef} onSubmit={handleSignIn}>
            <InputContainer>
              <Input
                name="username"
                placeholder="Usuário"
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="username"
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
                textContentType="newPassword"
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
