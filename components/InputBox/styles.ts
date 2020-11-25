import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: Colors.light.tint,
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },
  icon: {
    marginHorizontal: 5,
  },
  mainContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    flex: 1,
    flexDirection: "row",
    marginRight: 10,
    padding: 10,
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default styles;
