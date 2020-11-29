import moment from 'moment';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Message } from '../../types';
import styles from './styles';

export type ChatMessageProps = {
	message: Message;
};

const ChatMessage = (props: ChatMessageProps) => {
	const { message, myUserID } = props;
	const isMyMessage = () => message.user.id === myUserID;

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.messageBox,
					{
						backgroundColor: isMyMessage() ? "#dcf8c5" : "white",
						marginRight: isMyMessage() ? 0 : 50,
						marginLeft: isMyMessage() ? 50 : 0,
					},
				]}
			>
				{!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
				<Text style={styles.message}>{message.content}</Text>
				<Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
			</View>
		</View>
	);
};

export default ChatMessage;
