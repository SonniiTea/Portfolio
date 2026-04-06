import { Tabs } from "expo-router";
import { Home, Search, Heart, User } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FAFAF5",
          borderTopWidth: 1,
          borderColor: "#E5E5E0",
          paddingTop: 8,
          // height removed for iOS compliance
        },
        tabBarActiveTintColor: "#1A1A1A",
        tabBarInactiveTintColor: "#9A9A95",
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "CrimsonText_400Regular",
          textTransform: "uppercase",
          letterSpacing: 1,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Search color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <Heart color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
