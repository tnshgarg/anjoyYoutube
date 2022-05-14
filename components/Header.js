import { Image, TouchableOpacity, View, Text } from "react-native";
import React, { useContext } from "react";
import { Avatar, Input } from "react-native-elements";
import { ThemeContext } from "../context/Theme";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  return (
    <>
      <View
        style={{
          backgroundColor: theme.background,
          paddingVertical: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          onPress={() => navigation.navigate("Profile")}
          rounded
          size={"small"}
          source={require("../assets/avatar.png")}
        />
        <TouchableOpacity
          style={{ width: 80, height: 20, alignItems: "flex-end" }}
          onPress={() => navigation.navigate("Roadmap")}
        >
          <Image
            source={require("../assets/TabBarIcons/road.png")}
            style={{ resizeMode: "contain", width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 60,
            fontFamily: "LivvicBold",
            color: theme.primary,
          }}
        >
          anjoy
        </Text>
      </View>
      <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
        <View
          style={{
            backgroundColor: "white",
            width: "95%",
            borderRadius: 11,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            height: 60,
          }}
        >
          <Image
            source={require("../assets/OtherIcons/logo.png")}
            style={{ width: 26.21, height: 20, resizeMode: "cover" }}
          />
          <View style={{ flexWrap: "wrap", flexGrow: 1 }}>
            <Input
              style={{ flex: 1 }}
              inputStyle={{ fontSize: 14, fontFamily: "LivvicMedium" }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                marginTop: 9,
              }}
              selectionColor={theme.primary}
              keyboardAppearance="light"
              placeholder="Search for coding, dance, music..."
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchPage")}
            style={{
              backgroundColor: theme.background,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Image
              source={require("../assets/OtherIcons/arrowRight.png")}
              style={{ width: 25, height: 25 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Header;
