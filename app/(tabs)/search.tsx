import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import seed from "@/lib/seed";
import useAppwrite from "@/lib/useAppwrite";
import { getCategories, getMenu } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    query: string;
    category: string;
  }>();
  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category,
      query,
      limit: 6,
    },
  });
  const { data: categories } = useAppwrite({ fn: getCategories });
  console.log(JSON.stringify(data, null, 2));

  useEffect(() => {
    refetch({ category, query, limit: 6 });
  }, [category, query]);
  return (
    <SafeAreaView>
      <View>
        <Text>Search</Text>
      </View>

      <Button
        title="Seed"
        onPress={() =>
          seed().catch((error) =>
            console.log("Failed to seed the database.", error)
          )
        }
      ></Button>
    </SafeAreaView>
  );
};

export default Search;
