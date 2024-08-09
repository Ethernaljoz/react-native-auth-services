import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Redirect, router } from "expo-router";
import { AuthContext } from "@/context/AuthContext";
import { account } from "@/Appwrite";

const index = () => {
  const { session, setSession } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  if(!session || !session.email){
    return <Redirect href={"/welcome"} />
  }

  const onSignOutPress = async () => {
    setIsLoaded(true);
    const response = await account.deleteSession("current");
    setSession(null)
    console.log("Logout successful:", response);

    setIsLoaded(false);
    router.replace("/login");
  };


  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center ">
        <Text className="text-3xl text-[#f02d65] mb-3">USER</Text>
        <View className="space-y-5">
          <Text className="text-xl">Id : {session.$id}</Text>
          <Text className="text-xl">Email : {session.email}</Text>
        </View>

        <Pressable
          className=" px-10 py-3 bg-[#f02d65] rounded-lg mt-5 "
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
