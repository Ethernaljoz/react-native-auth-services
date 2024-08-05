import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Redirect, router } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";


const index = () => {

   const { isSignedIn,signOut } = useAuth();
   const { user } = useUser();

   if (!isSignedIn) {
     return <Redirect href={"/welcome"} />;
   }
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center ">
        <Text className="text-3xl text-blue-600 mb-3">USER</Text>
        <View className="space-y-5">
          <Text className="text-xl">
            Email : {user?.emailAddresses[0].emailAddress}
          </Text>
        </View>

        <Pressable
          className=" px-10 py-3 bg-blue-600 rounded-lg mt-5 "
          onPress={() =>{
            signOut()
            router.replace("/login")
          }}
        >
            <Text className="text-white text-xl">Logout</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default index;
