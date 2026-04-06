import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Cloud, Droplets, Wind, Eye, Gauge, Sun } from "lucide-react-native";
import { useState, useEffect } from "react";

export default function Weather() {
  const insets = useSafeAreaInsets();
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("San Francisco");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = () => {
    setLoading(true);
    fetch(`/integrations/weather-by-city/weather/${city}`)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const getGardeningAdvice = () => {
    if (!weather) return "";

    const temp = weather.current?.temp_f;
    const humidity = weather.current?.humidity;
    const uv = weather.current?.uv;

    if (temp > 85) return "🌡️ Hot day! Water plants in early morning or evening";
    if (temp < 40) return "❄️ Cold weather! Protect sensitive plants";
    if (humidity > 80) return "💧 High humidity - watch for fungal issues";
    if (uv > 7) return "☀️ High UV - great for sun-loving plants!";
    if (weather.current?.precip_mm > 0)
      return "🌧️ Rainy day - skip watering today";
    return "✅ Perfect conditions for gardening!";
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F5E6D3" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: "#F5E6D3",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "700",
            color: "#2F4F2F",
            marginBottom: 16,
          }}
        >
          Weather
        </Text>

        {/* City Search */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TextInput
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
              fontSize: 16,
              color: "#2F4F2F",
              outlineStyle: "none",
            }}
            placeholder="Enter city name..."
            placeholderTextColor="#9CAF88"
            value={city}
            onChangeText={setCity}
          />
          <TouchableOpacity
            onPress={fetchWeather}
            style={{
              backgroundColor: "#9CAF88",
              borderRadius: 12,
              paddingHorizontal: 20,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 84 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#6B7C59" }}>
              Loading weather...
            </Text>
          </View>
        ) : weather ? (
          <View style={{ paddingHorizontal: 20 }}>
            {/* Current Weather */}
            <View
              style={{
                backgroundColor: "#9CAF88",
                borderRadius: 20,
                padding: 24,
                marginBottom: 16,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: 4,
                }}
              >
                {weather.location?.name}
              </Text>
              <Text
                style={{ fontSize: 14, color: "#F5E6D3", marginBottom: 16 }}
              >
                {weather.location?.region}, {weather.location?.country}
              </Text>

              <Text
                style={{
                  fontSize: 72,
                  fontWeight: "700",
                  color: "#fff",
                  marginBottom: 8,
                }}
              >
                {Math.round(weather.current?.temp_f)}°
              </Text>

              <Text style={{ fontSize: 18, color: "#F5E6D3", marginBottom: 4 }}>
                {weather.current?.condition?.text}
              </Text>
              <Text style={{ fontSize: 14, color: "#F5E6D3" }}>
                Feels like {Math.round(weather.current?.feelslike_f)}°
              </Text>
            </View>

            {/* Gardening Advice */}
            <View
              style={{
                backgroundColor: "#C65D32",
                borderRadius: 16,
                padding: 20,
                marginBottom: 16,
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
                Gardening Advice
              </Text>
              <Text style={{ fontSize: 14, color: "#fff", lineHeight: 20 }}>
                {getGardeningAdvice()}
              </Text>
            </View>

            {/* Weather Details */}
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: "#2F4F2F",
                marginBottom: 12,
              }}
            >
              Details
            </Text>

            <View style={{ gap: 12 }}>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Droplets size={24} color="#9CAF88" />
                  <Text style={{ fontSize: 16, color: "#2F4F2F" }}>
                    Humidity
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#C65D32" }}
                >
                  {weather.current?.humidity}%
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Wind size={24} color="#9CAF88" />
                  <Text style={{ fontSize: 16, color: "#2F4F2F" }}>
                    Wind Speed
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#C65D32" }}
                >
                  {weather.current?.wind_mph} mph
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Sun size={24} color="#C65D32" />
                  <Text style={{ fontSize: 16, color: "#2F4F2F" }}>
                    UV Index
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#C65D32" }}
                >
                  {weather.current?.uv}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Eye size={24} color="#9CAF88" />
                  <Text style={{ fontSize: 16, color: "#2F4F2F" }}>
                    Visibility
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#C65D32" }}
                >
                  {weather.current?.vis_miles} mi
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Gauge size={24} color="#9CAF88" />
                  <Text style={{ fontSize: 16, color: "#2F4F2F" }}>
                    Pressure
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#C65D32" }}
                >
                  {weather.current?.pressure_in} in
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Cloud size={24} color="#9CAF88" />
                  <Text style={{ fontSize: 16, color: "#2F4F2F" }}>
                    Precipitation
                  </Text>
                </View>
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "#C65D32" }}
                >
                  {weather.current?.precip_in} in
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#6B7C59" }}>
              No weather data available
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
