import React from 'react';

import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  CurrentLocalization,
  CurrentLocalizationIcon,
  CurrentLocalizationTitle,
  CurrentLocalizationSubtitle,
} from './styles';

interface Props {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  onPress?: () => void;
  active?: boolean;
  disabled?: boolean;
}

function PositionCards({
  icon,
  title,
  subtitle,
  onPress,
  active = false,
  disabled = false,
}: Props) {
  return (
    <CurrentLocalization onPress={onPress} active={active} disabled={disabled}>
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
