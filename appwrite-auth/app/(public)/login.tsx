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
import React, { useContext, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { account } from "@/Appwrite";
import { AuthContext } from "@/context/AuthContext";



const loginScreen = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const { setSession } = useContext(AuthContext)

  const onSignInPress = async () => {
    setIsLoaded(true);
    try {
      const response = await account.createEmailPasswordSession(emailAddress, password)
      if(response){
        const user = await account.get();
          setSession(user)
          router.replace("/");
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoaded(false);
    }
    
    
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
            <Text className="text-center text-4xl font-extrabold text-[#f02d65]">
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
              className="w-full px-5 py-4 bg-[#f02d65] rounded-full mt-5 "
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
              <Text className="text-[#f02d65] font-bold text-xl">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default loginScreen;
