import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  useLayoutEffect,
  useMemo,
} from "react";
import { Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/Theme";
import { DataStore } from "@aws-amplify/datastore";
import { EmbeddedVideo } from "../src/models";
import YoutubeIframe from "react-native-youtube-iframe";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const HomeFeed = () => {
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
          marginBottom: 0,
          fontFamily: "LivvicSemiBold",
          color: theme.textColor,
          paddingLeft: 15,
          marginTop: -5,
          textDecorationLine: "underline",
          textAlign: "center",
        }}
      >
        Trending Videos
      </Text>
      <Videos />
    </>
  );
};

const Videos = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = (search) => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=relevance&q=coding&safeSearch=strict&topicId=%2Fm%2F01k8wb&type=video&videoCategoryId=27&videoDefinition=any&videoDuration=any&videoEmbeddable=true&videoLicense=any&key=AIzaSyAYGy_29NR46u9MSMmr9q5QW29AcwSKtQo`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data.items);
        setData(data.items);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={{ marginTop: 10, marginBottom: 15 }}>
      <>
        <FlatList
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingTop: 15,
            paddingBottom: 15,
            marginTop: 0,
          }}
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <VideoItem
              channelTitle={item.snippet.channelTitle}
              thumbnail={item.snippet.thumbnails.high.url}
              videoTitle={item.snippet.title}
              videoId={item.id.videoId}
            />
          )}
        />
      </>
    </View>
  );
};

const VideoItem = ({ videoTitle, thumbnail, channelTitle, videoId }) => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Video", { videoId, channelTitle, videoTitle })
      }
      style={{
        backgroundColor: theme.primaryLight,
        width:
          Dimensions.get("screen").width -
          0.08 * Dimensions.get("screen").width,
        marginVertical: 5,
        borderRadius: 15,
        paddingBottom: 10,
      }}
    >
      <Image
        source={{
          uri: thumbnail
            ? thumbnail
            : "http://placehold.jp/0/303030/ffffff/480x360.jpg?text=anjoy%0A",
        }}
        style={{
          width: "100%",
          height: 225,
          resizeMode: "cover",
          borderRadius: 10,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ marginLeft: 5 }}>
          <Text
            style={{
              fontFamily: "LivvicSemiBold",
              marginTop: 7,
              textAlign: "left",
              paddingHorizontal: 5,
              color: "black",
              flex: 1,
            }}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {videoTitle}
          </Text>
          <Text
            style={{
              fontFamily: "LivvicRegular",
              fontSize: 13,
              color: "gray",
              marginLeft: 5,
            }}
          >
            {channelTitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const VideoModal = ({ videoId, onClose }) => {
  const playerRef = useRef(null);
  const [completed, setCompleted] = useState(false);

  const onPlayerReady = useCallback(() => {
    getVideoProgress(videoId).then((data) => {
      if (data.timeStamp) {
        playerRef.current?.seekTo(data.timeStamp);
      }
    });
  }, [videoId]);

  useEffect(() => {
    const timer = setInterval(() => {
      playerRef.current?.getCurrentTime().then((data) => {
        saveVideoProgress({
          videoId,
          completed,
          timeStamp: data,
        });
      });
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [videoId, completed]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000dd",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <View style={{ backgroundColor: "white", padding: 16 }}>
        <Text
          onPress={onClose}
          style={{ textAlign: "right", marginBottom: 10 }}
        >
          <Ionicons name="close" color="black" size={30} />
        </Text>

        <View>
          <YoutubeIframe
            ref={playerRef}
            play={true}
            videoId={videoId}
            height={250}
            onReady={onPlayerReady}
            onChangeState={(state) => {
              if (state === "ended") {
                setCompleted(true);
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

const saveVideoProgress = ({ videoId, completed, timeStamp }) => {
  const data = {
    completed,
    timeStamp,
  };

  return AsyncStorage.setItem(videoId, JSON.stringify(data));
};

const getVideoProgress = async (videoId) => {
  const json = await AsyncStorage.getItem(videoId);
  if (json) {
    return JSON.parse(json);
  }
  return {
    completed: false,
    timeStamp: 0,
  };
};

const getProgress = async () => {
  const total = videoSeries.length;
  let completed = 0;
  for (let i = 0; i < total; i++) {
    const videoId = videoSeries[i];
    const status = await getVideoProgress(videoId);
    if (status?.completed) {
      completed += 1;
    }
  }

  return completed / total;
};

const styles = StyleSheet.create({
  componentContainer: {
    marginHorizontal: 10,
    borderRadius: 15,
    width: 200,
  },
  childComponentContainer: {
    width: "100%",
  },
  headingContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  componentDate: {
    fontFamily: "Rubik_300Light",
    marginTop: 5,
    textAlign: "center",
    color: "white",
  },
  helloText: {
    fontSize: 20,
    fontFamily: "Rubik_500Medium",
    width: "90%",
    textAlign: "left",
    marginBottom: 15,
  },
});

export default HomeFeed;
