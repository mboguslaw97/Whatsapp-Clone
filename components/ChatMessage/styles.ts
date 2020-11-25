import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  messageBox: {
    backgroundColor: "#e5e5e5",
    marginRight: 50,
    borderRadius: 5,
    padding: 10,
  },
  name: {
    color: Colors.light.tint,
    fontWeight: "bold",
  },
  message: {
    // marginBottom: 5,
  },
  time: {
    alignSelf: "flex-end",
  },
});

export default styles;
