/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const orders = [
    {
        id: '1',
        name: 'Nikhil Agarwal',
        avatar: 'https://via.placeholder.com/50',
        orderId: 'C7OqMbdH2C8N9j9nNeK',
        items: [
            { name: 'Idli', quantity: 1, price: 120 },
        ],
        total: 146,
        earned: 114,
        status: 'Delivered',
        date: 'Jan 8, 2023, 11:45 PM',
    },
    {
        id: '2',
        name: 'Nikhil Agarwal',
        avatar: 'https://via.placeholder.com/50',
        orderId: 'WPvnu52B8iE6TOCycR',
        items: [
            { name: 'Idli', quantity: 4, price: 480 },
            { name: 'VEG BURGER', quantity: 9, price: 630 },
        ],
        total: 1095.45,
        earned: 964.50,
        status: 'Delivered',
        date: 'Dec 28, 2023, 9:02 PM',
    },
    {
        id: '3',
        name: 'Nikhil Agarwal',
        avatar: 'https://via.placeholder.com/50',
        orderId: 'DvFQZ7bmVLiZnyMwUe7',
        items: [
            { name: 'Idli', quantity: 1, price: 120 },
            { name: 'Mix Salad', quantity: 2, price: 100 },
        ],
        total: 251,
        earned: 0,
        status: 'Cancelled',
        date: 'Dec 27, 2023, 9:10 PM',
    },
    {
        id: '4',
        name: 'Nikhil Agarwal',
        avatar: 'https://via.placeholder.com/50',
        orderId: 'dSPf3RN3V8jBu6WmI',
        items: [
            { name: 'Idli', quantity: 1, price: 120 },
            { name: 'Mix Salad', quantity: 2, price: 100 },
        ],
        total: 251,
        earned: 0,
        status: 'Cancelled',
        date: 'Dec 24, 2023, 9:02 PM',
    },
];

const OrderItem = ({ order }) => (
    <View style={styles.orderContainer}>
        <View style={styles.costomerDetailsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Image height={50} width={50} style={{ borderRadius: 50 }} source={{ uri: order.avatar }} />
                <View>
                    <Text style={styles.name}>{order.name}</Text>
                    <Text style={styles.orderId}>{order.orderId}</Text>
                </View>
            </View>
            <Text style={styles.total}>₹{order.total}</Text>
        </View>
        <View style={styles.itemContainer}>
            {order.items.map((item, index) => (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text key={index} style={styles.item}>
                        {item.name} x {item.quantity}
                    </Text>
                    <Text style={styles.item}>₹{item.price}</Text>
                </View>
            ))}
            <Text style={styles.date}>{order.date}</Text>
        </View>
        <View style={styles.statusContainer}>
            <Text style={styles.earned}>You Earned ₹{order.earned}</Text>
            <View style={[styles.statusButton, order.status === 'Delivered' ? styles.delivered : styles.cancelled]}>
                <Text style={styles.statusText}>{order.status}</Text>
            </View>

        </View>
    </View>
);

const OrdersScreen = () => (
    <View style={styles.container}>
        <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', marginBottom: 10}}>Your Orders</Text>
        <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderItem order={item} />}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    orderContainer: {
        backgroundColor: '#fff',
        marginBottom: 15,
        borderRadius: 10,
        elevation: 5,
    },
    costomerDetailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'gray',
        margin: 15,
        marginBottom: 0,
        paddingBottom: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    orderId: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    itemContainer: {
        padding: 15,
        paddingVertical: 10,
    },
    item: {
        fontSize: 14,
        marginBottom: 5,
        color: 'black',
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
        alignSelf: 'flex-end',
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'gray',
    },
    earned: {
        fontSize: 14,
        color: '#000',
        alignSelf: 'center',
        margin: 'auto',
    },
    statusButton: {
        padding: 5,
        borderBottomEndRadius: 10,
        alignItems: 'center',
        width: '50%',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    delivered: {
        backgroundColor: '#28a745',
    },
    cancelled: {
        backgroundColor: '#dc3545',
    },
    statusText: {
        color: '#fff',
    },
});

export default OrdersScreen;
