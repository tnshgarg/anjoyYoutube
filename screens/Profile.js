import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/Theme";
import NavigationHeader from "../components/NavigationHeader";
import { Avatar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { Channel } from "../src/models";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [authUser, setAuthUser] = React.useState(null);
  const [channelName, setChannelName] = React.useState("");
  const [channelDescription, setChannelDescription] = React.useState("");

  async function getUser() {
    const user = await Auth.currentAuthenticatedUser();
    setAuthUser(user);
  }

  const fetchChannelData = async () => {
    const models = await DataStore.query(Channel, (c) =>
      c.channelUrl("eq", "tanishg566@outlook.com")
    );
    console.log(models);
    setChannelName(models[0].channelName);
    setChannelDescription(models[0].channelDescription);
  };

  React.useEffect(() => {
    getUser();
    fetchChannelData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <NavigationHeader screenName="Your Profile" />
      <View>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Image
            source={require("../assets/profile.jpg")}
            style={{ width: 90, height: 90, borderRadius: 90 }}
          />
          <Text
            style={{
              marginTop: 10,
              fontSize: 15,
              fontFamily: "LivvicSemiBold",
            }}
          >
            Tanish garg
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 12,
              fontFamily: "LivvicMedium",
              color: "gray",
            }}
          >
            Coding, Dancing and Designing
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Edit Profile")}
            style={{ backgroundColor: "#303030", marginTop: 10 }}
          >
            <Text
              style={{
                fontSize: 15,
                fontFamily: "LivvicMedium",
                color: "white",
                paddingVertical: 6,
                paddingHorizontal: 30,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 50, width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "92%",
              backgroundColor: "white",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/OtherIcons/history.png")}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "LivvicMedium",
                marginLeft: 12,
              }}
            >
              Watch History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Privacy Policy")}
            style={{
              width: "92%",
              backgroundColor: "white",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/OtherIcons/lock.png")}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "LivvicMedium",
                marginLeft: 12,
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Terms and Condition")}
            style={{
              width: "92%",
              backgroundColor: "white",
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              style={{ width: 25, height: 25 }}
              source={require("../assets/OtherIcons/terms.png")}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "LivvicMedium",
                marginLeft: 12,
              }}
            >
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const StatsComponent = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          color: "white",
          fontFamily: "LivvicSemiBold",
          fontSize: 17,
        }}
      >
        {props.title}
      </Text>
      <Text style={{ color: "white", fontSize: 12 }}>{props.heading}</Text>
    </View>
  );
};

const VideoComponent = () => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 10,
        width: "100%",
        backgroundColor: "#191919",
        borderRadius: 15,
        paddingHorizontal: 5,
        marginBottom: 10,
      }}
      activeOpacity={0.5}
    >
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://i.ytimg.com/vi/LwMutPnXnoA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8ZoL_DJZ4aPBgHh-t_7pr7gfZwQ",
          }}
          style={{ width: 125, aspectRatio: 16 / 9, borderRadius: 8 }}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "white",
              fontSize: 13,
              fontFamily: "LivvicMedium",
              marginLeft: 10,
              numberOfLines: 2,
            }}
          >
            What is happenned to the Christianity and The IndoMuslim Community.
            We need answers!!!
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Profile;
