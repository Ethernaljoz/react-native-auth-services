import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";

const loginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const onSignInPress = async () => {
    await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((response) => {
        console.log(response);
        router.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
            <Text className="text-center text-4xl font-extrabold text-[#FF9100] ">
              LOGIN
            </Text>
          </View>
          <View className="mt-10 flex-col">
            <View className="space-y-3">
              <View>
                <Text className="text-lg">Email:</Text>
                <TextInput
                  autoCapitalize="none"
                  value={email}
                  placeholder="Email..."
                  onChangeText={(email) => setEmail(email)}
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
              className="w-full px-5 py-4 bg-[#FF9100]  rounded-full mt-5 "
              onPress={onSignInPress}
            >
              <Text className="text-white text-xl text-center">Login</Text>
            </Pressable>
          </View>
          <View className="mt-5 flex-row items-center justify-center">
            <Text className="text-base">You dont have an account ? </Text>
            <Pressable onPress={() => router.push("/register")}>
              <Text className="text-[#FF9100]  font-bold text-xl">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default loginScreen;
