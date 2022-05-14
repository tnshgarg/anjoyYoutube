import { Image, TouchableOpacity, View, Text } from "react-native";
import React, { useContext } from "react";
import { Avatar, Input } from "react-native-elements";
import { ThemeContext } from "../context/Theme";
import { useNavigation } from "@react-navigation/native";

const RoadmapHeader = () => {
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
        <TouchableOpacity
          style={{ width: 100 }}
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
        <TouchableOpacity onPress={() => navigation.navigate("Search")}>
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
          Roadmaps
        </Text>
      </View>
    </>
  );
};

export default RoadmapHeader;
