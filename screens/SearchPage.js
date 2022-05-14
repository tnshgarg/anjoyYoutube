import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";
import { ThemeContext } from "../context/Theme";
import SearchHeader from "../components/SearchHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { DataStore } from "@aws-amplify/datastore";
import { EmbeddedVideo } from "../src/models";

const SearchPage = () => {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = (search) => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=relevance&q=${search}&safeSearch=strict&topicId=%2Fm%2F01k8wb&type=video&videoCategoryId=27&videoDefinition=any&videoDuration=any&videoEmbeddable=true&videoLicense=any&key=AIzaSyAYGy_29NR46u9MSMmr9q5QW29AcwSKtQo`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data.items);
        setData(data.items);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <SearchHeader />
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <View
            style={{
              backgroundColor: "white",
              width: "90%",
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
                value={search}
                onChangeText={setSearch}
                keyboardAppearance="light"
                placeholder="Search for coding, dance, music..."
              />
            </View>
            <TouchableOpacity
              onPress={() => fetchData(search)}
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
        <View style={{ width: "100%", alignItems: "center" }}>
          <FlatList
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: "center",
              paddingTop: 15,
              paddingBottom: 15,
              marginTop: 15,
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
        </View>
      </ScrollView>
    </SafeAreaView>
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
        source={{ uri: thumbnail }}
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

export default SearchPage;
