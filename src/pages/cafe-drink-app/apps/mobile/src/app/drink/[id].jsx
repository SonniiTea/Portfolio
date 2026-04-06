import { View, Text, ScrollView, Pressable, Animated } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { drinks } from "@/data/drinks";
import Transition from "react-native-screen-transitions";
import {
  ArrowLeft,
  Clock,
  Coffee,
  Check,
  Sparkles,
  Heart,
} from "lucide-react-native";
import { useState, useRef, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";

export default function DrinkDetailScreen() {
  const { id, tag } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const drink = drinks.find((d) => d.id === id);

  const [showUI, setShowUI] = useState(false);
  const uiOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUI(true);
      Animated.timing(uiOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  if (!drink) return null;

  return (
    <LinearGradient
      colors={["#FFE5F1", "#FFF4E0", "#E0F4FF"]}
      style={{ flex: 1 }}
    >
      {/* Header with back button */}
      {showUI && (
        <Animated.View
          style={{
            position: "absolute",
            top: insets.top,
            left: 0,
            right: 0,
            zIndex: 20,
            opacity: uiOpacity,
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 60,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              backgroundColor: "#FF6B9D",
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 100,
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <ArrowLeft size={18} color="#FFFFFF" />
            <Text
              style={{ color: "#FFFFFF", fontWeight: "bold", fontSize: 13 }}
            >
              BACK
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              width: 44,
              height: 44,
              borderRadius: 22,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <Heart size={20} color="#FF6B9D" />
          </Pressable>
        </Animated.View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        <Transition.View
          sharedBoundTag={tag}
          style={{
            width: "100%",
            aspectRatio: 4 / 3,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            overflow: "hidden",
          }}
        >
          <Image
            source={{ uri: drink.image }}
            style={{ flex: 1 }}
            contentFit="cover"
          />
          <View
            style={{
              position: "absolute",
              bottom: 16,
              right: 16,
              backgroundColor: "#FF6B9D",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 100,
            }}
          >
            <Text
              style={{
                fontSize: 11,
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

        <Animated.View style={{ padding: 24, opacity: uiOpacity }}>
          {/* Title Card */}
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 24,
              padding: 24,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontSize: 36,
                fontWeight: "bold",
                color: "#2D3748",
                marginBottom: 12,
                lineHeight: 40,
              }}
            >
              {drink.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#4A5568",
                lineHeight: 24,
                marginBottom: 20,
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
                  gap: 8,
                  backgroundColor: "#FFF4E0",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 100,
                  flex: 1,
                }}
              >
                <Clock size={18} color="#FFB347" />
                <Text
                  style={{ fontWeight: "bold", color: "#2D3748", fontSize: 13 }}
                >
                  {drink.time}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#E0F4FF",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  borderRadius: 100,
                  flex: 1,
                }}
              >
                <Coffee size={18} color="#4299E1" />
                <Text
                  style={{ fontWeight: "bold", color: "#2D3748", fontSize: 13 }}
                >
                  {drink.difficulty}
                </Text>
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 24,
              padding: 24,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#FF6B9D",
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Sparkles size={18} color="#FFFFFF" />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#2D3748",
                }}
              >
                What You'll Need
              </Text>
            </View>
            {drink.ingredients.map((item, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: i % 2 === 0 ? "#FFF4E0" : "#FFE5F1",
                  padding: 16,
                  borderRadius: 16,
                  marginBottom: 12,
                }}
              >
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: "#FF6B9D",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "bold" }}
                  >
                    {i + 1}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#2D3748",
                    flex: 1,
                    fontWeight: "500",
                  }}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>

          {/* Method */}
          <View
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              borderRadius: 24,
              padding: 24,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: "#4299E1",
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Coffee size={18} color="#FFFFFF" />
              </View>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#2D3748",
                }}
              >
                Let's Make It!
              </Text>
            </View>
            {drink.steps.map((step, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  gap: 16,
                  backgroundColor: i % 2 === 0 ? "#E0F4FF" : "#F0E7FF",
                  padding: 16,
                  borderRadius: 16,
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "bold",
                    color: "#4299E1",
                  }}
                >
                  {i + 1}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: "#2D3748",
                    lineHeight: 22,
                    flex: 1,
                    fontWeight: "500",
                  }}
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>

          {/* Completion */}
          <LinearGradient
            colors={["#FF6B9D", "#FFB347"]}
            style={{
              padding: 32,
              borderRadius: 24,
              alignItems: "center",
              gap: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 5,
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Check size={32} color="white" />
            </View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              You Did It! 🎉
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "rgba(255, 255, 255, 0.9)",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Time to enjoy your delicious creation!
            </Text>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}
