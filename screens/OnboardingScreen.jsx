import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const OnboardingScreen = () => {
  const navigate = useNavigation();

  const DotComponent = ({ selected }) => {
    return (
      <View style={[styles.dot, selected && styles.activeDot]}>
        <View></View>
      </View>
    );
  };

  return (
    <Onboarding
      onSkip={() => navigate.navigate("Login")}
      onDone={() => navigate.navigate("Login")}
      showDone={true}
      DotComponent={DotComponent}
      titleStyles={styles.title}
      subtitleStyles={styles.subtitle}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../images/notes2.jpg")}
              style={styles.img}
            />
          ),
          title: "Welcome to ScribbleEase",
          subtitle:
            "Unlock Your Creativity and Express Yourself Anytime, Anywhere with Ease.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../images/notes1.jpg")}
              style={styles.img}
            />
          ),
          title: "Create Notes Effortlessly",
          subtitle:
            "Effortlessly Capture Your Ideas with Simple and Intuitive Note Creation.",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../images/notes3.jpg")}
              style={styles.img}
            />
          ),
          title: "Stay Organized",
          subtitle:
            "Seamlessly Customize, Categorize, and Instantly Find Your Important Notes.",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: "100%",
    height: 400,
    objectFit: "contain",
  },
  title: {
    fontWeight: "bold",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
    transition: "width 0.3s, background-color 0.3s", // Add transition properties
  },
  activeDot: {
    backgroundColor: "#f56565",
    width: 50, // Increase width for active dot
  },
});
