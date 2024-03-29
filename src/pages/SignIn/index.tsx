import React, { useRef, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useDispatch } from 'react-redux';

import Logo from '~/assets/images/Logo.png';

import getValidationError from '~/core/utils/getValidationError';
import { signInRequest } from '~/core/store/modules/auth/actions';

import Button from '~/components/Button';
import Input from '~/components/Input';

import { Container, Image, SubTitle, InputContainer } from './styles';

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

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
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
        }
      }
    },
    [dispatch],
  );

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
          <Image source={Logo} />
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
                textContentType="password"
                autoCompleteType="password"
                autoCapitalize="none"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
            </InputContainer>
            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Entrar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
