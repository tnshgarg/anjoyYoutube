import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import { Avatar, ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { ThemeContext } from "../context/Theme";

const Notification = () => {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: theme.background }}
      >
        <NotificationComponent />
        <NotificationComponent />
        <NotificationComponent />
        <NotificationComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const NotificationComponent = () => {
  const theme = useContext(ThemeContext);

  return (
    <View>
      <ListItem containerStyle={{ backgroundColor: theme.background }}>
        <Avatar source={require("../assets/avatar.png")} size={45} />
        <ListItem.Content>
          <ListItem.Title
            numberOfLines={2}
            style={{
              fontFamily: "LivvicMedium",
              fontSize: 15,
              color: theme.textColor,
            }}
          >
            Hello guys welcome to my stream and you guys will learn about many
            things fjdslkfjldskjfkldsjfk fsdj fdslkfj dslkfj dslkfj
          </ListItem.Title>
          <ListItem.Subtitle
            style={{
              ",
              fontSize: 12,
              paddingTop: 5,
              color: "lightgray",
            }}
          >
            Tanish Garg
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

export default Notification;
