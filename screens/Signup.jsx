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
import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { SvgXml } from "react-native-svg";

const Signup = () => {
  const navigation = useNavigation();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const validateEmail = (email) => {
    setValue("email", email, { shouldValidate: true });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSignup = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${config.hostedURL}/user/signup`,
        data
      );
      Alert.alert("signup successful");
      reset();
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred during signup. Please try again later."
      );
    } finally{
      setIsLoading(false)
    }
  };
  

  const anyFieldBlank = () => {
    const fieldValues = Object.values(getValues());
    return fieldValues.some((value) => value.trim() === "") || !passwordsMatch || isLoading; // Check for empty strings
  };

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

  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] =
    useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => navigation.navigate("OnboardingScreen")}
        ></Pressable>
        <View>
          <Image source={require("../images/signup.jpg")} style={styles.img} />
        </View>
        <View>
          <Text style={styles.header}>Sign Up</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.formItem}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.input}>
                  <Ionicons
                    name="person"
                    size={20}
                    style={{ paddingRight: 10, color: "grey" }}
                  />
                  <TextInput
                    placeholder="Fullname"
                    placeholderTextColor="#acadaf"
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    value={value}
                    style={styles.inputInner}
                  />
                </View>
              )}
              name="fullname"
              rules={{ required: true }}
            />
          </View>
          <View style={styles.formItem}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.input}>
                  <Icon
                    name="email"
                    size={20}
                    style={{ paddingRight: 10, color: "grey" }}
                  />
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="#acadaf"
                    keyboardType="email-address"
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value);
                      validateEmail(value);
                    }}
                    value={value}
                    style={styles.inputInner}
                  />
                  {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value !== "" ? (
                    <SvgXml xml={doubleCheckSvg} />
                  ) : (
                    <SvgXml xml={infoIconSvg} />
                  )}
                </View>
              )}
              name="email"
              rules={{ required: true }}
            />
          </View>
          <View style={styles.formItem}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
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
                    onBlur={onBlur}
                    onChangeText={(value) => onChange(value)}
                    value={value}
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
              )}
              name="password"
              rules={{ required: true }}
            />
          </View>
          <View style={styles.formItem}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.input}>
                  <Icon
                    name="lock"
                    size={20}
                    style={{ paddingRight: 10, color: "grey" }}
                  />
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#acadaf"
                    secureTextEntry={!isConfirmPasswordVisible}
                    onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value);
                      // Check for password match
                      if (value === getValues("password")) {
                        setPasswordsMatch(true);
                      } else {
                        setPasswordsMatch(false);
                      }
                    }}
                    value={value}
                    style={styles.inputInner}
                  />
                  <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                    <Text>
                      {isConfirmPasswordVisible ? (
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
              )}
              name="confirmPassword"
              rules={{ required: true }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.terms}>
            By signing up you agree to our{" "}
            <Text style={styles.loginLink}>Terms and Conditions</Text> and{" "}
            <Text style={styles.loginLink}>Privacy Policy</Text>
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={[styles.button, anyFieldBlank() && styles.disabledButton]}
            onPress={() => {
              const formData = {
                fullname: getValues("fullname"),
                email: getValues("email"),
                password: getValues("password"),
              };
              handleSignup(formData); // Call the handleSignup function when the Text component is pressed
            }}
            disabled={anyFieldBlank()}
          >
            <Text style={{ fontSize: 18, color: "white" }}>
              {isLoading ? "Loading..." : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navToLogin}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "grey" }}>
              Joined us before? <Text style={styles.loginLink}>Login</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  arrowIcon: {
    marginTop: 30,
    marginBottom: 10,
  },
  img: {
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
    color: "#27a9ff",
    fontWeight: "bold",
  },
  terms: {
    color: "grey",
  },
  loginLink: {
    color: "#ff735c",
    fontWeight: "bold",
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
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "grey",
  },
});
