import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/Theme";

const CourseFeed = () => {
  const theme = useContext(ThemeContext);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Text
        style={{
          fontSize: 18,
          marginBottom: 15,
          fontFamily: "LivvicSemiBold",
          marginLeft: 15,
          color: theme.textColor,
        }}
      >
        Trending Courses
      </Text>
      <HomeFeedComponent />
      <HomeFeedComponent />
      <HomeFeedComponent />
      <HomeFeedComponent />
    </ScrollView>
  );
};

const HomeFeedComponent = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Video")}
      style={{ width: "100%", alignItems: "center", marginBottom: 10 }}
    >
      <Image
        style={{
          width: "93.5%",
          height: 225,
          resizeMode: "cover",
          borderRadius: 15,
        }}
        source={{
          uri: "https://i.ytimg.com/vi/LwMutPnXnoA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8ZoL_DJZ4aPBgHh-t_7pr7gfZwQ",
        }}
      />
      <View
        style={{
          paddingVertical: 10,
          width: "93.5%",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Avatar source={require("../assets/avatar.png")} size={"small"} />
        <View>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "LivvicMedium",
              marginLeft: 10,
              flex: 1,
              color: theme.textColor,
            }}
          >
            How to create a platform like Youtube without coding???{" "}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "LivvicMedium",
              marginLeft: 10,
              color: "gray",
            }}
          >
            Tanish Garg · 40K Views · 12/07/2022
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseFeed;
