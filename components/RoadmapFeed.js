import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/Theme";
import { DataStore } from "@aws-amplify/datastore";
import { Video } from "../src/models";

const RoadmapFeed = () => {
  const [videos, setVideos] = useState(null);
  const [videosLoading, setVideosLoading] = useState(false);

  const fetchData = async () => {
    const models = await DataStore.query(Video);
    setVideos(models);
  };
  const theme = useContext(ThemeContext);

  useMemo(() => {
    setVideosLoading(true);
    fetchData();
    setVideosLoading(false);
  }, [videos]);

  return (
    <>
      <Text
        style={{
          fontSize: 18,
          marginBottom: 15,
          fontFamily: "LivvicSemiBold",
          color: theme.textColor,
          paddingLeft: 15,
          marginTop: 0,
          textDecorationLine: "underline",
        }}
      >
        Top Roadmaps
      </Text>
      {videosLoading ? (
        <ActivityIndicator size={"large"} color={theme.primary} />
      ) : (
        <FlatList
          data={videos}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RoadmapFeedComponent
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
      )}
    </>
  );
};

const RoadmapFeedComponent = (props) => {
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

export default RoadmapFeed;
