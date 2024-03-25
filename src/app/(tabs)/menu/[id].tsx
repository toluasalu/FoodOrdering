import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from "@assets/data/products";
import { defaultPizzaImage } from '@/components/ProductListIItem';

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetails = () => {

    const { id } = useLocalSearchParams();
    const product = products.find((p) => p.id.toString() === id);

    if (!product) {
        return <Text>Product not found</Text>;
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.img} />
            <Text>Select Size</Text>
            <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-around" }}>
                {sizes.map(size => <Text key={size.charAt(0)}>{size}</Text>)}
            </View>
            <Text style={styles.price}>{product.price}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        padding: 10
    },
    img: {
        width: "100%",
        aspectRatio: 1,
    },
    price: {
        fontSize: 18,
        fontWeight: "bold"
    }
});


export default ProductDetails