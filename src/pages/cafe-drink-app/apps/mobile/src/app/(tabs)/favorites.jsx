import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FAFAF5",
        paddingTop: insets.top + 20,
        paddingHorizontal: 24,
      }}
    >
      <Text style={{ fontFamily: "PlayfairDisplay_400Regular", fontSize: 32 }}>
        Favorites
      </Text>
      <Text
        style={{
          fontFamily: "CrimsonText_400Regular",
          fontSize: 18,
          color: "#9A9A95",
          marginTop: 8,
        }}
      >
        Your personal collection of recipes.
      </Text>
    </View>
  );
}
