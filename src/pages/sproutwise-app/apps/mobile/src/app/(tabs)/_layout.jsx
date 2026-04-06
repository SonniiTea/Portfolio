import { Platform } from "react-native";
import {
  NativeTabs,
  Icon,
  Label,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <NativeTabs labelStyle={{ color: "#2F4F2F" }} tintColor="#9CAF88">
      <NativeTabs.Trigger name="index">
        <Label selectedStyle={{ color: "#9CAF88" }}>Home</Label>
        {Platform.select({
          ios: <Icon sf="house.fill" selectedColor="#9CAF88" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="home"
                  selectedColor="#9CAF88"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="garden">
        <Label selectedStyle={{ color: "#9CAF88" }}>My Garden</Label>
        {Platform.select({
          ios: <Icon sf="leaf.fill" selectedColor="#9CAF88" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="leaf"
                  selectedColor="#9CAF88"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="library">
        <Label selectedStyle={{ color: "#9CAF88" }}>Plants</Label>
        {Platform.select({
          ios: <Icon sf="book.fill" selectedColor="#9CAF88" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="library"
                  selectedColor="#9CAF88"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="weather">
        <Label selectedStyle={{ color: "#9CAF88" }}>Weather</Label>
        {Platform.select({
          ios: <Icon sf="cloud.sun.fill" selectedColor="#9CAF88" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="partly-sunny"
                  selectedColor="#9CAF88"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <Label selectedStyle={{ color: "#9CAF88" }}>Profile</Label>
        {Platform.select({
          ios: <Icon sf="person.fill" selectedColor="#9CAF88" />,
          default: (
            <Icon
              src={
                <VectorIcon
                  family={Ionicons}
                  name="person"
                  selectedColor="#9CAF88"
                />
              }
            />
          ),
        })}
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
