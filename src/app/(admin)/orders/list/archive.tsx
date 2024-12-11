import { View, Text, FlatList } from 'react-native'
import orders from '@assets/data/orders'
import React from 'react'
import OrderListItem from '@/components/OrderListItem'
import { Stack } from 'expo-router'

export default function ArchiveScreen() {
    return (
        <>
            <FlatList
                data={orders}
                contentContainerStyle={{ gap: 10, padding: 10 }}
                renderItem={({ item }) => <OrderListItem order={item} />}
            />
        </>
    )
}