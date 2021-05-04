import React, { useRef } from 'react';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';

import {
  RootParamList,
  ServiceScreensNavigatorParamList,
} from '~/navigations/app.routes';
import Input from '~/components/Input';
import Button from '~/components/Button';
import getValidationError from '~/core/utils/getValidationError';

import { Container, HeaderTitle, HeaderDescription, Body } from './styles';
import api from '~/core/services/api';
import { useSelector } from 'react-redux';
import { RootState } from '~/core/store/modules/rootReducer';
import { Alert } from 'react-native';

type ServiceBudgetRouteProp = RouteProp<
  ServiceScreensNavigatorParamList,
  'ServiceBudget'
>;

type ServiceBudgetProps = {
  route: ServiceBudgetRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootParamList, 'ServiceScreens'>,
    StackNavigationProp<RootParamList>
  >;
};

type ServiceBudgetForm = {
  description: string;
};

const schema = Yup.object().shape({
  description: Yup.string()
    .min(100, 'A descrição deve conter no minimo ${min} caracteres.')
    .required('Descrição é obrigatória.'),
});

function ServiceBudget({ route, navigation }: ServiceBudgetProps) {
  const { profile, service } = route.params;
  const formRef = useRef<FormHandles>(null);

  const currentAddress = useSelector(
    (state: RootState) => state.user.profile.address,
  );

  async function handleSignIn(data: ServiceBudgetForm) {
    try {
      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.post<{ id: number }>('/request/service', {
        professional: profile.id,
        serviceType: service.id,
        description: data.description,
        address: currentAddress,
      });

      navigation.push('ServiceScreens', {
        screen: 'ServiceBudgetImages',
        params: {
          requestId: response.data.id,
        },
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationError(err);

        formRef.current?.setErrors(errors);
      }
      Alert.alert(
        'Houve um problema ao solicitar ao processar sua solicitação.',
      );
    }
  }

  return (
    <Container>
      <HeaderTitle>Qual tipo de serviço você precisa?</HeaderTitle>
      <HeaderDescription>
        Descreva o que você precisa resolver, preencha com máximo de detalhes
        para que possa ser mensurado o trabalho.
      </HeaderDescription>

      <Body>
        <Form ref={formRef} onSubmit={handleSignIn}>
          <Input
            name="description"
            placeholder={`Descrição do problema para ${profile.name}`}
            multiline
            containerStyle={{
              minHeight: 180,
            }}
            textAlignVertical={'top'}
            maxLength={2000}
            wordCount
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
        </Form>
      </Body>

      <Button
        onPress={() => {
          formRef.current?.submitForm();
        }}
      >
        Avançar para próxima etapa
      </Button>
    </Container>
  );
}

export default ServiceBudget;
