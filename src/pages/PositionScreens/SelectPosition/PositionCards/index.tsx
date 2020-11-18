import React from 'react';

import { View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {
  CurrentLocalization,
  CurrentLocalizationIcon,
  CurrentLocalizationTitle,
  CurrentLocalizationSubtitle,
} from './styles';

interface Props {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  active?: boolean;
}

function PositionCards({
  icon,
  title,
  subtitle,
  onPress,
  active = false,
}: Props) {
  return (
    <CurrentLocalization onPress={onPress} active={active}>
      <>
        <CurrentLocalizationIcon>
          <Feather name={icon} color="#8A8A8F" size={20} />
        </CurrentLocalizationIcon>
        <View>
          <CurrentLocalizationTitle>{title}</CurrentLocalizationTitle>
          <CurrentLocalizationSubtitle>{subtitle}</CurrentLocalizationSubtitle>
        </View>
      </>
    </CurrentLocalization>
  );
}

export default PositionCards;
