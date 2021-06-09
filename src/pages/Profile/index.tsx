import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Input from '~/components/Input';
import api from '~/core/services/api';
import { signOut } from '~/core/store/modules/auth/actions';

import { RootState } from '~/core/store/modules/rootReducer';
import { updateProfile } from '~/core/store/modules/user/actions';
import getValidationError from '~/core/utils/getValidationError';

import ProfileImage from './ProfileImage';

import { Container, Form, FormField, FormFieldLabel } from './styles';

const schema = Yup.object().shape({
  phoneNumber: Yup.string().required('Telefone obrigatório'),
});

interface ProfileForm {
  phoneNumber: string;
}

function Profile() {
  const safe = useSafeAreaInsets();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  const data = useSelector((data: RootState) => data.user.profile);

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    async (data: ProfileForm) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.put<ProfileType>('/profile', data);

        dispatch(updateProfile({ profile: response.data }));
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationError(err);

          formRef.current?.setErrors(errors);
        }
      } finally {
        Keyboard.dismiss();
        setLoading(false);
      }
    },
    [dispatch, loading],
  );

  return (
    <KeyboardAvoidingView
      style={{ flexGrow: 1, backgroundColor: '#f2f2f2' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          marginTop: safe.top,
        }}
      >
        <Container>
          <ProfileImage source={data.image?.url} />
          <Form ref={formRef} onSubmit={handleSubmit} initialData={data}>
            <FormField>
              <FormFieldLabel>Nome:</FormFieldLabel>
              <Input name="name" editable={false} />
            </FormField>
            <FormField>
              <FormFieldLabel>E-mail:</FormFieldLabel>
              <Input name="email" editable={false} />
            </FormField>
            <FormField>
              <FormFieldLabel>CPF:</FormFieldLabel>
              <Input
                name="cpf"
                editable={!data.cpf}
                maxLength={11}
                keyboardType="numeric"
              />
            </FormField>
            <FormField>
              <FormFieldLabel>Telefone:</FormFieldLabel>
              <Input name="phoneNumber" maxLength={11} keyboardType="numeric" />
            </FormField>
            <FormField>
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Salvar
              </Button>
            </FormField>

            <FormField>
              <Button
                variant="text"
                onPress={() => {
                  dispatch(signOut());
                }}
              >
                Sair
              </Button>
            </FormField>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default Profile;
