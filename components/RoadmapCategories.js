import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme";
import { useNavigation } from "@react-navigation/native";

const RoadmapCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Computer Science",
      img: "https://cdn.dribbble.com/users/2131993/screenshots/15628402/media/7bb0d27e44d8c2eff47276ae86bfd6a3.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 2,
      name: "Maths",
      img: "https://cdn.dribbble.com/users/2092964/screenshots/15599853/media/a7eb7c74ab820c8b5f57da3a66fc86df.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 3,
      name: "Literature",
      img: "https://cdn.dribbble.com/users/24444/screenshots/17622088/media/f9578dfb8194aa64794c6984585a7436.png?compress=1&resize=450x338&vertical=top",
    },
    {
      id: 4,
      name: "Science",
      img: "https://cdn.dribbble.com/users/1068771/screenshots/15690567/media/15ea43ad6e8faf2b1b8475558a6ca9fc.jpg?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 5,
      name: "Music",
      img: "https://cdn.dribbble.com/users/1731254/screenshots/14355595/media/769848867c81b41c6cab0a4ee2d74047.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 6,
      name: "Dance",
      img: "https://cdn.dribbble.com/users/1626229/screenshots/13920068/media/30a213b73d4f4baae651588661da53a6.jpg?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 7,
      name: "Design",
      img: "https://cdn.dribbble.com/users/1320478/screenshots/17756035/media/8e82c546b37df53d31d4b6a82e7eb307.jpg?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 8,
      name: "Engineering",
      img: "https://cdn.dribbble.com/users/3281732/screenshots/13362662/media/f90de4fd59501b2c464941fec103af63.jpg?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 9,
      name: "Medical",
      img: "https://cdn.dribbble.com/users/1626229/screenshots/10864963/media/e08a38e19cb7804f4aaf19eb46d1b0b0.jpg?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 10,
      name: "School",
      img: "https://cdn.dribbble.com/users/1731254/screenshots/14335377/media/70e37d6448b5da9139e4e3cf3f147703.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 11,
      name: "Cooking",
      img: "https://cdn.dribbble.com/users/1564335/screenshots/16467428/media/94162c2b1ad5b55f1d02b69131da1982.jpg?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 12,
      name: "Content Creation",
      img: "https://cdn.dribbble.com/users/1784670/screenshots/16414915/media/639fa9f840ffed0a82f850a5c280f8cd.jpg?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 13,
      name: "Business",
      img: "https://cdn.dribbble.com/users/2367860/screenshots/16859451/media/0aa548e308861ab92c95aabc7bcf1802.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 14,
      name: "Art & Craft",
      img: "https://cdn.dribbble.com/users/4866865/screenshots/17743186/media/da066f4682bc358f76f8620c1dfa640a.png?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 15,
      name: "Self Development",
      img: "https://cdn.dribbble.com/users/317967/screenshots/15295297/media/d631206507187e62003274af04d5e3d3.jpg?compress=1&resize=400x300&vertical=top",
    },
    {
      id: 16,
      name: "Exam Preparation",
      img: "https://cdn.dribbble.com/users/2364807/screenshots/7073325/media/d4a7756514b91a08a9ee8c09bfe98369.jpg?compress=1&resize=400x300&vertical=top",
    },
  ];

  const theme = useContext(ThemeContext);

  return (
    <View style={{ paddingLeft: 15, marginTop: 20 }}>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 5, paddingTop: 5 }}
      >
        <FlatList
          contentContainerStyle={{ alignSelf: "flex-start" }}
          numColumns={Math.ceil(categories.length / 2)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({ item, index }) => (
            <RoadmapCategoriesComponent
              key={item.id}
              subject={item.name}
              image={item.img}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const RoadmapCategoriesComponent = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Category", { subject: props.subject })
      }
      style={{ marginBottom: 20, marginRight: 15 }}
    >
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
          fontSize: 15,
          fontFamily: "LivvicMedium",
          backgroundColor: "rgba(0,0,0,1)",
          padding: 5,
          borderRadius: 10,
        }}
      >
        {props.subject}
      </Text>
    </TouchableOpacity>
  );
};

export default RoadmapCategories;
