import { View, Text, FlatList, Image, ScrollView } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme";

const CourseCategories = () => {
  const data = [
    {
      id: 1,
      subject: "Coding",
      image:
        "https://cdn.dribbble.com/users/708424/screenshots/6809076/dribbble_4x.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 2,
      subject: "Coding",
      image:
        "https://cdn.dribbble.com/users/708424/screenshots/6809076/dribbble_4x.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 3,
      subject: "Coding",
      image:
        "https://cdn.dribbble.com/users/708424/screenshots/6809076/dribbble_4x.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 4,
      subject: "Coding",
      image:
        "https://cdn.dribbble.com/users/708424/screenshots/6809076/dribbble_4x.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 5,
      subject: "Coding",
      image:
        "https://cdn.dribbble.com/users/708424/screenshots/6809076/dribbble_4x.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 6,
      subject: "Coding",
      image:
        "https://cdn.dribbble.com/users/708424/screenshots/6809076/dribbble_4x.png?compress=1&resize=400x300&vertical=top",
    },
  ];

  const theme = useContext(ThemeContext);
  return (
    <View style={{ paddingLeft: 15 }}>
      <Text
        style={{
          fontSize: 18,
          marginVertical: 15,
          fontFamily: "LivvicSemiBold",
          color: theme.textColor,
        }}
      >
        Trending Categories
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <FlatList
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={Math.ceil(data.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => (
            <HomeCategoriesComponent
              key={item.id}
              subject={item.subject}
              image={item.image}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const HomeCategoriesComponent = (props) => {
  return (
    <View style={{ marginBottom: 20, marginRight: 15 }}>
      <View>
        <Image
          source={{
            uri: props.image,
          }}
          style={{
            width: 210,
            height: 150,
            resizeMode: "cover",
            borderRadius: 15,
          }}
        />
      </View>
      <Text
        style={{
          position: "absolute",
          bottom: 10,
          right: 18,
          color: "white",
          fontSize: 18,
          ",
        }}
      >
        {props.subject}
      </Text>
    </View>
  );
};

export default CourseCategories;
