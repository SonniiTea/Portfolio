import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Droplets, Sun, Cloud, Sprout } from "lucide-react-native";
import { useState, useEffect } from "react";

export default function Home() {
  const insets = useSafeAreaInsets();
  const [weather, setWeather] = useState(null);
  const [gardenCount, setGardenCount] = useState(0);

  useEffect(() => {
    // Fetch user's garden count
    fetch("/api/garden?userId=demo-user")
      .then((res) => res.json())
      .then((data) => setGardenCount(data.gardenPlants?.length || 0))
      .catch((err) => console.error(err));

    // Fetch weather for demo location
    fetch("/integrations/weather-by-city/weather/San Francisco")
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F5E6D3" }}>
      <StatusBar style="dark" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: 84,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Mascot Greeting */}
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 24,
          }}
        >
          <Image
            source={{
              uri: "https://raw.createusercontent.com/7bd8d446-ccc9-496f-a4a8-b9f8996b04e7/",
            }}
            style={{ width: 120, height: 120, marginBottom: 12 }}
            contentFit="contain"
            transition={100}
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: "700",
              color: "#2F4F2F",
              marginBottom: 4,
            }}
          >
            Welcome Back!
          </Text>
          <Text style={{ fontSize: 16, color: "#6B7C59", textAlign: "center" }}>
            Your garden is growing beautifully 🌱
          </Text>
        </View>

        {/* Weather Widget */}
        {weather && (
          <View
            style={{
              marginHorizontal: 20,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 20,
              marginBottom: 16,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: "#2F4F2F",
                    marginBottom: 4,
                  }}
                >
                  {weather.location?.name}
                </Text>
                <Text style={{ fontSize: 14, color: "#9CAF88" }}>
                  {weather.current?.condition?.text}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{ fontSize: 42, fontWeight: "700", color: "#C65D32" }}
                >
                  {Math.round(weather.current?.temp_f)}°
                </Text>
                <Text style={{ fontSize: 14, color: "#6B7C59" }}>
                  Feels like {Math.round(weather.current?.feelslike_f)}°
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", marginTop: 16, gap: 12 }}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Droplets size={20} color="#9CAF88" />
                <Text style={{ fontSize: 12, color: "#6B7C59", marginTop: 4 }}>
                  {weather.current?.humidity}%
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Sun size={20} color="#C65D32" />
                <Text style={{ fontSize: 12, color: "#6B7C59", marginTop: 4 }}>
                  UV {weather.current?.uv}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Cloud size={20} color="#9CAF88" />
                <Text style={{ fontSize: 12, color: "#6B7C59", marginTop: 4 }}>
                  {weather.current?.wind_mph} mph
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Quick Actions */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#2F4F2F",
            paddingHorizontal: 20,
            marginBottom: 12,
          }}
        >
          Quick Actions
        </Text>

        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            gap: 12,
            marginBottom: 24,
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#9CAF88",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
            }}
          >
            <Sprout size={28} color="#fff" />
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "600",
                marginTop: 8,
              }}
            >
              Add Plant
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#C65D32",
              borderRadius: 12,
              padding: 16,
              alignItems: "center",
            }}
          >
            <Droplets size={28} color="#fff" />
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: "600",
                marginTop: 8,
              }}
            >
              Water Log
            </Text>
          </TouchableOpacity>
        </View>

        {/* Garden Summary */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "#fff",
            borderRadius: 16,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 3,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#2F4F2F",
              marginBottom: 12,
            }}
          >
            Your Garden
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 32, fontWeight: "700", color: "#C65D32" }}
              >
                {gardenCount}
              </Text>
              <Text style={{ fontSize: 14, color: "#6B7C59" }}>
                Plants Growing
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#F5E6D3",
                borderRadius: 50,
                width: 60,
                height: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sprout size={32} color="#9CAF88" />
            </View>
          </View>
        </View>

        {/* Gardening Tip */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 16,
            backgroundColor: "#9CAF88",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: "#fff",
              marginBottom: 8,
            }}
          >
            💡 Today's Tip
          </Text>
          <Text style={{ fontSize: 14, color: "#fff", lineHeight: 20 }}>
            Morning is the best time to water your plants. The cooler
            temperature allows water to soak into the soil before evaporating.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
