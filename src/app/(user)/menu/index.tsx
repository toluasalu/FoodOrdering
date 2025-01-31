import { View, FlatList, ActivityIndicator, Text } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListIItem";
import { useProductList } from "@/api/products";

export default function MenuScreen() {
  const { data, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
      numColumns={2}
    />
  );
}
