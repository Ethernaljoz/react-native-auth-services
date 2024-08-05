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
import React, { useContext } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/AuthContext";


const loginScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { login, loading } = useContext(AuthContext)
  const onSubmit = (data: any) => {
    login(data)
  };
  const { control, handleSubmit,formState:{errors} } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })
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
              LOGIN
            </Text>
          </View>
          <View className="mt-10 flex-col">
            <View className="space-y-3">
              <View>
                <Text className="text-lg">Email:</Text>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      className="w-full mt-1 border border-slate-300 rounded-lg bg-slate-100 py-3 px-3 text-base"
                      placeholder="enter your name"
                    />
                  )}
                />
              </View>
              <View>
                <Text className="text-lg">Password :</Text>
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      className="w-full mt-1 border border-slate-300 rounded-lg bg-slate-100 py-3 px-3 text-base"
                      placeholder="enter your name"
                      secureTextEntry
                    />
                  )}
                />
              </View>
            </View>

            <Pressable
              className="w-full px-5 py-4 bg-blue-600 rounded-full mt-5 "
              onPress={handleSubmit(onSubmit)}
            >
              {
                loading ? <ActivityIndicator size="large" color="white" /> :
              <Text className="text-white text-xl text-center">Login</Text>
              }
            </Pressable>
          </View>
          <View className="mt-5 flex-row items-center">
            <Text className="text-base">You dont have an account ? </Text>
            <Pressable onPress={() => router.replace("/register")}>
              
              <Text className="text-blue-600 font-bold text-xl">
              Sign up
              </Text>
              
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default loginScreen;
