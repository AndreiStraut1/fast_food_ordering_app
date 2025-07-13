import { View, Text } from "react-native";
import { Slot, Redirect } from "expo-router";
import "../globals.css";

export default function _layout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  return <Slot />;
}
