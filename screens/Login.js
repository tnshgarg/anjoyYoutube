import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/Theme";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "aws-amplify";

const Login = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("");

  async function signIn() {
    try {
      setButtonText(<ActivityIndicator size={"small"} color="white" />);
      await Auth.signIn(username, password);
      console.log("✅ Success");
      navigation.replace("Tabs");
    } catch (error) {
      console.log("❌ Error signing in...", error);
    }
  }

  async function checkAuthState() {
    try {
      const auth = await Auth.currentUserInfo();
      // if (auth !== null) {
      //   console.log("✅ User is signed in");
      //   navigation.replace("Tabs");
      // }
      console.log(auth);
    } catch (err) {
      console.log("❌ User is not signed in");
    }
  }

  useEffect(async () => {
    const user = await Auth.currentAuthenticatedUser();
    if (user) {
      navigation.replace("Tabs");
    } else {
      console.log("Not logged in");
    }
    console.log(user);
  }, []);

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
            Login
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 15 }}>
          <Input
            placeholder="Enter your email"
            inputStyle={{
              color: "white",
              width: "90%",
              fontFamily: "LivvicMedium",
            }}
            selectionColor={theme.primary}
            containerStyle={{ width: "90%" }}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Enter password"
            inputStyle={{
              color: "white",
              width: "90%",
              fontFamily: "LivvicMedium",
            }}
            selectionColor={theme.primary}
            containerStyle={{ width: "90%" }}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={{ width: "90%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={signIn}
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
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "LivvicMedium",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                New To Anjoy? Please{" "}
                <Text
                  style={{
                    color: theme.primary,
                    fontFamily: "LivvicSemiBold",
                    paddingTop: 5,
                  }}
                >
                  Register
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
