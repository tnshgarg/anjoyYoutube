import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./../components/Header";
import { ThemeContext } from "../context/Theme";
import { Input, ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { RNS3 } from "react-native-aws3";
import { DataStore } from "@aws-amplify/datastore";
import { Video } from "../src/models";
import { Picker } from "@react-native-picker/picker";

const AddVideo = () => {
  const theme = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState("");
  const [notes, setNotes] = useState("");
  const [assignment, setAssignment] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  const [notesUploadingMessage, setNotesUploadingMessage] = useState(
    <Image
      source={require("../assets/OtherIcons/studyMaterial.png")}
      style={{ width: 40, height: 40, resizeMode: "contain" }}
    />
  );
  const [videoUploadingMessage, setVideoUploadingMessage] = useState(
    <Image
      source={require("../assets/OtherIcons/upload.png")}
      style={{ width: 40, height: 40, resizeMode: "contain" }}
    />
  );
  const [assignmentUploadingMessage, setAssignmentUploadingMessage] = useState(
    <Image
      source={require("../assets/OtherIcons/practice.png")}
      style={{ width: 40, height: 40, resizeMode: "contain" }}
    />
  );
  const [thumbnailUploadingMessage, setThumbnailUploadingMessage] = useState(
    <Image
      source={require("../assets/OtherIcons/thumbnail.png")}
      style={{ width: 40, height: 40, resizeMode: "contain" }}
    />
  );

  const categories = [
    {
      id: 1,
      name: "Computer Science",
    },
    {
      id: 2,
      name: "Maths",
    },
    {
      id: 3,
      name: "Literature",
    },
    {
      id: 4,
      name: "Science",
    },
    {
      id: 5,
      name: "Music",
    },
    {
      id: 6,
      name: "Dance",
    },
    {
      id: 7,
      name: "Design",
    },
    {
      id: 8,
      name: "Engineering",
    },
    {
      id: 9,
      name: "Medical",
    },
    {
      id: 10,
      name: "Elementary",
    },
    {
      id: 11,
      name: "Cooking",
    },
    {
      id: 12,
      name: "Content Creation",
    },
    {
      id: 13,
      name: "Business",
    },
    {
      id: 14,
      name: "Art & Craft",
    },
    {
      id: 15,
      name: "Personal Development",
    },
    {
      id: 16,
      name: "Humanities",
    },
    {
      id: 17,
      name: "Software Development",
    },
    {
      id: 14,
      name: "Exam Preparation",
    },
  ];

  const _pickNotes = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
    uploadNotes(result);
  };

  const _pickAssignments = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
    uploadAssignments(result);
  };

  const _pickThumbnail = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      multiple: false,
    });
    uploadThumbnail(result);
  };

  const _pickVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "video/mp4",
      multiple: false,
    });
    uploadVideo(result);
  };

  const uploadNotes = (notes) => {
    if (Object.keys(notes).length == 0) {
      alert("Please select image first");
      return;
    }

    const body = new FormData();
    body.append("notes", {
      uri: notes.uri,
      name: notes.name,
      type: "application/pdf",
    });

    const options = {
      keyPrefix: "notes/",
      bucket: "anjoyapp-storage-4b57746c125853-staging",
      region: "ap-south-1",
      accessKey: "AKIAU5FGGVOAJD6ZMIBL",
      secretKey: "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",
      successActionStatus: 201,
    };

    RNS3.put(
      {
        uri: notes.uri,
        name: `${Date.now()}--${notes.name}`,
        type: "application/pdf",
      },
      options
    )
      .progress((progress) =>
        setNotesUploadingMessage(`${Math.floor(progress.percent * 100)}%`)
      )
      .then((response) => {
        if (response.status !== 201)
          throw new Error("Failed to upload video to S3");
        setNotesUploadingMessage(
          <Ionicons name="checkmark" size={50} color="white" />
        );
        console.log(response.body);
        setNotes(response.body.postResponse.location);
      })
      .catch((e) => {
        console.log(e);
      });
    //
    // .then((response) => {
    //   if (response.status !== 201) alert("Failed to upload image to S3");
    //   console.log(response.body);
    //   setPhoto("");
    //   let { bucket, etag, key, location } = response.body.postResponse;
    //   setUploadSuccessMessage(
    //     `Uploaded Successfully:
    //     \n1. bucket => ${bucket}
    //     \n2. etag => ${etag}
    //     \n3. key => ${key}
    //     \n4. location => ${location}`
    //   );
    /**
     * {
     *   postResponse: {
     *     bucket: "your-bucket",
     *     etag : "9f620878e06d28774406017480a59fd4",
     *     key: "uploads/image.png",
     *     location: "https://bucket.s3.amazonaws.com/**.png"
     *   }
     * }
     */
  };

  const uploadAssignments = (assignment) => {
    if (Object.keys(assignment).length == 0) {
      alert("Please select image first");
      return;
    }

    const body = new FormData();
    body.append("assignment", {
      uri: assignment.uri,
      name: assignment.name,
      type: "application/pdf",
    });

    const options = {
      keyPrefix: "assignments/",
      bucket: "anjoyapp-storage-4b57746c125853-staging",
      region: "ap-south-1",
      accessKey: "AKIAU5FGGVOAJD6ZMIBL",
      secretKey: "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",
      successActionStatus: 201,
    };

    RNS3.put(
      {
        uri: assignment.uri,
        name: `${Date.now()}--${assignment.name}`,
        type: "application/pdf",
      },
      options
    )
      .progress((progress) =>
        setAssignmentUploadingMessage(`${Math.floor(progress.percent * 100)}%`)
      )
      .then((response) => {
        if (response.status !== 201)
          throw new Error("Failed to upload video to S3");
        setAssignmentUploadingMessage(
          <Ionicons name="checkmark" size={50} color="white" />
        );
        console.log(response.body);
        setAssignment(response.body.postResponse.location);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadThumbnail = (thumbnail) => {
    if (Object.keys(thumbnail).length == 0) {
      alert("Please select image first");
      return;
    }

    const body = new FormData();
    body.append("thumbnail", {
      uri: thumbnail.uri,
      name: thumbnail.name,
      type: "application/pdf",
    });

    const options = {
      keyPrefix: "thumbnails/",
      bucket: "anjoyapp-storage-4b57746c125853-staging",
      region: "ap-south-1",
      accessKey: "AKIAU5FGGVOAJD6ZMIBL",
      secretKey: "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",
      successActionStatus: 201,
    };

    RNS3.put(
      {
        uri: thumbnail.uri,
        name: `${Date.now()}--${thumbnail.name}`,
        type: "application/pdf",
      },
      options
    )
      .progress((progress) =>
        setThumbnailUploadingMessage(`${Math.floor(progress.percent * 100)}%`)
      )
      .then((response) => {
        if (response.status !== 201)
          throw new Error("Failed to upload video to S3");
        setThumbnailUploadingMessage(
          <Ionicons name="checkmark" size={50} color="white" />
        );
        console.log(response.body);
        setThumbnail(response.body.postResponse.location);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const uploadVideo = (video) => {
    if (Object.keys(video).length == 0) {
      alert("Please select image first");
      return;
    }

    const body = new FormData();
    body.append("video", {
      uri: video.uri,
      name: video.name,
      type: "video/mp4",
    });

    const options = {
      keyPrefix: "videos/",
      bucket: "anjoyapp-storage-4b57746c125853-staging",
      region: "ap-south-1",
      accessKey: "AKIAU5FGGVOAJD6ZMIBL",
      secretKey: "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",
      successActionStatus: 201,
    };

    RNS3.put(
      {
        uri: video.uri,
        name: `${Date.now()}--${video.name}`,
        type: "video/mp4",
      },
      options
    )
      .progress((progress) =>
        setVideoUploadingMessage(`${Math.floor(progress.percent * 100)}%`)
      )
      .then((response) => {
        if (response.status !== 201)
          throw new Error("Failed to upload video to S3");
        setVideoUploadingMessage(
          <Ionicons name="checkmark" size={50} color="white" />
        );
        console.log(response.body);
        setVideo(response.body.postResponse.location);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const upload = async () => {
    await DataStore.save(
      new Video({
        posterUrl:
          "https://i.ytimg.com/vi/LwMutPnXnoA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB8ZoL_DJZ4aPBgHh-t_7pr7gfZwQ",
        videoUrl: video,
        videoTitle: title,
        videoCategory: selectedCategory,
        timestamp: new Date().toISOString(),
        views: 1020,
        likes: 1020,
        channelName: "Tanish garg",
        notesUrl: notes,
        assignmentUrl: assignment,
        shareUrl: "Lorem ipsum dolor sit amet",
        comments: [],
        channelUrl: thumbnail,
        videoDescription: desc,
        channels: [],
      })
    ).then(() => {
      alert("Your video has been uploaded");
      setVideo("");
      setNotes("");
      setAssignment("");
      setThumbnail("");
      setDesc("");
      setTitle("");
      setSelectedCategory("Self Development");
      setNotesUploadingMessage(
        <Image
          source={require("../assets/OtherIcons/studyMaterial.png")}
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
      );
      setAssignmentUploadingMessage(
        <Image
          source={require("../assets/OtherIcons/practice.png")}
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
      );
      setThumbnailUploadingMessage(
        <Image
          source={require("../assets/OtherIcons/thumbnail.png")}
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
      );
      setVideoUploadingMessage(
        <Image
          source={require("../assets/OtherIcons/upload.png")}
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
      );
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.background, flex: 1 }}>
      <Header />
      <View>
        <TouchableOpacity
          onPress={_pickVideo}
          style={{ alignItems: "center", marginVertical: 15 }}
        >
          <View
            style={{
              backgroundColor: "#222222",
              padding: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 55, color: "white" }}>
              {videoUploadingMessage}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontFamily: "LivvicMedium",
              color: "lightgray",
              fontSize: 12,
            }}
          >
            Upload Video
          </Text>
        </TouchableOpacity>
        <View>
          <Input
            placeholder="Enter Your Video Title"
            placeholderTextColor={"lightgray"}
            leftIconContainerStyle={{ marginRight: 5 }}
            inputStyle={{
              fontSize: 14,
              fontFamily: "LivvicMedium",
              color: "white",
            }}
            keyboardType="twitter"
            keyboardAppearance="dark"
            value={title}
            onChangeText={setTitle}
            maxLength={60}
            leftIcon={() => (
              <Ionicons name="text-outline" color="lightgray" size={20} />
            )}
          />
          <Input
            placeholder="Enter Video Description"
            placeholderTextColor={"lightgray"}
            leftIconContainerStyle={{ marginRight: 5 }}
            inputStyle={{
              fontSize: 14,
              fontFamily: "LivvicMedium",
              color: "white",
            }}
            keyboardType=""
            value={desc}
            onChangeText={setDesc}
            keyboardAppearance="dark"
            numberOfLines={4}
            multiline
            leftIcon={() => (
              <Ionicons name="text-outline" color="lightgray" size={20} />
            )}
          />
          <View
            style={{
              width: "95%",
              borderColor: "lightgray",
              borderWidth: 1,
              alignSelf: "center",
              borderRadius: 15,
            }}
          >
            <Picker
              dropdownIconColor={"white"}
              label="Select Category"
              style={{
                color: "white",
                ",
                width: "95%",
                alignSelf: "center",
                backgroundColor: "black",
              }}
              itemStyle={{
                fontSize: 14,
                ",
                backgroundColor: "black",
              }}
              selectedValue={selectedCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCategory(itemValue)
              }
              prompt="Select a category"
            >
              {categories.map(({ id, name }) => (
                <Picker.Item
                  key={id}
                  label={name}
                  value={name}
                  style={{ fontSize: 14, " }}
                />
              ))}
            </Picker>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={_pickNotes}
              style={{ alignItems: "center", marginVertical: 15 }}
            >
              <View
                style={{
                  backgroundColor: "#222222",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 55, color: "white" }}>
                  {notesUploadingMessage}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "LivvicMedium",
                  color: "lightgray",
                  fontSize: 12,
                }}
              >
                Upload Notes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_pickAssignments}
              style={{ alignItems: "center", marginVertical: 15 }}
            >
              <View
                style={{
                  backgroundColor: "#222222",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 55, color: "white" }}>
                  {assignmentUploadingMessage}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "LivvicMedium",
                  color: "lightgray",
                  fontSize: 12,
                }}
              >
                Upload Assignment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={_pickThumbnail}
              style={{ alignItems: "center", marginVertical: 15 }}
            >
              <View
                style={{
                  backgroundColor: "#222222",
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <Text style={{ fontSize: 55, color: "white" }}>
                  {thumbnailUploadingMessage}
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 10,
                  fontFamily: "LivvicMedium",
                  color: "lightgray",
                  fontSize: 12,
                }}
              >
                Upload Thumbnail
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", alignItems: "center", marginTop: 15 }}>
            <TouchableOpacity
              onPress={upload}
              style={{
                width: "90%",
                backgroundColor: theme.primary,
                padding: 10,
                borderRadius: 15,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "LivvicMedium",
                  fontSize: 14,
                  color: theme.textColor,
                }}
              >
                Upload Video
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddVideo;

const styles = StyleSheet.create({});
