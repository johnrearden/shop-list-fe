import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

import { CustomButton } from "../../components/CustomButton";
import { FormField } from "../../components/FormField";
import { useAuthContext } from '../../contexts/AuthProvider';
import axios from "axios";


const SignIn = () => {
  const { user, setUser} = useAuthContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const submit = async () => {
    if (formData.email === "" || formData.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const { data } = await axios.post('/dj-rest-auth/login/', formData);
      setUser(data);
      Alert.alert("Success", "User signed in successfully");
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
            Log in to Lists
          </Text>

          <FormField
            title="Username"
            value={formData.username}
            handleChangeText={(e) => setForm({ ...formData, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Password"
            value={formData.password}
            handleChangeText={(e) => setForm({ ...formData, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;