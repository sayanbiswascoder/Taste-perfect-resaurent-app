import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const BusinessScreen = () => {
    // Dummy data for rendering the dashboard
    const data = {
        todayOrders: 0,
        todayEarnings: 0,
        totalOrders: 8,
        totalEarnings: 1187.5,
        amountReceived: 750.5,
        amountPending: 437,
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Today's Stats */}
            <Text style={styles.sectionTitle}>Today</Text>
            <View style={styles.row}>
                <View style={[styles.card, styles.blueCard]}>
                    <Text style={styles.cardValue}>{data.todayOrders}</Text>
                    <Text style={styles.cardLabel}>Today's Orders</Text>
                </View>
                <View style={[styles.card, styles.greenCard]}>
                    <Text style={styles.cardValue}>₹{data.todayEarnings}</Text>
                    <Text style={styles.cardLabel}>Earnings Today</Text>
                </View>
            </View>

            {/* Lifetime Stats */}
            <Text style={styles.sectionTitle}>Lifetime</Text>
            <View style={styles.row}>
                <View style={[styles.card, styles.blueCard]}>
                    <Text style={styles.cardValue}>{data.totalOrders}</Text>
                    <Text style={styles.cardLabel}>Total Orders</Text>
                </View>
                <View style={[styles.card, styles.greenCard]}>
                    <Text style={styles.cardValue}>₹{data.totalEarnings}</Text>
                    <Text style={styles.cardLabel}>Total Earnings</Text>
                </View>
            </View>

            {/* Payout Stats */}
            <Text style={styles.sectionTitle}>Payout</Text>
            <View style={styles.row}>
                <View style={[styles.card, styles.greenCard]}>
                    <Text style={styles.cardValue}>₹{data.amountReceived}</Text>
                    <Text style={styles.cardLabel}>Amount Received</Text>
                </View>
                <View style={[styles.card, styles.yellowCard]}>
                    <Text style={styles.cardValue}>₹{data.amountPending}</Text>
                    <Text style={styles.cardLabel}>Amount Pending</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 16,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    blueCard: {
        backgroundColor: '#5B6DF6',
    },
    greenCard: {
        backgroundColor: '#3FC17C',
    },
    yellowCard: {
        backgroundColor: '#F8C132',
    },
    cardValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardLabel: {
        fontSize: 14,
        color: '#fff',
        marginTop: 4,
    },
});

export default BusinessScreen;
