import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image } from 'react-native';

import { StackNavigatorParamList } from '../../routes/app.routes';

import Input from '../../components/Input';
import BackgroundLocalizationFirstStep from '../../assets/images/background-localization-first-step.png';

import { Container, Header, HeaderBackButton } from './styles';
import { Form } from '@unform/mobile';

type Props = StackScreenProps<StackNavigatorParamList, 'SetLocalization'>;

function SetLocalization({ navigation }: Props) {
  return (
    <Container>
      <Header>
        <Image
          style={{ width: 375, height: 248 }}
          source={BackgroundLocalizationFirstStep}
        />
        <HeaderBackButton onPress={() => navigation.goBack()} />
      </Header>
      <Form onSubmit={() => ({})}>
        <Input
          containerStyle={{ backgroundColor: '#E8E8E8' }}
          name="search"
          placeholder="Usuário"
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="username"
          textContentType="username"
          returnKeyType="next"
        />
      </Form>
    </Container>
  );
}

export default SetLocalization;
