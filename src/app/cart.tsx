import { View, Text, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useContext } from 'react'
import { CartContext } from '@/providers/CartProvider';
import CartListItem from '@/components/CartListItem';
import Button from '@/components/Button';
import { Stack } from 'expo-router';



const CartScreen = () => {
    const { items, total } = useContext(CartContext);
    return (
        <View style={{
            padding: 10,
        }}>
            <Stack.Screen options={{ presentation: 'modal' }} />
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />

            <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "500" }}>Total: ${total}</Text>
            <Button text='Checkout' />

            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default CartScreen