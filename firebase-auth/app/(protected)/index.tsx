import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Redirect, router } from "expo-router";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebaseConfig";

const index = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(FIREBASE_AUTH, (user: any) => {
      setUser(user);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!user?.email) {
    return <Redirect href={"/welcome"} />;
  }
  console.log(user);

  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center ">
        <Text className="text-3xl text-blue-600 mb-3">USER</Text>
        <View className="space-y-5">
          <Text className="text-xl">Email : {user?.email}</Text>
        </View>

        <Pressable
          className=" px-10 py-3 bg-blue-600 rounded-lg mt-5 "
          onPress={() => {
            getAuth()
              .signOut()
              .then(() => console.log("User signed out!"));
            router.replace("/login");
          }}
        >
          <Text className="text-white text-xl">Logout</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default index;
