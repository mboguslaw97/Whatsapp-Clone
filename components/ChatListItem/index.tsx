import React from 'react';
import { Image, Text, View } from 'react-native';
import { ChatRoom } from '../../types';
import styles from './styles';
import moment, { Moment } from 'moment';

export type ChatListItemProps = {
    chatRoom: ChatRoom,
}

export default function ChatListItem(props: ChatListItemProps) {
    const { chatRoom } = props;
    const user = chatRoom.users[1];
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
                </View>
            </View>

            <Text style={styles.lastMessage}>{moment(chatRoom.lastMessage.createdAt).format('MM/DD/YYYY')}</Text>
        </View>
    );
};