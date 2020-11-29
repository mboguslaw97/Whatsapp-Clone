import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, KeyboardAvoidingView, Text } from 'react-native';

import { useRoute } from '@react-navigation/native';

import BG from '../assets/images/BG.png';
import ChatMessage from '../components/ChatMessage';
import InputBox from '../components/InputBox';
import { messagesByChatRoom } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

const ChatRoomScreen = () => {
	const [myUserID, setMyUserID] = useState(null);
	const [messages, setMessages] = useState([]);

	const route = useRoute();

	useEffect(() => {
		const fetchUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			setMyUserID(userInfo.attributes.sub);
		};
		fetchUser();

		const subscription = API.graphql(
			graphqlOperation(onCreateMessage)
		).subscribe({
			next: (data) => {
				const newMessage = data.value.data.onCreateMessage;
				if (newMessage.chatRoomID !== route.params.id) return;
				setMessages([newMessage, ...messages]);
			},
		});
	}, []);

	useEffect(() => {
		const fetchMessages = async () => {
			const messagesData = await API.graphql(
				graphqlOperation(messagesByChatRoom, {
					chatRoomID: route.params.id,
					sortDirection: "ASC",
				})
			);
			setMessages(messagesData.data.messagesByChatRoom.items);
		};
		fetchMessages();
	}, []);

	return (
		<ImageBackground style={{ width: "100%", height: "100%" }} source={BG}>
			<FlatList
				data={messages}
				renderItem={({ item }) => (
					<ChatMessage myUserID={myUserID} message={item} />
				)}
			/>
			<KeyboardAvoidingView behavior="position">
				<InputBox chatRoomID={route.params.id} />
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

export default ChatRoomScreen;
