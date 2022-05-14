import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  FlatList,
  Share,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import React, {
  useCallback,
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/Theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import YoutubeIframe from "react-native-youtube-iframe";
import { getYoutubeMeta } from "react-native-youtube-iframe";
import { Avatar, Button, Input } from "react-native-elements";
import RBSheet from "react-native-raw-bottom-sheet";

const VideoScreen = ({ route }) => {
  const refRBSheet = React.useRef();
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const params = route.params;
  const [data, setData] = useState("");
  const [videoMeta, setVideoMeta] = useState(null);
  const sheetRef = useRef(null);
  const height = Dimensions.get("window").height;

  const playerRef = useRef(null);
  const [completed, setCompleted] = useState(false);

  const onPlayerReady = useCallback(() => {
    getVideoProgress(params.videoId).then((data) => {
      if (data.timeStamp) {
        playerRef.current?.seekTo(data.timeStamp);
      }
    });
  }, [params.videoId]);

  const getMeta = async (videoId) => {
    await getYoutubeMeta(videoId).then((data) => {
      setVideoMeta(data);
      console.log(data);
    });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Watch this amazing video by ${params.videoMeta.author_name}. You will learn a lot of new things. https://www.youtube.com/watch?v=${params.videoId}`,
        url: `https://www.youtube.com/watch?v=${params.video}`,
      });
      console.log(result);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      playerRef.current?.getCurrentTime().then((data) => {
        saveVideoProgress({
          videoId: params.videoId,
          completed,
          timeStamp: data,
        });
      });
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    getMeta(params.videoId);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
      >
        <TouchableOpacity
          style={{
            width: 30,
          }}
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
        <View>
          <Text
            style={{
              fontFamily: "LivvicSemiBold",
              fontSize: 15,
              color: "black",
            }}
          >
            {params.channelTitle}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.background,
            width: 30,
            height: 30,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: "center",
          height: 260,
          marginTop: 10,
        }}
      >
        <YoutubeIframe
          ref={playerRef}
          play={true}
          width={Dimensions.get("window").width}
          videoId={params.videoId}
          height={Dimensions.get("window").width / 1.769}
          onReady={onPlayerReady}
          onChangeState={(state) => {
            if (state === "ended") {
              setCompleted(true);
            }
          }}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 15,
            fontFamily: "LivvicSemiBold",
            color: "black",
            paddingHorizontal: 15,
            marginTop: 10,
          }}
          numberOfLines={2}
        >
          {params.videoTitle}
        </Text>
      </View>
      <View
        style={{
          borderBottomColor: "gray",
          borderBottomWidth: 0.2,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginVertical: 10,
          }}
        >
          <TouchableOpacity style={{ alignItems: "center" }} onPress={onShare}>
            <Image
              style={{ width: 22, height: 22, resizeMode: "contain" }}
              source={require("../assets/OtherIcons/shareVideo.png")}
            />
            <Text
              style={{
                fontSize: 13,
                color: "black",
                marginTop: 3,
                fontFamily: "LivvicMedium",
              }}
            >
              Share
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(data.notesUrl)}
            style={{ alignItems: "center" }}
          >
            <Image
              style={{ width: 22, height: 22, resizeMode: "contain" }}
              source={require("../assets/OtherIcons/downloadNotes.png")}
            />
            <Text
              style={{
                fontSize: 13,
                color: "black",
                marginTop: 3,
                fontFamily: "LivvicMedium",
              }}
            >
              Get Notes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={{ alignItems: "center" }}
          >
            <Image
              style={{ width: 22, height: 22, resizeMode: "contain" }}
              source={require("../assets/OtherIcons/makeNotes.png")}
            />
            <Text
              style={{
                fontSize: 13,
                color: "black",
                marginTop: 3,
                fontFamily: "LivvicMedium",
              }}
            >
              Take Notes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
            marginHorizontal: 15,
            justifyContent: "center",
          }}
        >
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            animationType="slide"
            openDuration={500}
            height={height - 0.39 * height}
            customStyles={{
              wrapper: {
                backgroundColor: "transparent",
              },
              draggableIcon: {
                backgroundColor: "#000",
              },
            }}
          >
            <Input
              multiline
              placeholder="Start Typing"
              scrollEnabled
              textAlign="left"
              numberOfLines={100}
              inputStyle={{
                fontFamily: "LivvicMedium",
                textAlignVertical: "top",
              }}
              inputContainerStyle={{
                borderBottomWidth: 0,
                height: "92%",
                marginTop: 10,
              }}
              selectionColor={theme.primary}
              textAlignVertical="top"
              collapsable
              placeholderTextColor={"black"}
            />
          </RBSheet>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
          }}
        ></View>
        <View>
          <FlatList
            data={data.comments}
            renderItem={({ item, index }) => <CommentComponent title={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CommentComponent = (props) => {
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        marginRight: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "90%",
        }}
      >
        <Image
          source={require("../assets/avatar.png")}
          style={{ width: 30, height: 30, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontSize: 12,
            color: "white",
            fontFamily: "LivvicMedium",
            flex: 1,
            marginLeft: 10,
          }}
        >
          {props.title}
        </Text>
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

export default VideoScreen;

{
  /* <Video
        ref={video}
        style={{
          alignSelf: "center",
          width: "100%",
          height: 250,
        }}
        source={{
          uri: data.videoUrl,
        }}
        resizeMode="contain"
        useNativeControls
        shouldPlay={true}
        isLooping
        accessibilityHint="Click the play button to play the video"
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      /> */
}

{
  /* <Input
            placeholderTextColor={"lightgray"}
            placeholder="Enter your comment"
            inputStyle={{
              fontSize: 14,
              fontFamily: "LivvicMedium",
              color: "white",
            }}
            multiline
            keyboardType="default"
            value={comment}
            onChangeText={setComment}
            keyboardAppearance="dark"
            containerStyle={{ flex: 1, marginRight: 10 }}
            rightIcon={() => (
              <TouchableOpacity onPress={doComment}>
                <Ionicons name="send" color={theme.primary} size={20} />
              </TouchableOpacity>
            )}
            leftIcon={() => (
              <Image
                style={{
                  width: 16,
                  height: 16,
                  resizeMode: "contain",
                  marginRight: 10,
                }}
                source={require("../assets/OtherIcons/comment.png")}
              />
            )}
          /> */
}
{
  /* <TouchableOpacity onPress={doComment} style={{ paddingLeft: 8 }}>
            <Ionicons name="ios-send" color={theme.primary} size={25} />
          </TouchableOpacity> */
}

{
  /* <TouchableOpacity style={{ alignItems: "center" }}>
            <Image
              style={{ width: 22, height: 22, resizeMode: "contain" }}
              source={require("../assets/OtherIcons/views.png")}
            />
            <Text
              style={{
                fontSize: 13,
                color: "white",
                marginTop: 3,
              }}
            >
              {videoMeta.title}
            </Text>
          </TouchableOpacity> */
}
{
  /* <TouchableOpacity onPress={doLike} style={{ alignItems: "center" }}>
            {liked ? (
              <Image
                style={{ width: 22, height: 22, resizeMode: "contain" }}
                source={require("../assets/OtherIcons/likeRed.png")}
              />
            ) : (
              <Image
                style={{ width: 22, height: 22, resizeMode: "contain" }}
                source={require("../assets/OtherIcons/like.png")}
              />
            )}
            <Text
              style={{
                fontSize: 13,
                color: "white",
                marginTop: 3,
              }}
            >
              fsd
            </Text>
          </TouchableOpacity> */
}

// useLayoutEffect(() => {
//   countView();
// }, []);

// const doComment = async () => {
//   const original = await DataStore.query(VideoModel, params.id);
//   await DataStore.save(
//     VideoModel.copyOf(original, (updated) => {
//       updated.comments = [...updated.comments, comment];
//     })
//   );
//   setComment("");
// };

// const doLike = async () => {
//   setLiked(!liked);
//   const original = await DataStore.query(VideoModel, params.id);
//   if (!liked) {
//     await DataStore.save(
//       VideoModel.copyOf(original, (updated) => {
//         updated.likes += 1;
//       })
//     );
//   } else {
//     await DataStore.save(
//       VideoModel.copyOf(original, (updated) => {
//         updated.likes -= 1;
//       })
//     );
//   }
// };

// const countView = async () => {
//   const original = await DataStore.query(VideoModel, params.id);
//   await DataStore.save(
//     VideoModel.copyOf(original, (updated) => {
//       updated.views += 1;
//     })
//   );
// };

// const fetchData = async () => {
//   const models = await DataStore.query(VideoModel, params.id);
//   setData(models);
// };
