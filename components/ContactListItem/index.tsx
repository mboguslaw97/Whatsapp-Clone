import moment, { Moment } from 'moment';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { User } from '../../types';
import styles from './styles';

export type ContactListItemProps = {
  user: User;
};

export default function ContactListItem(props: ContactListItemProps) {
  const { user } = props;
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("ChatRoom", {
      // Test
    });
  };
  console.log(user);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageURI }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
