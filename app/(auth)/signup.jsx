import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import axios from 'axios';

import { CustomButton } from "../../components/CustomButton";
import { FormField } from "../../components/FormField";

const SignUp = () => {

  const [isSubmitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const submit = async () => {
    if (formData.username === "" || formData.password1 === "" || formData.password2 === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    try {
      await axios.post('/dj-rest-auth/registration/', formData);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Sign Up to Lists
          </Text>

          <FormField
            title="Username"
            value={formData.username}
            handleChangeText={(e) => setFormData({ ...formData, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Password1"
            value={formData.password1}
            handleChangeText={(e) => setFormData({ ...formData, password1: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Password2"
            value={formData.password2}
            handleChangeText={(e) => setFormData({ ...formData, password2: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;