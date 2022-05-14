import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./../components/Header";
import CourseCategories from "../components/CourseCategories";
import CourseFeed from "../components/CourseFeed";
import { ThemeContext } from "../context/Theme";

const Course = () => {
  const theme = useContext(ThemeContext);

  return (
    <SafeAreaView>
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ backgroundColor: theme.background }}
      >
        <CourseCategories />
        <CourseFeed />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Course;

const styles = StyleSheet.create({});
