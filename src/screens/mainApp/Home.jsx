import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const HomeScreen = () => {
    const [orderData, setOrderData] = useState({
        customerName: 'Nikhil Agarwal',
        orderId: 'c0DsQ29j77aRwA9yUGdm',
        items: [
            { name: 'VEG BURGER', quantity: 1, price: 70 },
            { name: 'Paneer Roll', quantity: 1, price: 150 },
        ],
        total: 251,
        orderTime: 'Jan 20, 2024, 4:31 PM',
    });

    const refreshOrderData = () => {
        // Simulate data refresh for new orders; you can fetch new data here if needed
        Alert.alert('New order received', 'The page has been refreshed with the latest order.');
    };

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            if (remoteMessage.data && remoteMessage.data.type === 'new_order') {
                refreshOrderData();
            }
        });

        return unsubscribe;
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.title}>Orders</Text>
            </View>
            <View style={styles.card}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://your-avatar-url.com/avatar.png' }}
                        style={styles.avatar}
                    />
                    <View style={styles.customerInfo}>
                        <Text style={styles.customerName}>{orderData.customerName}</Text>
                        <Text style={styles.orderId}>{orderData.orderId}</Text>
                    </View>
                    <Text style={styles.totalAmount}>₹{orderData.total}</Text>
                </View>

                <View style={styles.itemList}>
                    {orderData.items.map((item, index) => (
                        <View key={index} style={styles.itemRow}>
                            <Text style={styles.itemName}>{item.name} x {item.quantity}</Text>
                            <Text style={styles.itemPrice}>₹{item.price}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.orderTime}>{orderData.orderTime}</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.rejectButton}>
                        <Text style={styles.rejectText}>REJECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.acceptText}>ACCEPT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        elevation: 3,
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderId: {
        fontSize: 12,
        color: '#666',
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemList: {
        marginVertical: 8,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    itemName: {
        fontSize: 14,
        color: '#333',
    },
    itemPrice: {
        fontSize: 14,
        color: '#333',
    },
    orderTime: {
        fontSize: 12,
        color: '#666',
        marginVertical: 8,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    rejectButton: {
        flex: 1,
        backgroundColor: '#FF4D4D',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 4,
        marginRight: 8,
    },
    acceptButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 4,
        marginLeft: 8,
    },
    rejectText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    acceptText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
