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
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import axios from "axios";
import config from "../config";

const EditNote = () => {
  const route = useRoute();
  const { noteId } = route.params;
  const { userDetails } = useUser();
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.hostedURL}/note/${noteId}`);

      if (response && response.data) {
        setData(response.data); // Set data to response.data
        setTitle(response.data.title);
        setContent(response.data.content);
      } else {
        console.error("Empty response or missing data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleContentChange = (text) => {
    setContent(text);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      setIsLoading(true);
      await axios.delete(`${config.hostedURL}/note/${noteId}`);
      navigation.navigate("Home");
    } catch (error) {
      console.error("An error occurred: ", error);
      Alert.alert("Something went wrong", "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNote = async (noteId, updatedData) => {
    console.log(updatedData);
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${config.hostedURL}/note/${noteId}`,
        updatedData
      );
      if (response.data && response.data.updatedNote) {
        // Update was successful
        navigation.navigate("Home");
      } else {
        // Handle unsuccessful update
        Alert.alert("Update failed", "Please try again");
      }
    } catch (error) {
      console.error("An error occurred: ", error);
      Alert.alert("Something went wrong", "Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      {data ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{ marginBottom: 50, width: "10%" }}
            >
              <Ionicons name="chevron-back-circle" size={30} />
            </TouchableOpacity>
            <View style={styles.header}>
              <View style={styles.title}>
                <Text
                  style={{ fontSize: 20, fontWeight: 600, marginBottom: 5 }}
                >
                  Add Notes
                </Text>
              </View>
              <View style={styles.subTitle}>
                <Text>Please fill the form in other to edit your note</Text>
              </View>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.formItem}>
                <TextInput
                  placeholder="Title"
                  placeholderTextColor="#acadaf"
                  onChangeText={handleTitleChange}
                  value={title}
                  style={[styles.inputInner, !editable && styles.disabledInput]}
                  editable={editable} // Add this line
                />
              </View>
              <View style={styles.formItem}>
                <TextInput
                  placeholder="Content"
                  placeholderTextColor="#acadaf"
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={handleContentChange}
                  value={content}
                  style={[
                    styles.inputInner2,
                    !editable && styles.disabledInput,
                  ]}
                  editable={editable} // Add this line
                />
              </View>
            </View>
            <View style={styles.btn}>
              {!editable ? (
                <TouchableOpacity
                  onPress={() => setEditable(true)}
                  style={[styles.editBtn, isLoading && styles.disabledButton]}
                  disabled={isLoading}
                >
                  <View>
                    <Text style={{ color: "white" }}>Edit</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    const updatedData = {
                      title,
                      content,
                      userId: userDetails && userDetails._id,
                    };
                    handleUpdateNote(noteId, updatedData);
                  }}
                  style={styles.updateBtn}
                >
                  <View>
                    <Text style={{ color: "white" }}>Update</Text>
                  </View>
                </TouchableOpacity>
              )}
              {!editable ? (
                <TouchableOpacity
                  onPress={() => handleDeleteNote(noteId)}
                  style={[styles.deleteBtn, isLoading && styles.disabledButton]}
                  disabled={isLoading}
                >
                  <View>
                    <Text style={{ color: "white" }}>Delete</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => setEditable(false)}
                  style={styles.deleteBtn}
                >
                  <View>
                    <Text style={{ color: "white" }}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ff735c" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default EditNote;

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
  loader: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  editBtn: {
    padding: 10,
    backgroundColor: "#ffbd2e",
    width: 80,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn: {
    width: "100%",
    // backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteBtn: {
    padding: 10,
    backgroundColor: "#ff5f56",
    width: 80,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
  updateBtn: {
    padding: 10,
    backgroundColor: "#27c93f",
    width: 80,
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
