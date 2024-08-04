import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { AuthContext } from "@/context/AuthContext";
import { Redirect } from "expo-router";


const index = () => {
  const { userInfo, logout, loading } = useContext(AuthContext)
  if(!userInfo.email){
    return <Redirect href={"/welcome"} />
  }
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center ">
        <Text className="text-3xl text-blue-600 mb-3">USER</Text>
        <View className="space-y-5">
          <Text className="text-xl">User Id : {userInfo.id}</Text>
          <Text className="text-xl">Username : {userInfo.username}</Text>
          <Text className="text-xl">Email : {userInfo.email}</Text>
        </View>

        <Pressable
          className=" px-10 py-3 bg-blue-600 rounded-lg mt-5 "
          onPress={logout}
        >
           {
                loading ? <ActivityIndicator size="large" color="white" /> :
          <Text className="text-white text-xl">Logout</Text>}
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default index;
