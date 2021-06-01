import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Text, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { RootParamList } from '~/navigations/app.routes';
import { BudgetsScreensNavigatorParamList } from '~/navigations/app.routes/bugets.routes';
import { ServiceBudgetType } from '~/@types/ServiceBudget';
import ProfileBlank from '~/assets/images/profile.png';
import api from '~/core/services/api';
import { parseProfileAddress } from '~/core/utils/parsers';

import {
  Container,
  ImageBudget,
  Title,
  LabelWrapper,
  Label,
  FooterBudgetDescription,
  Button,
  ProfessionalImage,
  Header,
} from './styles';
import { animatedStyles, scrollInterpolator } from './utils';
import MapView, { Marker } from 'react-native-maps';

type BudgetDescriptionRoute = RouteProp<
  BudgetsScreensNavigatorParamList,
  'BudgetDescription'
>;

type BudgetDescriptionNavigation = CompositeNavigationProp<
  StackNavigationProp<BudgetsScreensNavigatorParamList, 'BudgetDescription'>,
  StackNavigationProp<RootParamList>
>;

type BudgetDescription = {
  route: BudgetDescriptionRoute;
  navigation: BudgetDescriptionNavigation;
};

function BudgetDescription({ route, navigation }: BudgetDescription) {
  const [
    budgetDescription,
    setBudgetDescription,
  ] = useState<ServiceBudgetType | null>(null);

  const loadBudgetDescription = useCallback(async () => {
    const response = await api.get<ServiceBudgetType>(
      `/service/${route.params.id}`,
    );

    setBudgetDescription(response.data);
  }, [route.params.id]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadBudgetDescription);

    return unsubscribe;
  }, [loadBudgetDescription]);

  async function handleReject() {
    try {
      await api.post(`/service/${route.params.id}/reject`, {});
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ooops', 'Não conseguimos processar a sua solicitação');
    }
  }

  async function handleAccept() {
    try {
      await api.post(`/service/${route.params.id}/approve`);
    } catch (error) {
      Alert.alert('Ooops', 'Não conseguimos processar a sua solicitação');
    } finally {
      loadBudgetDescription();
    }
  }

  return (
    <SafeAreaView
      edges={['right', 'left']}
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
    >
      <Container>
        {budgetDescription?.status === 'WAITING_FOR_APROVAL' && (
          <FooterBudgetDescription>
            <Button onPress={handleAccept}>
              <Feather name="check-circle" color="#12A454" size={20} />
              <Text>Aceitar</Text>
            </Button>
            <Button style={{ marginLeft: 16 }} onPress={handleReject}>
              <Feather name="x-circle" color="#E83F5B" size={20} />
              <Text>Reprovar</Text>
            </Button>
          </FooterBudgetDescription>
        )}
        <Header>
          <ProfessionalImage
            source={
              budgetDescription?.professional?.image?.url
                ? { uri: budgetDescription.professional.image.url }
                : ProfileBlank
            }
          />

          <Label>{budgetDescription?.professional.name}</Label>
          {budgetDescription?.status === 'APPROVED' && (
            <>
              <LabelWrapper>
                <Feather
                  name="mail"
                  size={14}
                  color="#8a8a8f"
                  style={{ marginRight: 6 }}
                />
                <Label>{budgetDescription?.professional.email}</Label>
              </LabelWrapper>
              <LabelWrapper>
                <Feather
                  name="phone"
                  size={14}
                  color="#8a8a8f"
                  style={{ marginRight: 6 }}
                />
                <Label>{budgetDescription?.professional.phoneNumber}</Label>
              </LabelWrapper>
            </>
          )}
        </Header>
        {budgetDescription?.status === 'WAITING_FOR_APROVAL' && (
          <>
            <Title style={{ marginTop: 0 }}>Replica do Profissional</Title>
            <LabelWrapper>
              <Text>Valor do serviço: </Text>
              <Label>
                R$ {budgetDescription?.price?.toFixed(2).replace('.', ',')}
              </Label>
            </LabelWrapper>
            <Text>Descrição: </Text>
            <Label style={{ marginBottom: 16 }}>
              {budgetDescription?.professionalDescription}
            </Label>
          </>
        )}

        <Title>Descrição do orçamento</Title>
        <Label>{budgetDescription?.description}</Label>

        {budgetDescription?.images && (
          <>
            <Title>Imagens</Title>
            <Carousel<ImageContent>
              renderItem={({ item }: { item: ImageContent }) => (
                <ImageBudget source={{ uri: item.url }} />
              )}
              sliderWidth={Dimensions.get('screen').width - 32}
              itemWidth={Dimensions.get('screen').width - 64}
              data={budgetDescription.images}
              scrollInterpolator={scrollInterpolator}
              slideInterpolatedStyle={animatedStyles}
              useScrollView={true}
            />
          </>
        )}

        <Title>Endereço</Title>
        <Text>{parseProfileAddress(budgetDescription?.address)}</Text>

        {budgetDescription?.address && (
          <MapView
            style={{
              marginTop: 16,
              width: Dimensions.get('window').width,
              height: 300,
            }}
            region={{
              latitude: budgetDescription.address.latitude,
              longitude: budgetDescription.address.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }}
          >
            <Marker coordinate={budgetDescription.address} />
          </MapView>
        )}
      </Container>
    </SafeAreaView>
  );
}

export default BudgetDescription;
