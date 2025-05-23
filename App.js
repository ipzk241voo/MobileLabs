import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import GuestStack from "./src/screens/GuestStack/GuestStack";
import AppStack from "./src/screens/AppStack/AppStack";
import { HomeScreen } from "./screens/HomeScreen/HomeScreen";
import MainStorageScreen from "./screens/MainStorage/MainStorageScreen";
import TextEditorScreen from "./screens/TextEditor/TextEditorScreen";

const Stack = createNativeStackNavigator();

const AppContent = () => {
    const { loggedInUser } = useAuth();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={loggedInUser ? "App" : "Guest"}
                screenOptions={{
                    headerStyle: { backgroundColor: "#232946" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold", fontSize: 22, letterSpacing: 1 },
                    contentStyle: { backgroundColor: "#16161a" },
                }}
            >
                <Stack.Screen name="Guest" component={GuestStack} options={{ headerShown: false }} />
                <Stack.Screen name="App" component={AppStack} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MainStorage" component={MainStorageScreen} options={{ title: "Main Storage" }} />
                <Stack.Screen name="TextEditor" component={TextEditorScreen} options={{ title: "Editor" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
