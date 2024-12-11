
import { View, Text, FlatList } from 'react-native'
import orders from '@assets/data/orders'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import OrderListItem from '@/components/OrderListItem'
import OrderItemListItem from '@/components/OrderItemListItem'

const OrderDetails = () => {
    const { id } = useLocalSearchParams();

    const order = orders.find((o) => o.id.toString() === id);

    if (!order) {
        return <Text>Not found</Text>;
    }

    return (
        <View style={{ padding: 10, gap: 20, flex: 1 }}>
            <Stack.Screen options={{ title: `Order #${id}` }} />

            <FlatList
                data={order.order_items}
                contentContainerStyle={{ gap: 10 }}
                renderItem={({ item }) => <OrderItemListItem item={item} />}
                ListHeaderComponent={() => <OrderListItem order={order} />}
            />
        </View>
    )
}

export default OrderDetails