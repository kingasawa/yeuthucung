import * as React from 'react';
import { View, StyleSheet, Text, ImageBackground, ScrollView, Button } from "react-native";
import { H3, YStack } from "tamagui";
import LessonCard from "@/components/LessonCard";
import { AIConfigModal } from "@/components/AIConfigModal";
import { useRef } from "react";
import { Link, useRouter } from "expo-router";

export default function App() {
  const router = useRouter()
  const bgImage = require('@/assets/images/bg4.png');
  const scrollViewRef = useRef<ScrollView>(null);

  return (
      <ImageBackground
        source={bgImage}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <Button title="map" onPress={() => router.replace("/map")} />
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 60,
    justifyContent: 'flex-start'
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  image: {
    width: 80,
    height: 80
  },
  scrollView: {
    paddingTop: 10,
    borderRadius: 15,
    marginBottom: 80
  },
});
