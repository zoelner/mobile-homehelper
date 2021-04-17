import * as React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

storiesOf('Profile', module)
  .addDecorator((story) => <View>{story()}</View>)
  .add('default', () => <View />);
