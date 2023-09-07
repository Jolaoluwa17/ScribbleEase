import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  OnboardingScreen,
  Home,
  Signup,
  Login,
  AddNote,
  EditNote,
} from "./screens";
import { UserProvider, useUser } from "./context/UserContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [initialRouteName, setInitialRouteName] = useState("");
  useEffect(() => {
    // Check if email and username are stored
    AsyncStorage.multiGet(["userEmail", "userName"]).then((data) => {
      const [email, name] = data.map((item) => item[1]);
      if (email && name) {
        // Both email and name are stored, navigate to Login
        setInitialRouteName("Login");
      } else {
        setInitialRouteName("OnboardingScreen");
      }
    });
  }, []);


  return (
    <UserProvider>
      <NavigationContainer>
        {initialRouteName && (
          <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen
              options={{ headerShown: false }}
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Signup"
              component={Signup}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="AddNote"
              component={AddNote}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="EditNote"
              component={EditNote}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </UserProvider>
  );
}
