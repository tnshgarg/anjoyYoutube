import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryHeader from "./../components/CategoryHeader";
import { ThemeContext } from "../context/Theme";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { ListItem, Avatar } from "react-native-elements";

const list2 = [
  {
    name: "Amy Farha",
    subtitle: "Vice President",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman",
  },
  // more items
];

const EditProfile = () => {
  const theme = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [expanded, setExpanded] = useState(false);
  const width = Dimensions.get("window").width;
  const [skillText, setSkillText] = useState("Select a Primary Skill");
  const [dropdownStyles, setDropdownStyles] = useState({ borderRadius: 15 });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <CategoryHeader subject="Edit Profile" />
      <ScrollView>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Ionicons
              style={{
                position: "absolute",
                alignSelf: "center",
                zIndex: 200,
              }}
              name="camera-outline"
              color={"white"}
              size={45}
            />
            <Image
              source={require("../assets/profile.jpg")}
              style={{ width: 90, height: 90, borderRadius: 90, opacity: 0.8 }}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 20, width: "100%", alignItems: "center" }}>
            <Input
              placeholder="Enter Your Name"
              placeholderTextColor={"lightgray"}
              leftIconContainerStyle={{ marginRight: 5 }}
              inputStyle={{
                fontSize: 14,
                fontFamily: "LivvicMedium",
                color: "white",
              }}
              containerStyle={{ width: "90%" }}
              keyboardType="twitter"
              keyboardAppearance="dark"
              value={name}
              onChangeText={setName}
              maxLength={60}
              leftIcon={() => (
                <Ionicons name="text-outline" color="lightgray" size={20} />
              )}
            />
            <ListItem.Accordion
              activeOpacity={0.9}
              style={{
                width: "90%",
                borderRadius: 15,
              }}
              containerStyle={dropdownStyles}
              content={
                <>
                  <Ionicons name="ios-bookmark" size={30} />
                  <ListItem.Content style={{ marginLeft: 10 }}>
                    <ListItem.Title
                      style={{ fontFamily: "LivvicMedium", fontSize: 16 }}
                    >
                      {skillText}
                    </ListItem.Title>
                  </ListItem.Content>
                </>
              }
              isExpanded={expanded}
              onPress={() => {
                setExpanded(!expanded);
                if (expanded) {
                  setDropdownStyles({ borderRadius: 15 });
                } else {
                  setDropdownStyles({
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  });
                }
              }}
            >
              {list2.map((l, i) => (
                <ListItem
                  onPress={() => {
                    setSkillText(l.name);
                    setExpanded(false);
                  }}
                  containerStyle={{
                    width: width - 0.1 * width,
                  }}
                  key={i}
                  bottomDivider
                >
                  <ListItem.Content style={{ flex: 1 }}>
                    <ListItem.Title>{l.name}</ListItem.Title>
                    <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              ))}
            </ListItem.Accordion>
          </View>
          <TouchableOpacity
            style={{
              width: "90%",
              backgroundColor: theme.primary,
              marginTop: 15,
              height: 50,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontFamily: "LivvicSemiBold",
                color: "white",
              }}
            >
              Save Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
