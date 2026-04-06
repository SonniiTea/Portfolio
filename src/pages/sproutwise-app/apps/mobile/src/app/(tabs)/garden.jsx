import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Droplets, Sun, Plus } from "lucide-react-native";
import { useState, useEffect } from "react";

export default function MyGarden() {
  const insets = useSafeAreaInsets();
  const [gardenPlants, setGardenPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGarden();
  }, []);

  const fetchGarden = () => {
    fetch("/api/garden?userId=demo-user")
      .then((res) => res.json())
      .then((data) => {
        setGardenPlants(data.gardenPlants || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
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
            marginBottom: 4,
          }}
        >
          My Garden
        </Text>
        <Text style={{ fontSize: 16, color: "#6B7C59" }}>
          {gardenPlants.length} plants growing
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 84 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#6B7C59" }}>
              Loading your garden...
            </Text>
          </View>
        ) : gardenPlants.length === 0 ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Image
              source={{
                uri: "https://raw.createusercontent.com/7bd8d446-ccc9-496f-a4a8-b9f8996b04e7/",
              }}
              style={{ width: 100, height: 100, marginBottom: 16 }}
              contentFit="contain"
              transition={100}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#2F4F2F",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Your garden is empty!
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#6B7C59",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Add your first plant to start growing
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#9CAF88",
                borderRadius: 12,
                paddingVertical: 12,
                paddingHorizontal: 24,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Plus size={20} color="#fff" />
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                Add Plant
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ paddingHorizontal: 20, gap: 16 }}>
            {gardenPlants.map((plant) => (
              <TouchableOpacity
                key={plant.id}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 16,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={{
                      uri:
                        plant.image_url ||
                        plant.plant_image ||
                        "https://via.placeholder.com/120",
                    }}
                    style={{
                      width: 120,
                      height: 120,
                      backgroundColor: "#F5E6D3",
                    }}
                    contentFit="cover"
                    transition={100}
                  />
                  <View style={{ flex: 1, padding: 16 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        color: "#2F4F2F",
                        marginBottom: 4,
                      }}
                    >
                      {plant.nickname || plant.name}
                    </Text>
                    {plant.nickname && (
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#9CAF88",
                          marginBottom: 8,
                          fontStyle: "italic",
                        }}
                      >
                        {plant.name}
                      </Text>
                    )}
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6B7C59",
                        marginBottom: 8,
                      }}
                    >
                      Planted {formatDate(plant.planted_date)}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 12 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Droplets size={14} color="#9CAF88" />
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#6B7C59",
                            textTransform: "capitalize",
                          }}
                        >
                          {plant.water_needs}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Sun size={14} color="#C65D32" />
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#6B7C59",
                            textTransform: "capitalize",
                          }}
                        >
                          {plant.sun_requirement?.split(" ")[0]}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: insets.bottom + 84,
          right: 20,
          backgroundColor: "#C65D32",
          width: 60,
          height: 60,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Plus size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
