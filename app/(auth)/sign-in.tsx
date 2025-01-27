import { Image, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'
import FormField from '@/components/FormField'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '@/lib/appwrite'

const SignIn = () => {

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);
    router.replace("/home");

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      // setUser(result);
      // setIsLogged(true);

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error:any) {
      Alert.alert("Error", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
    <ScrollView>
    <View
          className="w-full flex justify-center items-center h-full px-4 my-6"
        
        >
<Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
<Text className='text-2xl text-white text-semibold  font-semibold'>Log in to Aora</Text>
<FormField
            title="Email"
            value={form.email}
            handleChangeText={(e:any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e:any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />


<CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyle="mt-7 w-full"
            isLoading={isSubmitting}
          />
             <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href='sign-up'
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
      </View>
    </ScrollView>

   </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({})