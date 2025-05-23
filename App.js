import React from "react";
import { HomeScreen } from "./screens/HomeScreen/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainStorageScreen from "./screens/MainStorage/MainStorageScreen";
import TextEditorScreen from "./screens/TextEditor/TextEditorScreen";


const App = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: "#232946" },
                    headerTintColor: "#fff",
                    headerTitleStyle: { fontWeight: "bold", fontSize: 22, letterSpacing: 1 },
                    contentStyle: { backgroundColor: "#16161a" }, 
                }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MainStorage" component={MainStorageScreen} options={{ title: "Main Storage" }} />
                <Stack.Screen name="TextEditor" component={TextEditorScreen} options={{ title: "Editor" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
