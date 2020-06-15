import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, Text } from 'react-native';

interface HeaderRightProps {
  text: string;
  screen?: string;
  tintColor?: string;
  onPress?: Function;
}

function HeaderRight({
  text,
  screen,
  tintColor,
  onPress,
}: HeaderRightProps): React.ReactElement {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        screen && navigation.navigate(screen);
        onPress && onPress();
      }}
    >
      <Text style={{ marginRight: 16, color: tintColor }}>{text}</Text>
    </TouchableWithoutFeedback>
  );
}

export default HeaderRight;
