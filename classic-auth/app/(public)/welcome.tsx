import { View, Text, Image, Pressable, useWindowDimensions } from "react-native";
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons"
const welcomeScreen = () => {
    const router = useRouter();
    const {width, height} = useWindowDimensions()
  return (
    <ScreenWrapper>
      <View className="items-center ">
        <Image
          resizeMode="contain"
          source={require("@/assets/images/splash.png")}
          style={{ width, height: height * 0.6 }}
        />
        <View className="gap-5">
          <View className="items-center gap-2">
            <Text className="text-3xl font-bold text-blue-600 ">
              Authentication
            </Text>
            <Text className="text-base text-center">
              Welcome to authentication app features with AsyncStorage,
              React-hook-form, Rest api.
            </Text>
          </View>
          <View>
            <Pressable
              className="w-full px-5 py-5 bg-blue-600 rounded-full mt-3 justify-between flex-row items-center"
              onPress={() => router.push("/login")}
            >
              <Text className="text-white text-xl">Let's get started</Text>
              <Ionicons name="chevron-forward" size={30} color={"white"} />
            </Pressable>
            
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export default welcomeScreen