import { getCurrentUser } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import useAuthStore from "@/store/auth.store";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import { account } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";

const Profile = () => {
  const { user, setUser, setIsAuthenticated } = useAuthStore();
  const { data: currentUser } = useAppwrite({ fn: getCurrentUser });

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
    } catch (e: any) {
      Alert.alert("Error", e.message);
      Sentry.captureEvent(e);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="items-center mb-8">
        <View className="relative">
          <Image
            source={{ uri: currentUser?.avatar || user?.avatar }}
            className="w-24 h-24 rounded-full"
          />
          <TouchableOpacity className="absolute -bottom-1 right-1 bg-primary p-1 rounded-full">
            <Image source={icons.pencil} className="w-5 h-5" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white rounded-2xl p-5 mx-10 shadow-lg shadow-black/10">
        <View className="flex-row items-center space-x-4 mb-4">
          <View className="bg-orange-100 p-2 rounded-full mr-2">
            <Image
              source={icons.person}
              className="w-5 h-5"
              style={{ tintColor: "#FE8C00" }}
            />
          </View>
          <View>
            <Text className="text-xs text-gray-500">Full Name</Text>
            <Text className="text-base text-black font-semibold">
              {currentUser?.name}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-4 mb-4">
          <View className="bg-orange-100 p-2 rounded-full mr-2">
            <Image
              source={icons.envelope}
              className="w-5 h-5"
              style={{ tintColor: "#FE8C00" }}
            />
          </View>
          <View>
            <Text className="text-xs text-gray-500">Email</Text>
            <Text className="text-base text-black font-semibold">
              {currentUser?.email}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-4 mb-4">
          <View className="bg-orange-100 p-2 rounded-full mr-2">
            <Image
              source={icons.phone}
              className="w-5 h-5"
              style={{ tintColor: "#FE8C00" }}
            />
          </View>
          <View>
            <Text className="text-xs text-gray-500">Phone Number</Text>
            <Text className="text-base text-black font-semibold">
              +1 234 567 8910
            </Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-4 mb-4">
          <View className="bg-orange-100 p-2 rounded-full mr-2">
            <Image
              source={icons.location}
              className="w-5 h-5"
              style={{ tintColor: "#FE8C00" }}
            />
          </View>
          <View>
            <Text className="text-xs text-gray-500">Address 1 - (Home)</Text>
            <Text className="text-base text-black font-semibold">
              123 Main Street, Springfield
            </Text>
          </View>
        </View>

        <View className="flex-row items-center space-x-4">
          <View className="bg-orange-100 p-2 rounded-full mr-2">
            <Image
              source={icons.location}
              className="w-5 h-5"
              style={{ tintColor: "#FE8C00" }}
            />
          </View>
          <View>
            <Text className="text-xs text-gray-500">Address 2 - (Work)</Text>
            <Text className="text-base text-black font-semibold">
              123 Not Main Street, WinterField
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className="border border-primary bg-orange-100 rounded-full py-3 mt-6 mx-10">
        <Text className="text-center text-primary font-semibold">
          Edit Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="border border-red-600 bg-red-100 rounded-full py-3 mt-3 flex-row justify-center items-center space-x-2 mx-10"
        onPress={handleLogout}
      >
        <Image
          source={icons.logout}
          className="w-4 h-4"
          style={{ tintColor: "#dc2626" }}
        />
        <Text className="text-center text-red-600 font-semibold">Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
