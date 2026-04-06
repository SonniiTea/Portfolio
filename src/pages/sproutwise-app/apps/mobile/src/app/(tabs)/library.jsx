import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Search, ChevronRight } from "lucide-react-native";
import { useState, useEffect } from "react";

export default function PlantLibrary() {
  const insets = useSafeAreaInsets();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    fetchPlants();
  }, [selectedType, search]);

  const fetchPlants = () => {
    let url = "/api/plants?";
    if (selectedType) url += `type=${selectedType}&`;
    if (search) url += `search=${search}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPlants(data.plants || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const plantTypes = [
    { label: "All", value: null },
    { label: "Vegetables", value: "vegetable" },
    { label: "Fruits", value: "fruit" },
    { label: "Herbs", value: "herb" },
    { label: "Flowers", value: "flower" },
  ];

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
          Plant Library
        </Text>

        {/* Search Bar */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 12,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 10,
            marginBottom: 12,
          }}
        >
          <Search size={20} color="#9CAF88" />
          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 16,
              color: "#2F4F2F",
              outlineStyle: "none",
            }}
            placeholder="Search plants..."
            placeholderTextColor="#9CAF88"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ gap: 8 }}
        >
          {plantTypes.map((type) => (
            <TouchableOpacity
              key={type.label}
              onPress={() => setSelectedType(type.value)}
              style={{
                backgroundColor:
                  selectedType === type.value ? "#9CAF88" : "#fff",
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor:
                  selectedType === type.value ? "#9CAF88" : "#E5E7EB",
              }}
            >
              <Text
                style={{
                  color: selectedType === type.value ? "#fff" : "#6B7C59",
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 84,
          paddingHorizontal: 20,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#6B7C59" }}>
              Loading plants...
            </Text>
          </View>
        ) : plants.length === 0 ? (
          <View style={{ padding: 40, alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: "#6B7C59" }}>
              No plants found
            </Text>
          </View>
        ) : (
          plants.map((plant) => (
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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{
                    uri: plant.image_url || "https://via.placeholder.com/80",
                  }}
                  style={{ width: 80, height: 80, backgroundColor: "#F5E6D3" }}
                  contentFit="cover"
                  transition={100}
                />
                <View style={{ flex: 1, padding: 12 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: "#2F4F2F",
                      marginBottom: 2,
                    }}
                  >
                    {plant.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#9CAF88",
                      fontStyle: "italic",
                      marginBottom: 4,
                    }}
                  >
                    {plant.scientific_name}
                  </Text>
                  <Text
                    style={{ fontSize: 13, color: "#6B7C59", lineHeight: 18 }}
                    numberOfLines={2}
                  >
                    {plant.description}
                  </Text>
                </View>
                <ChevronRight
                  size={20}
                  color="#9CAF88"
                  style={{ marginRight: 12 }}
                />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}
