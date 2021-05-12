import React, { useState, useEffect } from 'react';
import { ImageBackground, View, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  Container,
  Content,
  ContentImages,
  HeaderTitle,
  HeaderDescription,
  ContentButton,
  ButtonSelect,
  ButtonSelectText,
} from './styles';
import Button from '~/components/Button';
import api from '~/core/services/api';
import createImageFormData from '~/core/utils/createFormData';
import {
  RootParamList,
  ServiceScreensNavigatorParamList,
} from '~/navigations/app.routes';

type ServiceBudgetImagesRouteProp = RouteProp<
  ServiceScreensNavigatorParamList,
  'ServiceBudgetImages'
>;

type ServiceBudgetImagesProp = {
  route: ServiceBudgetImagesRouteProp;
  navigation: CompositeNavigationProp<
    StackNavigationProp<RootParamList, 'ServiceScreens'>,
    StackNavigationProp<RootParamList>
  >;
};

function ServiceBudgetImages({ navigation, route }: ServiceBudgetImagesProp) {
  const [images, setImage] = useState<string[]>([]);

  useEffect(() => {
    async function requestPermission() {
      const {
        status: statusMediaLibrary,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const {
        status: statusCamera,
      } = await ImagePicker.requestCameraPermissionsAsync();
      if (statusMediaLibrary !== 'granted' || statusCamera !== 'granted') {
        Alert.alert(
          'Precisamos da permissão da câmera e biblioteca para fazer isso funcionar!',
        );
      }
    }

    requestPermission();
  }, []);

  async function takeImage() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage((prevState) => [...prevState, (result as ImageInfo).uri]);
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage((prevState) => [...prevState, (result as ImageInfo).uri]);
    }
  }

  function removeImage(id: string) {
    setImage((prevImage) => prevImage.filter((image) => image !== id));
  }

  async function handleSubmit() {
    const data = createImageFormData(images);
    const { requestId } = route.params;

    await api.post(`/request/service/${requestId}/upload`, data);

    navigation.replace('Main', {
      screen: 'Home',
    });
  }

  return (
    <Container>
      <HeaderTitle>Você pode enviar fotos até 4 fotos</HeaderTitle>
      <HeaderDescription>
        Com essas fotos, o nosso parceiro pode entender melhor o problema. Para
        obter o melhor resultado, utilize o celular em modo retrato.
      </HeaderDescription>

      <Content>
        <ContentButton>
          <ButtonSelect onPress={pickImage} disabled={images.length > 3}>
            <Feather
              name="upload-cloud"
              size={32}
              style={{ marginTop: 8, marginBottom: 8 }}
              color="#242424"
            />
            <ButtonSelectText>Selecionar da Biblioteca</ButtonSelectText>
          </ButtonSelect>
          <ButtonSelect onPress={takeImage} disabled={images.length > 3}>
            <Feather
              name="camera"
              size={32}
              style={{ marginTop: 8, marginBottom: 8 }}
              color="#242424"
            />
            <ButtonSelectText>Tirar fotos</ButtonSelectText>
          </ButtonSelect>
        </ContentButton>

        <ContentImages>
          <ScrollView horizontal>
            {images.map((image) => (
              <TouchableOpacity key={image} onPress={() => removeImage(image)}>
                <ImageBackground
                  source={{ uri: image }}
                  style={{
                    width: 240,
                    height: 135,
                  }}
                  imageStyle={{
                    resizeMode: 'center',
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.15)',
                    }}
                  >
                    <Feather name="x" color="#ffffff" size={48} />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ContentImages>
      </Content>

      <View
        style={{
          marginTop: 'auto',
          alignSelf: 'center',
          width: '70%',
        }}
      >
        <Button onPress={handleSubmit}>Solicitar orçamento</Button>
      </View>
    </Container>
  );
}

export default ServiceBudgetImages;
