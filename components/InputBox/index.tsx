import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
    TextInput, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native-gesture-handler';

import {
    Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons
} from '@expo/vector-icons';

import { createMessage, updateChatRoom } from '../../graphql/mutations';
import styles from './styles';

const InputBox = (props) => {
	const { chatRoomID } = props;
	const [message, setMessage] = useState("");
	const [myUserID, setMyUserID] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const userInfo = await Auth.currentAuthenticatedUser();
			setMyUserID(userInfo.attributes.sub);
		};
		fetchUser();
	}, []);

	const onMicrophonePress = () => {
		console.warn("Microphone");
	};

	const onSendPress = async () => {
		try {
			const newMessageData = await API.graphql(
				graphqlOperation(createMessage, {
					input: {
						content: message,
						userID: myUserID,
						chatRoomID: chatRoomID,
					},
				})
			);
			await API.graphql(
				graphqlOperation(updateChatRoom, {
					input: {
						id: chatRoomID,
						lastMessageID: newMessageData.data.createMessage.id,
					},
				})
			);
		} catch (error) {
			console.log(error);
		}
		setMessage("");
	};

	const onPress = () => {
		if (!message) {
			onMicrophonePress();
		} else {
			onSendPress();
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.mainContainer}>
				<FontAwesome5 name="laugh-beam" size={24} color="grey" />
				<TextInput
					placeholder="Type a message"
					style={styles.textInput}
					value={message}
					onChangeText={setMessage}
					multiline
				/>
				<Entypo name="attachment" size={24} color="grey" style={styles.icon} />
				{!message && (
					<Fontisto name="camera" size={24} color="grey" style={styles.icon} />
				)}
			</View>
			<TouchableOpacity onPress={onPress}>
				<View style={styles.buttonContainer}>
					{!message ? (
						<MaterialCommunityIcons name="microphone" size={24} color="white" />
					) : (
						<MaterialIcons name="send" size={24} color="white" />
					)}
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default InputBox;
