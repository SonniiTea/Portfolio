import { View, Text, ScrollView, Pressable, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { drinks } from "@/data/drinks";
import Transition from "react-native-screen-transitions";
import { Clock, Coffee, Sparkles, Search } from "lucide-react-native";
import { useRef, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const categories = ["All", "Coffee & Tea", "Refreshers"];

  return (
    <LinearGradient
      colors={["#FFE5F1", "#FFF4E0", "#E0F4FF"]}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ paddingHorizontal: 24, opacity: fadeAnim }}>
          {/* Header */}
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 100,
              alignSelf: "flex-start",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <Sparkles size={18} color="#FF6B9D" />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: "#FF6B9D",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Your Happy Place
            </Text>
          </View>

          <Text
            style={{
              fontSize: 48,
              fontWeight: "bold",
              color: "#2D3748",
              marginBottom: 12,
              lineHeight: 52,
            }}
          >
            Cafe Vibes ☕✨
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: "#4A5568",
              marginBottom: 32,
              lineHeight: 26,
              fontWeight: "500",
            }}
          >
            Colorful drinks, happy moments! 🌈
          </Text>

          {/* Search Bar */}
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 100,
              paddingHorizontal: 20,
              paddingVertical: 16,
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <Search size={20} color="#9CA3AF" />
            <Text style={{ color: "#9CA3AF", fontSize: 16, fontWeight: "500" }}>
              Search for yummy drinks...
            </Text>
          </View>

          {/* Categories */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 32, flexGrow: 0 }}
          >
            {categories.map((cat, i) => (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={{
                  marginRight: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 100,
                  backgroundColor:
                    activeCategory === cat
                      ? "#FF6B9D"
                      : "rgba(255, 255, 255, 0.8)",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: activeCategory === cat ? 0.2 : 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "bold",
                    color: activeCategory === cat ? "#FFFFFF" : "#4A5568",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Drink List */}
          <View style={{ gap: 24 }}>
            {drinks.map((drink, idx) => (
              <Pressable
                key={drink.id}
                onPress={() =>
                  router.push({
                    pathname: `/drink/${drink.id}`,
                    params: { id: drink.id, tag: `drink-${drink.id}` },
                  })
                }
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 24,
                  padding: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.15,
                  shadowRadius: 12,
                  elevation: 5,
                }}
              >
                <Transition.View
                  sharedBoundTag={`drink-${drink.id}`}
                  style={{
                    width: "100%",
                    aspectRatio: 4 / 3,
                    borderRadius: 16,
                    overflow: "hidden",
                    marginBottom: 16,
                  }}
                >
                  <Image
                    source={{ uri: drink.image }}
                    style={{ flex: 1 }}
                    contentFit="cover"
                    transition={500}
                  />
                  <View
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      backgroundColor: "#FF6B9D",
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderRadius: 100,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      {drink.category}
                    </Text>
                  </View>
                </Transition.View>

                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: "#2D3748",
                    marginBottom: 8,
                  }}
                >
                  {drink.name}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#4A5568",
                    lineHeight: 22,
                    marginBottom: 16,
                    fontWeight: "500",
                  }}
                >
                  {drink.description}
                </Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      backgroundColor: "#FFF4E0",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 100,
                    }}
                  >
                    <Clock size={14} color="#FFB347" />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#2D3748",
                      }}
                    >
                      {drink.time}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 6,
                      backgroundColor: "#E0F4FF",
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 100,
                    }}
                  >
                    <Coffee size={14} color="#4299E1" />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: "#2D3748",
                      }}
                    >
                      {drink.difficulty}
                    </Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}
