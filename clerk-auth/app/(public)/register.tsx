import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";

interface dataInterface {
  email: string;
  password: string;
}

const registerScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
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
            <Text className="text-center text-4xl font-extrabold text-blue-600">
              Register
            </Text>
          </View>
          <View className="mt-10 flex-col">
            {!pendingVerification && (
              <>
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
                  className="w-full px-5 py-4 bg-blue-600 rounded-full mt-5 "
                  onPress={onSignUpPress}
                >
                  {!isLoaded ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text className="text-white text-xl text-center">
                      Register
                    </Text>
                  )}
                </Pressable>
              </>
            )}
            {pendingVerification && (
              <>
                <TextInput
                  value={code}
                  placeholder="Code..."
                  onChangeText={(code) => setCode(code)}
                  className="w-full mt-1 border border-slate-300 rounded-lg bg-slate-100 py-3 px-3 text-base"
                />
                <Pressable
                  className="w-full px-5 py-4 bg-blue-600 rounded-full mt-5 "
                  onPress={onPressVerify}
                >
                  {!isLoaded ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text className="text-white text-xl text-center">
                      Verify Email
                    </Text>
                  )}
                </Pressable>
              </>
            )}
          </View>
          <View className="mt-5 flex-row items-center justify-center">
            <Text className="text-base">You have already an account ? </Text>
            <Pressable onPress={() => router.replace("/login")}>
              <Text className="text-blue-600 font-bold text-xl">Sign in</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default registerScreen;
