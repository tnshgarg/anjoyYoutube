import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/Theme";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Auth, DataStore } from "aws-amplify";
import { Channel } from "../src/models";

const Register = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(username);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("tanish");

  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email, name } });
      console.log("✅ Sign-up Confirmed");
      await DataStore.save(
        new Channel({
          channelName: username,
          channelUrl: username,
          channelDescription: "I am " + username,
          Videos: [],
          videos: [],
          channelProfileUrl: "Lorem ipsum dolor sit amet",
        })
      );
      navigation.navigate("Verify", { username: username });
    } catch (error) {
      console.log("❌ Error signing up...", error);
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
            Register
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 15 }}>
          <Input
            value={username}
            onChangeText={setUsername}
            placeholder="Enter your email"
            inputStyle={{
              color: "white",
              width: "90%",
              fontFamily: "LivvicMedium",
            }}
            selectionColor={theme.primary}
            containerStyle={{ width: "90%" }}
          />
          <Input
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            inputStyle={{
              color: "white",
              width: "90%",
              fontFamily: "LivvicMedium",
            }}
            selectionColor={theme.primary}
            containerStyle={{ width: "90%" }}
            secureTextEntry
          />
          <View style={{ width: "90%", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => signUp()}
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
                Register
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  color: "white",
                  fontFamily: "LivvicMedium",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                Already Registered? Please{" "}
                <Text
                  style={{
                    color: theme.primary,
                    fontFamily: "LivvicSemiBold",
                    paddingTop: 5,
                  }}
                >
                  Login
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
