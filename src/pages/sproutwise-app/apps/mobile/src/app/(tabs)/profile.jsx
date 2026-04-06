import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  User,
  MapPin,
  Droplets,
  Settings,
  Bell,
  HelpCircle,
  ChevronRight,
} from "lucide-react-native";

export default function Profile() {
  const insets = useSafeAreaInsets();

  const settingsOptions = [
    { icon: MapPin, label: "Growing Zone", value: "Zone 9b", color: "#9CAF88" },
    { icon: Droplets, label: "Water Reminders", value: "On", color: "#C65D32" },
    { icon: Bell, label: "Notifications", value: "Enabled", color: "#9CAF88" },
    { icon: Settings, label: "App Settings", value: "", color: "#6B7C59" },
    { icon: HelpCircle, label: "Help & Support", value: "", color: "#6B7C59" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: "#F5E6D3" }}>
      <StatusBar style="dark" />

      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 24,
          backgroundColor: "#F5E6D3",
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://raw.createusercontent.com/7bd8d446-ccc9-496f-a4a8-b9f8996b04e7/",
          }}
          style={{ width: 100, height: 100, marginBottom: 12 }}
          contentFit="contain"
          transition={100}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: "#2F4F2F",
            marginBottom: 4,
          }}
        >
          Happy Gardener
        </Text>
        <Text style={{ fontSize: 14, color: "#6B7C59" }}>
          Member since April 2026
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 84 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            gap: 12,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#C65D32",
                marginBottom: 4,
              }}
            >
              6
            </Text>
            <Text style={{ fontSize: 12, color: "#6B7C59" }}>Plants</Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#9CAF88",
                marginBottom: 4,
              }}
            >
              24
            </Text>
            <Text style={{ fontSize: 12, color: "#6B7C59" }}>Days Active</Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                color: "#C65D32",
                marginBottom: 4,
              }}
            >
              12
            </Text>
            <Text style={{ fontSize: 12, color: "#6B7C59" }}>Care Logs</Text>
          </View>
        </View>

        {/* Settings */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#2F4F2F",
            paddingHorizontal: 20,
            marginBottom: 12,
          }}
        >
          Settings
        </Text>

        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {settingsOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <TouchableOpacity
                key={index}
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
                  <IconComponent size={24} color={option.color} />
                  <Text style={{ fontSize: 16, color: "#2F4F2F" }}>
                    {option.label}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  {option.value && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#9CAF88",
                        fontWeight: "600",
                      }}
                    >
                      {option.value}
                    </Text>
                  )}
                  <ChevronRight size={20} color="#9CAF88" />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* About */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 24,
            backgroundColor: "#9CAF88",
            borderRadius: 16,
            padding: 20,
            alignItems: "center",
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
            🌱 Keep Growing!
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              textAlign: "center",
              lineHeight: 20,
            }}
          >
            You're doing great! Check the weather daily and keep your plants
            healthy.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
