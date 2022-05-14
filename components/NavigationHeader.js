import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/Theme";
import { Auth } from "aws-amplify";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";

const NavigationHeader = (props) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  async function signOut() {
    try {
      await Auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  return (
    <View
      style={{
        backgroundColor: theme.background,
        paddingVertical: 5,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{ width: 30 }}
        onPress={() => navigation.goBack()}
      >
        <View
          style={{
            backgroundColor: "white",
            width: 30,
            height: 30,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            rounded
            size={20}
            source={require("../assets/OtherIcons/back.png")}
          />
        </View>
      </TouchableOpacity>
      <Text
        style={{ color: theme.primary, fontSize: 30, fontFamily: "LivvicBold" }}
      >
        anjoy
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Roadmap")}>
        <Image
          source={require("../assets/TabBarIcons/road.png")}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationHeader;
