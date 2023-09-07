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
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import config from "../config";
import axios from "axios";

const AddNote = () => {
  const { userDetails } = useUser();
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddNote = async (data) => {
    try {
      setIsLoading(true);
      await axios.post(`${config.hostedURL}/note`, data);
      setTitle("");
      setContent("");
      navigation.navigate("Home");
    } catch (error) {
      console.error("An error occurred: ", error);
      Alert.alert("Something went wrong", "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleContentChange = (text) => {
    setContent(text);
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            style={{ marginBottom: 50, width: "10%" }}
          >
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>
          <ScrollView
            showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.header}>
              <View style={styles.title}>
                <Text
                  style={{ fontSize: 20, fontWeight: 600, marginBottom: 5 }}
                >
                  Add Notes
                </Text>
              </View>
              <View style={styles.subTitle}>
                <Text>Please fill the form in other to create a new note</Text>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formItem}>
                <TextInput
                  placeholder="Title"
                  placeholderTextColor="#acadaf"
                  onChangeText={handleTitleChange}
                  value={title}
                  style={styles.inputInner}
                />
              </View>
              <View style={styles.formItem}>
                <TextInput
                  placeholder="Content"
                  placeholderTextColor="#acadaf"
                  multiline={true} // Set this to true for a multi-line input
                  numberOfLines={4} // You can adjust the number of visible lines
                  onChangeText={handleContentChange}
                  value={content}
                  style={styles.inputInner2}
                />
              </View>
            </View>
            <View style={styles.addBtnContainer}>
              <TouchableOpacity
                style={[
                  styles.addBtn,
                  (title.trim() === "" || content.trim() === "" || isLoading) &&
                    styles.disabledButton,
                ]}
                onPress={() => {
                  const formData = {
                    title,
                    content,
                    userId: userDetails && userDetails._id,
                  };
                  handleAddNote(formData);
                }}
                disabled={
                  title.trim() === "" || content.trim() === "" || isLoading
                }
              >
                <Text style={styles.addBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  formContainer: {
    marginTop: 40,
  },
  formItem: {
    padding: 10,
    paddingRight: 20,
    borderRadius: 5,
    borderColor: "#e9e6e7",
    marginBottom: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
  formItem2: {
    padding: 10,
    paddingRight: 20,
    borderRadius: 5,
    borderColor: "#e9e6e7",
    marginBottom: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "grey",
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputInner: {
    width: "90%",
    fontSize: 15,
  },
  inputInner2: {
    width: "90%",
    fontSize: 15,
    height: 200,
  },
  addBtnContainer: {
    width: "100%",
    display: "flex",
    alignItems: "flex-end",
    borderRadius: 20,
  },
  addBtn: {
    backgroundColor: "#ff735c",
    height: 40,
    width: 90,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    textAlign: "center",
    color: "white",
  },
  disabledButton: {
    backgroundColor: "grey",
  },
});
