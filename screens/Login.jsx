import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useUser } from "../context/UserContext";
import { SvgXml } from "react-native-svg";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const { setUserDetails } = useUser();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavedUser, setIsSavedUser] = useState(false);

  useEffect(() => {
    // Retrieve stored email and name
    const retrieveData = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedName = await AsyncStorage.getItem("userName");
        setEmail(storedEmail || "");
        setName(storedName || "");
        if (storedEmail && storedName) {
          setEmail(storedEmail);
          setName(storedName);
          setIsSavedUser(true);
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
      }
    };
    retrieveData();
  }, []);

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${config.hostedURL}/user/signin`,
        data
      );

      if (response.data.message === "Sign-in successful") {
        const userDetails = response.data.userDetails;
        setUserDetails(userDetails); // Update user details in UserContext
        setEmail("");
        setPassword("");
        try {
          await AsyncStorage.setItem("userEmail", email);
          await AsyncStorage.setItem("userName", userDetails.fullname);
        } catch (error) {
          console.error("Error storing data:", error);
        }
        navigation.navigate("Home");
      } else {
        Alert.alert("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const infoIconSvg = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 8.59961V12.5996" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 5.40733L9.008 5.39844" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 17C13.4182 17 17 13.4182 17 9C17 4.58172 13.4182 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4182 4.58172 17 9 17Z" stroke="#9F9F9F" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  const doubleCheckSvg = `<svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 5.02344L3.98225 8.00566C4.1537 8.17717 4.43167 8.17717 4.60312 8.00566L6.48781 6.121" stroke="#34C759" stroke-linecap="round"/>
  <path d="M11.6098 1L8.68298 3.92683" stroke="#34C759" stroke-linecap="round"/>
  <path d="M5.02441 4.65854L8.37249 8.00661C8.544 8.17812 8.8219 8.17812 8.99341 8.00661L16 1" stroke="#34C759" stroke-linecap="round"/>
  </svg>
  `;

  // To see the password
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  // const anyFieldBlank = () => {
  //   const fieldValues = Object.values(getValues());
  //   const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(getValues("email"));
  //   return fieldValues.some((value) => value.trim() === "") || !isEmailValid;
  // };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userName");
      // You can also reset the name and email states in the component, if needed
      setName("");
      setEmail("");
      console.log("User data cleared");
    } catch (error) {
      console.error("Error clearing user data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image source={require("../images/signup.jpg")} style={styles.img} />
        </View>
        {isSavedUser ? (
          <View>
            <View>
              <Text style={styles.header}>Welcome Back, {name}</Text>
              <Text style={styles.subHeader}>
                Please provide your password to login, Not you ?{" "}
                <Text
                  style={styles.loginLink}
                  onPress={async () => {
                    await clearUserData();
                    setIsSavedUser(false);
                  }}
                >
                  Logout
                </Text>
              </Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.formItem}>
                <View style={styles.input}>
                  <Icon
                    name="lock"
                    size={20}
                    style={{ paddingRight: 10, color: "grey" }}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#acadaf"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={handlePasswordChange}
                    value={password}
                    style={styles.inputInner}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Text>
                      {isPasswordVisible ? (
                        <Ionicons
                          name="eye-outline"
                          size={20}
                          style={{ paddingRight: 10, color: "grey" }}
                        />
                      ) : (
                        <Ionicons
                          name="eye-off-outline"
                          size={20}
                          style={{ paddingRight: 10, color: "grey" }}
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View>
              <Text style={styles.header}>Login {name}</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.formItem}>
                <View style={styles.input}>
                  <Icon
                    name="email"
                    size={20}
                    style={{ paddingRight: 10, color: "grey" }}
                  />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#acadaf"
                    onChangeText={handleEmailChange}
                    value={email}
                    style={styles.inputInner}
                  />
                  {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email !== "" ? (
                    <SvgXml xml={doubleCheckSvg} />
                  ) : (
                    <SvgXml xml={infoIconSvg} />
                  )}
                </View>
              </View>
              <View style={styles.formItem}>
                <View style={styles.input}>
                  <Icon
                    name="lock"
                    size={20}
                    style={{ paddingRight: 10, color: "grey" }}
                  />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#acadaf"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={handlePasswordChange}
                    value={password}
                    style={styles.inputInner}
                  />
                  <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Text>
                      {isPasswordVisible ? (
                        <Ionicons
                          name="eye-outline"
                          size={20}
                          style={{ paddingRight: 10, color: "grey" }}
                        />
                      ) : (
                        <Ionicons
                          name="eye-off-outline"
                          size={20}
                          style={{ paddingRight: 10, color: "grey" }}
                        />
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
        <View>
          <Text style={styles.terms}>Forgot password ?</Text>
        </View>
        <View>
          <TouchableOpacity
            style={[
              styles.button,
              (email.trim() === "" || password.trim() === "" || isLoading) &&
                styles.disabledButton,
            ]}
            onPress={() => {
              const formData = {
                email,
                password,
              };
              handleLogin(formData);
            }}
            disabled={
              email.trim() === "" || password.trim() === "" || isLoading
            }
          >
            <Text style={{ fontSize: 18, color: "white" }}>
              {isLoading ? "Loading..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navToLogin}>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "grey" }}>
              New to ScribbleEase ?{" "}
              <Text style={styles.loginLink}>Register</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  img: {
    marginTop: 50,
    width: "100%",
    height: 300,
    objectFit: "contain",
  },
  container: {
    padding: 30,
    backgroundColor: "white",
    height: "100%",
  },
  header: {
    textAlign: "left",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 30,
  },
  subHeader: {
    marginTop: 10,
  },
  formContainer: {
    marginTop: 35,
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
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  inputInner: {
    width: "90%",
    fontSize: 15,
  },
  loginLink: {
    color: "#ff735c",
    fontWeight: "bold",
  },
  terms: {
    color: "#ff735c",
    textAlign: "right",
  },
  button: {
    marginTop: 20,
    color: "black",
    height: 60,
    backgroundColor: "#ff735c",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  navToLogin: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
});
