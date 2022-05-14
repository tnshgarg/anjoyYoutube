import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/Theme";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

const Verify = ({ route }) => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [authCode, setAuthCode] = useState("");

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(route.params.username, authCode);
      console.log("✅ Code confirmed");
      navigation.navigate("Tabs");
    } catch (error) {
      console.log(
        "❌ Verification code does not match. Please enter a valid verification code.",
        error.code
      );
      alert("❌ Invalid Verification Code");
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingTop: 30,
      }}
    >
      <ScrollView>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Image
            source={require("../assets/signup.png")}
            style={{ width: 250, height: 250, resizeMode: "contain" }}
          />
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text
            style={{
              color: "white",
              fontSize: 24,
              marginBottom: 15,
              fontFamily: "LivvicSemiBold",
              marginTop: 30,
            }}
          >
            Verify Code
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 15 }}>
          <Input
            placeholder="Enter code from your email"
            inputStyle={{
              color: "white",
              width: "90%",
              fontFamily: "LivvicMedium",
            }}
            selectionColor={theme.primary}
            containerStyle={{ width: "90%" }}
            value={authCode}
            onChangeText={setAuthCode}
          />
          <View style={{ width: "90%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={confirmSignUp}
              style={{
                width: "95%",
                backgroundColor: theme.primary,
                padding: 10,
                borderRadius: 15,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                borderColor: "#e66a0e",
                borderWidth: 3,
              }}
            >
              <Ionicons
                name="log-in"
                color="white"
                size={22}
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  fontFamily: "LivvicMedium",
                  fontSize: 16,
                  color: theme.textColor,
                }}
              >
                Confirm Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verify;
