import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 60,
        height: 60,
        marginRight: 15,
        width: 60
    },
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        width: "100%"
    },
    lastMessage: {
        color: "grey",
        fontSize: 16
    },
    leftContainer: {
        flexDirection: "row"
    },
    midContainer: {
        justifyContent: "space-around"
    },
    time: {
        color: "grey",
        fontSize: 14
    },
    username: {
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default styles;