import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import { LogBox } from "react-native";
import { ThemeContext, ThemeProvider } from "./context/Theme";
import * as NavigationBar from "expo-navigation-bar";
import AppLoading from "expo-app-loading";
import { useFonts } from "@expo-google-fonts/inter";
import VideoScreen from "./screens/VideoScreen";
import Roadmap from "./screens/Roadmap";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Verify from "./screens/Verify";
import CategoryPage from "./screens/CategoryPage";
import EditChannel from "./screens/EditChannel";
import SearchPage from "./screens/SearchPage";
import EditProfile from "./screens/EditProfile";
import PrivacyPolicy from "./screens/PrivacyPolicy";
import TermsAndCondition from "./screens/TermsAndCondition";

const HomeStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Video" component={VideoScreen} />
      <HomeStack.Screen name="Search" component={Search} />
      <HomeStack.Screen name="SearchPage" component={SearchPage} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Category" component={CategoryPage} />
      <HomeStack.Screen name="Edit Channel" component={EditChannel} />
      <HomeStack.Screen name="Edit Profile" component={EditProfile} />
      <HomeStack.Screen name="Privacy Policy" component={PrivacyPolicy} />
      <HomeStack.Screen
        name="Terms and Condition"
        component={TermsAndCondition}
      />
      <HomeStack.Screen name="Roadmap" component={Roadmap} />
    </HomeStack.Navigator>
  );
};

function App() {
  let [fontsLoaded] = useFonts({
    LivvicRegular: require("./assets/font/Livvic-Regular.ttf"),
    LivvicMedium: require("./assets/font/Livvic-Medium.ttf"),
    LivvicSemiBold: require("./assets/font/Livvic-SemiBold.ttf"),
    LivvicBold: require("./assets/font/Livvic-Bold.ttf"),
  });

  const theme = useContext(ThemeContext);
  LogBox.ignoreAllLogs();

  React.useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#FFF5F2");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#FFF5F2" />
          <RootStack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <RootStack.Screen name="Tabs" component={StackNavigator} />
            <RootStack.Screen name="Register" component={Register} />
            <RootStack.Screen name="Login" component={Login} />
            <RootStack.Screen name="Verify" component={Verify} />
          </RootStack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    );
  }
}

export default App;

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Main") {
//             return focused ? (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/homeOrange.png")}
//               />
//             ) : (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/homeWhite.png")}
//               />
//             );
//           } else if (route.name === "Course") {
//             return focused ? (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/courseOrange.png")}
//               />
//             ) : (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/courseWhite.png")}
//               />
//             );
//           } else if (route.name === "Add") {
//             return focused ? (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/addOrange.png")}
//               />
//             ) : (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/addWhite.png")}
//               />
//             );
//           } else if (route.name === "Notification") {
//             return focused ? (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/bellOrange.png")}
//               />
//             ) : (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/bellWhite.png")}
//               />
//             );
//           } else if (route.name === "Roadmap") {
//             return focused ? (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/roadOrange.png")}
//               />
//             ) : (
//               <Image
//                 style={styles.tabBarLogo}
//                 source={require("./assets/TabBarIcons/roadWhite.png")}
//               />
//             );
//           }
//         },
//         tabBarActiveTintColor: "#ff6d00",
//         tabBarInactiveTintColor: "lightgray",
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: "#FFF5F2",
//           height: 50,
//           borderTopWidth: 0,
//         },
//         tabBarShowLabel: false,
//       })}
//     >
//       <Tab.Screen name="Main" component={HomeStackNavigator} />
//       <Tab.Screen name="Course" component={Course} />
//       <Tab.Screen name="Add" component={AddVideo} />
//       <Tab.Screen name="Notification" component={Notification} />
//       <Tab.Screen name="Roadmap" component={Roadmap} />
//     </Tab.Navigator>
//   );
// };
