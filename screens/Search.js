import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../context/Theme";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Search = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        flexDirection: "row",
        paddingHorizontal: 15,
      }}
    >
      <View style={{ height: 75, alignItems: "center", flexDirection: "row" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" color={"#353535"} size={30} />
        </TouchableOpacity>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          inputContainerStyle={{ backgroundColor: "#191919" }}
          containerStyle={{ backgroundColor: theme.background, width: "92%" }}
          selectionColor={theme.primary}
          inputStyle={{ color: "white", fontSize: 14 }}
          returnKeyLabel="Search"
          returnKeyType="search"
          keyboardAppearance="dark"
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
