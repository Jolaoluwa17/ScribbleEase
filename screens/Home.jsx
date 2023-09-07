import {
  View,
  Text,
  Button,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import EntoType from "react-native-vector-icons/Entypo";
import LottieView from "lottie-react-native";
import { useUser } from "../context/UserContext";
import axios from "axios";
import config from "../config";
import { useFocusEffect } from "@react-navigation/native";

const Home = () => {
  const { userDetails } = useUser();
  const [data, setData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const MAX_LINES = 7;
  const title_line = 1;
  const navigation = useNavigation();
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${config.hostedURL}/note/user/${userDetails._id}`
      );
      const filteredData = response.data.filter((note) =>
        note.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
      setData(filteredData); // Assuming the response contains the data you want to display
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchKeyword]);

  const handleSearchInputChange = (text) => {
    setSearchKeyword(text);
  };

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthIndex = date.getMonth();

    return `${day} ${monthNames[monthIndex]}`;
  };

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    let greeting = "";

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    return greeting;
  };

  const backgroundColors = ["#e7f5fb", "#fff4e0", "#ffe9f4"];

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text style={{ fontSize: 20, fontWeight: 600, marginBottom: 5 }}>
              {userDetails && `Hello, ${userDetails.fullname}`}
            </Text>
            <Text>{getGreeting()}</Text>
          </View>
          <View style={styles.profilepic}>
            <Image
              source={require("../images/notes1.jpg")}
              style={styles.img}
            />
          </View>
        </View>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} style={{ paddingLeft: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchKeyword}
            onChangeText={handleSearchInputChange}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.list}>
            {data ? (
              data.map((notes, key) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("EditNote", { noteId: notes._id })
                  }
                  style={[
                    styles.notes,
                    {
                      backgroundColor:
                        backgroundColors[key % backgroundColors.length],
                    },
                  ]}
                  key={notes._id}
                >
                  <View>
                    <Text
                      style={styles.noteTitle}
                      numberOfLines={title_line}
                      ellipsizeMode="tail"
                    >
                      {notes.title}
                    </Text>
                    <Text
                      numberOfLines={MAX_LINES}
                      ellipsizeMode="tail" // This property adds ellipsis to truncated text
                      style={styles.noteContent}
                    >
                      {notes.content}
                    </Text>
                    <Text>{formatDate(notes.createdAt)}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#ff735c" />
              </View>
            )}

            {data ? (
              <View style={styles.notes}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("AddNote")}
                >
                  <Text style={styles.addNotesText}>
                    <EntoType
                      name="plus"
                      size={20}
                      style={{ paddingLeft: 10 }}
                    />
                    Add Text
                  </Text>
                  <LottieView
                    source={require("../assets/animation_lm4zoidv.json")} // Replace with your animation file
                    autoPlay
                    loop
                    speed={1.5} // Animation speed
                    style={{ width: 120, height: 120, marginLeft: 4 }} // Define the dimensions
                  />
                </TouchableOpacity>
              </View>
            ) : (
              ""
            )}
          </View>
        </ScrollView>
        <View style={styles.addBtn}>
          <TouchableOpacity onPress={() => navigation.navigate("AddNote")}>
            <Icon name="plus" size={20} style={{ color: "white" }} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    width: "50%",
    textAlign: "left",
    // backgroundColor: "red",
    fontSize: 30,
  },
  profilepic: {
    width: "50%",
    display: "flex",
    flexDirection: "row-reverse",
    // alignItems: "right",
  },
  img: {
    width: 50,
    height: 50,
    // borderColor: "black",
    // borderWidth: 1,
    borderRadius: 5,
  },
  searchBar: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f5f6fc",
    borderRadius: 5,
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f5f6fc",
    padding: 10,
    borderRadius: 5,
    width: "90%",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-between",
  },
  notes: {
    width: "45%",
    backgroundColor: "#f3f5f7",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    height: 200,
  },
  addBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: "50%",
    height: 50,
    width: 50,
    backgroundColor: "#2bc2ec",
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  loader: {
    width: "100%",
    height: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  addNotesText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#949596",
  },
  addNoteImg: {
    width: 100,
    height: 100,
  },
  noteContent: {
    height: 130,
  },
});
