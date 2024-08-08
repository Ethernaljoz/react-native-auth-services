import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { supabase } from "@/Supabase";


const registerScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const onSignUpPress = async () => {
    setIsLoaded(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: emailAddress,
      password: password,
    });
    
    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    router.replace('/')
    setIsLoaded(false);
  };

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="pt-36 flex-col">
          <View className="items-center">
            <Image
              source={require("@/assets/images/splash.png")}
              style={{ width: width * 0.4, height: height * 0.2 }}
            />
            <Text className="text-center text-4xl font-extrabold text-[#20bf6b]">
              Register
            </Text>
          </View>
          <View className="mt-10 flex-col">
            <View className="space-y-3">
              <View>
                <Text className="text-lg">Email:</Text>
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Email..."
                  onChangeText={(email) => setEmailAddress(email)}
                  className="w-full mt-1 border border-slate-300 rounded-lg bg-slate-100 py-3 px-3 text-base"
                />
              </View>
              <View>
                <Text className="text-lg">Password :</Text>
                <TextInput
                  value={password}
                  placeholder="Password..."
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                  className="w-full mt-1 border border-slate-300 rounded-lg bg-slate-100 py-3 px-3 text-base"
                />
              </View>
            </View>

            <Pressable
              className="w-full px-5 py-4 bg-[#20bf6b] rounded-full mt-5 "
              onPress={onSignUpPress}
            >
              {isLoaded ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text className="text-white text-xl text-center">Register</Text>
              )}
            </Pressable>
          </View>
          <View className="mt-5 flex-row items-center justify-center">
            <Text className="text-base">You have already an account ? </Text>
            <Pressable onPress={() => router.push("/login")}>
              <Text className="text-[#20bf6b] font-bold text-xl">Sign in</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default registerScreen;
