import React, { useRef, useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Switch,
  View,
  Text,
} from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import Input from '~/components/Input';

import getValidationError from '~/core/utils/getValidationError';
import { signUpRequest } from '~/core/store/modules/auth/actions';

import { Container, Title, SubTitle, InputContainer } from './styles';

interface SignUpFormData {
  name: string;
  username: string;
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  username: Yup.string().required('Usuário obrigatório'),
  email: Yup.string().email().required('Email obrigatório'),
  password: Yup.string().min(6).required('Digite uma senha válida'),
});

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const usernameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(signUpRequest(data));
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
          <Title>Crie sua conta.</Title>
          <SubTitle>
            Você irá se surpreender com a experiência de utilizar a nossa
            plataforma.
          </SubTitle>

          <Form ref={formRef} onSubmit={handleSignUp}>
            <InputContainer>
              <Input
                name="name"
                placeholder="Nome"
                autoCorrect={false}
                autoCapitalize="none"
                autoCompleteType="name"
                textContentType="name"
                maxLength={100}
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
                maxLength={30}
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
                maxLength={40}
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
                textContentType="newPassword"
                autoCapitalize="none"
                secureTextEntry
                returnKeyType="send"
                maxLength={32}
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Switch
                  trackColor={{ false: '#767577', true: '#f4f3f4' }}
                  thumbColor={isEnabled ? '#41cebb' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  style={{ marginRight: 8, marginTop: 8, marginBottom: 8 }}
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
                <Text>
                  Eu aceito os{' '}
                  <Text
                    style={{ color: '#007bff' }}
                    onPress={() => navigation.navigate('TermsOfUse')}
                  >
                    Termos de uso.
                  </Text>
                </Text>
              </View>

              <Button
                disabled={!isEnabled}
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Cadastrar
              </Button>
            </InputContainer>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
