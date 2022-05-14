import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/Theme";
import { DataStore } from "@aws-amplify/datastore";
import { Video } from "../src/models";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { Ionicons } from "@expo/vector-icons";
import CategoryHeader from "../components/CategoryHeader";

const CategoryPage = ({ route }) => {
  const [videos, setVideos] = useState(null);
  const params = route.params;
  const fetchData = async () => {
    const models = await DataStore.query(Video, (c) =>
      c.videoCategory("eq", params.subject)
    );
    setVideos(models);
  };
  const theme = useContext(ThemeContext);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <CategoryHeader subject={params.subject} />
      <FlatList
        data={videos}
        contentContainerStyle={{ paddingBottom: 100, paddingTop: 15 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <HomeFeedComponent
            posterUrl={item.posterUrl}
            videoTitle={item.videoTitle}
            channelName={item.channelName}
            views={item.views}
            likes={item.likes}
            videoUrl={item.videoUrl}
            videoCategory={item.videoCategory}
            notesUrl={item.notesUrl}
            assignmentUrl={item.assignmentUrl}
            shareUrl={item.shareUrl}
            channelUrl={item.channelUrl}
            videoDescription={item.videoDescription}
            timestamp={item.timestamp}
            id={item.id}
          />
        )}
      />
    </SafeAreaView>
  );
};

const HomeFeedComponent = (props) => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate("Video", {
          posterUrl: props.posterUrl,
          videoTitle: props.videoTitle,
          channelName: props.channelName,
          views: props.views,
          likes: props.likes,
          videoUrl: props.videoUrl,
          videoCategory: props.videoCategory,
          notesUrl: props.notesUrl,
          assignmentUrl: props.assignmentUrl,
          shareUrl: props.shareUrl,
          channelUrl: props.channelUrl,
          videoDescription: props.videoDescription,
          timestamp: props.timestamp,
          id: props.id,
        })
      }
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
          uri: props.posterUrl,
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
            {props.videoTitle}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "LivvicMedium",
              marginLeft: 10,
              color: "gray",
            }}
          >
            {props.channelName} · {props.views} Views · 12/07/2022
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryPage;
