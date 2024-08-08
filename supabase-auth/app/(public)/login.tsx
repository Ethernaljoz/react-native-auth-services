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


const loginScreen = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const onSignInPress = async () => {
    setIsLoaded(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: emailAddress,
      password: password,
    });
    console.log(session);
    

    if (error) Alert.alert(error.message);
    router.replace("/");
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
              LOGIN
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
              onPress={onSignInPress}
            >
              {isLoaded ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Text className="text-white text-xl text-center">Login</Text>
              )}
            </Pressable>
          </View>
          <View className="mt-5 flex-row items-center justify-center">
            <Text className="text-base">You dont have an account ? </Text>
            <Pressable onPress={() => router.push("/register")}>
              <Text className="text-[#20bf6b] font-bold text-xl">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default loginScreen;
