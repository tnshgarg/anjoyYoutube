import { View, Text } from "react-native";
import React, { useContext } from "react";
import CategoryHeader from "../components/CategoryHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/Theme";

const TermsAndCondition = () => {
  const theme = useContext(ThemeContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <CategoryHeader subject="Terms and Conditions" />
      <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
        <Text
          style={{ fontFamily: "LivvicSemiBold", fontSize: 16, color: "black" }}
        >
          This privacy policy states that the users who is using this
          application is the best person in this world.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default TermsAndCondition;
