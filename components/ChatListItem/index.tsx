import { Auth } from 'aws-amplify';
import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ChatRoom } from '../../types';
import styles from './styles';

export type ChatListItemProps = {
  chatRoom: ChatRoom;
};

export default function ChatListItem(props: ChatListItemProps) {
  const { chatRoom } = props;
  const [otherUser, setOtherUser] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser();
      if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
        setOtherUser(chatRoom.chatRoomUsers.items[1].user);
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user);
      }
    };
    getOtherUser();
  }, []);

  if (!otherUser) return null;

  const onPress = () => {
    navigation.navigate("ChatRoom", {
      id: chatRoom.id,
      name: otherUser.name,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            <Text style={styles.lastMessage}>
              {chatRoom.lastMessage ? chatRoom.lastMessage.content : ""}
            </Text>
          </View>
        </View>
        <Text style={styles.lastMessage}>
          {chatRoom.lastMessage &&
            moment(chatRoom.lastMessage.createdAt).format("MM/DD/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
