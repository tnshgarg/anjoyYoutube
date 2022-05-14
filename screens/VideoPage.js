import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  useLayoutEffect,
} from "react";
import YoutubeIframe from "react-native-youtube-iframe";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../context/Theme";

const VideoPage = () => {
  const theme = useContext(ThemeContext);
  const [videos, setVideos] = useState([]);
  const [modalVisible, showModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoArr, setVideoArr] = useState([]);
  const [finalArr, setFinalArr] = useState(["GCMb8p6OHQs"]);
  const [dataLoading, setDataLoading] = useState(false);
  const [loadingText, setLoadingText] = useState(
    <ActivityIndicator size={"large"} color={theme.primaryLight} />
  );

  const onVideoPress = useCallback((videoId) => {
    showModal(true);
    setSelectedVideo(videoId);
  }, []);
  const closeModal = useCallback(() => showModal(false), []);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    fetchVideos();
    setDataLoading(true);
    getProgress().then((p) => {
      setProgress(p);
    });
  }, []);

  return (
    <View style={{ marginTop: 10, marginBottom: 15 }}>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={closeModal}
      >
        <VideoModal videoId={selectedVideo} onClose={closeModal} />
      </Modal>
      {dataLoading ? (
        <Text>{loadingText}</Text>
      ) : (
        <>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              marginBottom: 5,
              fontFamily: "Rubik_400Regular",
            }}
          >
            Powered by Youtube
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={5}
            overScrollMode="never"
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 15 }}
            data={finalArr}
            renderItem={({ item, index }) => (
              <View key={index}>
                <VideoItem videoId={item} onPress={onVideoPress} />
              </View>
            )}
            keyExtractor={(item) => item}
          />
        </>
      )}
    </View>
  );
};

const VideoItem = ({ videoId, onPress }) => {
  const [videoMeta, setVideoMeta] = useState(null);
  useEffect(() => {
    getYoutubeMeta(videoId).then((data) => {
      setVideoMeta(data);
    });
  }, [videoId]);

  const theme = useContext(ThemeContext);

  if (videoMeta) {
    return (
      <TouchableOpacity
        onPress={() => onPress(videoId)}
        style={{
          backgroundColor: theme.primaryLight,
          width: "100%",
          marginVertical: 5,
          borderRadius: 15,
          paddingBottom: 10,
          marginRight: 10,
        }}
      >
        <Image
          source={{ uri: videoMeta.thumbnail_url }}
          style={styles.componentImage}
        />
        <View style={{ justifyContent: "center" }}>
          <Text
            style={styles.componentText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {videoMeta.title}
          </Text>
          <Text numberOfLines={1} style={styles.componentDate}>
            from {videoMeta.author_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return null;
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

export default VideoPage;

const styles = StyleSheet.create({
  componentContainer: {
    marginHorizontal: 10,
    borderRadius: 15,
    width: 200,
  },
  childComponentContainer: {
    width: "100%",
  },
  componentImage: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  headingContainer: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  componentText: {
    fontFamily: "Rubik_400Regular",
    marginTop: 7,
    textAlign: "center",
    paddingHorizontal: 5,
    color: "white",
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
