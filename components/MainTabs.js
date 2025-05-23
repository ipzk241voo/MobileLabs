import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import MainScreen from "../screens/MainScreen";
import GoalsScreen from "../screens/GoalsScreen";
import { ClipboardList, Play, Settings } from "lucide-react-native";
import styled from "styled-components/native";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Clicker"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconColor = focused ? "#43A047" : "#BDBDBD";
                    switch (route.name) {
                        case "Clicker":
                            return <Play color={iconColor} size={28} />;
                        case "Goals":
                            return <ClipboardList color={iconColor} size={28} />;
                        case "Settings":
                            return <Settings color={iconColor} size={28} />;
                        default:
                            return null;
                    }
                },
                tabBarLabel: ({ focused }) => {
                    let label = "";
                    switch (route.name) {
                        case "Clicker":
                            label = "Клік";
                            break;
                        case "Goals":
                            label = "Цілі";
                            break;
                        case "Settings":
                            label = "Налашт.";
                            break;
                        default:
                            label = "";
                    }
                    return (
                        <TabLabel focused={focused}>{label}</TabLabel>
                    );
                },
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    height: 74,
                    paddingTop: 8,
                    shadowColor: "#000",
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    shadowOffset: { width: 0, height: -2 },
                    elevation: 8,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Clicker" component={MainScreen} />
            <Tab.Screen name="Goals" component={GoalsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

const TabLabel = styled.Text`
  font-size: 13px;
  margin-top: 2px;
  color: ${({ focused }) => (focused ? "#43A047" : "#BDBDBD")};
  font-weight: ${({ focused }) => (focused ? 700 : 500)};
  letter-spacing: 0.2px;
`;

export default MainTabs;
