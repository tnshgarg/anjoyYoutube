import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./../components/Header";
import HomeCategories from "../components/HomeCategories";
import HomeFeed from "../components/HomeFeed";
import { StatusBar } from "expo-status-bar";
import { ThemeContext } from "../context/Theme";
import { Auth } from "aws-amplify";

const Home = () => {
  const theme = useContext(ThemeContext);

  async function getUser() {
    const user = await Auth.currentAuthenticatedUser();
    console.log(user);
  }

  useEffect(() => {
    getUser();
  }, []);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar style="light" backgroundColor={"#FFF5F2"} />
      <ScrollView
        decelerationRate={0.97}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: theme.background }}
      >
        <Header />
        <HomeCategories />
        <HomeFeed />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
