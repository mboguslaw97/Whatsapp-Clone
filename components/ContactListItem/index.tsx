import { API, Auth, graphqlOperation } from 'aws-amplify';
import React from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';
import { User } from '../../types';
import styles from './styles';

export type ContactListItemProps = {
  user: User;
};

export default function ContactListItem(props: ContactListItemProps) {
  const { user } = props;
  const navigation = useNavigation();
  const onPress = async () => {
    try {
      // Create new chatroom
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, { input: {} })
      );

      if (!newChatRoomData) {
        console.log("Failed to create chat room");
        return;
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;

      // Add user to chatroom
      const test = await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: user.id,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      console.log(test);

      // Add auth user to chatroom
      const userInfo = await Auth.currentAuthenticatedUser();
      await API.graphql(
        graphqlOperation(createChatRoomUser, {
          input: {
            userID: userInfo.attributes.sub,
            chatRoomID: newChatRoom.id,
          },
        })
      );

      navigation.navigate("ChatRoom", {
        id: newChatRoom.id,
        name: "Hardcode Name",
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: user.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.status}>{user.status}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
