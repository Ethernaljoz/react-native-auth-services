import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useContext, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Redirect, router } from "expo-router";
import { supabase } from "@/Supabase";
import { AuthContext } from "@/context/AuthContext";

const index = () => {
  const { session } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  const onSignOutPress = async () => {
    setIsLoaded(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    setIsLoaded(false);
    router.replace("/login");
  };

  if (!session || !session?.user) {
    return <Redirect href={"/welcome"} />;
  }

  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center ">
        <Text className="text-3xl text-blue-600 mb-3">USER</Text>
        <View className="space-y-5">
          <Text className="text-xl">Id : {session.user.id}</Text>
          <Text className="text-xl">Email : {session.user.email}</Text>
        </View>

        <Pressable
          className=" px-10 py-3 bg-[#20bf6b] rounded-lg mt-5 "
          onPress={onSignOutPress}
        >
          {isLoaded ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text className="text-white text-xl text-center">Logout</Text>
          )}
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default index;
