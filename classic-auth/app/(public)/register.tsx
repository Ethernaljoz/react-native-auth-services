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

const registerScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { register, loading } = useContext(AuthContext);
    const onSubmit = (data: any) => {
      register(data);
    };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
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
            <View className="space-y-3">
              <View>
                <Text className="text-lg">Username :</Text>
                <Controller
                  name="username"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      className=" w-full border mt-1 border-slate-300 rounded-lg bg-slate-100 py-3 px-3 text-base"
                      placeholder="enter your name"
                    />
                  )}
                />
              </View>
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
                      autoCapitalize="none"
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
              onPress={ handleSubmit(onSubmit)}
            >
              {
                loading ? <ActivityIndicator size="large" color="white" /> :
              <Text className="text-white text-xl text-center">Register</Text>}
            </Pressable>
          </View>
          <View className="mt-5 flex-row items-center">
            <Text className="text-base">You have already an account ? </Text>
            <Pressable onPress={() => router.replace("/login")}>
              
              <Text className="text-blue-600 font-bold text-xl">
                Sign in
              </Text>
              
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default registerScreen;
