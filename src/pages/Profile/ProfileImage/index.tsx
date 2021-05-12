import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import ProfileBlank from '~/assets/images/profile.png';

import { Container, Image } from './styles';
import { Platform } from 'react-native';
import api from '~/core/services/api';
import { useDispatch } from 'react-redux';
import { updateProfile } from '~/core/store/modules/user/actions';
import createImageFormData from '~/core/utils/createFormData';

interface ProfileImageProps {
  source?: string;
}

function ProfileImage({ source }: ProfileImageProps) {
  const [image, setImage] = useState<string | undefined>(source);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const formData = createImageFormData(result.uri);

      const response = await api.post('/profile/upload', formData);

      setImage(response.data.url);
      dispatch(updateProfile({ profile: { image: response.data } }));
    }
  };

  return (
    <Container onPress={pickImage}>
      {image ? (
        <Image source={{ uri: image }} />
      ) : (
        <Image source={ProfileBlank} />
      )}
    </Container>
  );
}

export default ProfileImage;
