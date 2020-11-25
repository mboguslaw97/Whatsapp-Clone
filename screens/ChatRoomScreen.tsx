import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';

export default function ChatRoomScreen() {
    const route = useRoute();
    return (
        <Text>Chat Room</Text>
    );
};