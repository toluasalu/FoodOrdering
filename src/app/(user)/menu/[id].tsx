import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from "@assets/data/products";
import { defaultPizzaImage } from '@/components/ProductListIItem';
import Button from '@/components/Button';
import { CartContext } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetails = () => {

    const router = useRouter();
    const { id } = useLocalSearchParams();
    const { addItem } = useContext(CartContext);
    const product = products.find((p) => p.id.toString() === id);
    const [selectedSize, setSelectedSize] = useState<PizzaSize>('S');

    const addToCart = () => {
        if (!product) {
            return;
        }
        addItem(product, selectedSize);
        router.push('/cart');
    };
    if (!product) {
        return <Text>Product not found</Text>;
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image source={{ uri: product.image || defaultPizzaImage }} style={styles.img} />
            <Text>Select Size</Text>
            <View style={{ marginVertical: 10, flexDirection: "row", justifyContent: "space-around" }}>
                {sizes.map(size =>
                    <Pressable onPress={() => setSelectedSize(size)} key={size.charAt(0)} style={[styles.size, { backgroundColor: selectedSize === size ? 'gainsboro' : 'white' }]}>
                        <Text style={[styles.sizeTxt, { color: selectedSize === size ? 'black' : 'grey' }]}>{size}</Text>
                    </Pressable>
                )}

            </View>
            <Text style={styles.price}>{product.price}</Text>
            <Button text='Add to cart' onPress={addToCart} />
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
    },
    size: {
        backgroundColor: "gainsboro",
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sizeTxt: {
        fontSize: 20,
        fontWeight: "500"
    }
});


export default ProductDetails