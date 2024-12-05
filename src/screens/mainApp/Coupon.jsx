/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Switch, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CouponsScreen = () => {
    const [coupons, setCoupons] = useState([
        { id: '1', name: 'TASK10', discount: '10% OFF', description: 'Get 10% OFF', expiry: 'Jan 31, 2024', active: true },
        { id: '2', name: 'TASTY100', discount: '₹100 OFF', description: 'Get ₹100 OFF on orders above ₹1000', expiry: 'Dec 30, 2023', active: false },
        { id: '3', name: 'FIRSTUSER', discount: '40% OFF', description: 'Get 40% OFF', expiry: 'Oct 5, 2023', active: false },
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [couponDetails, setCouponDetails] = useState({
        name: '',
        expiryDate: '',
        type: 'percentage',
        discountValue: '',
        description: '',
        minOrderValue: '',
        discountUpto: '',
    });

    const toggleModal = () => setModalVisible(!modalVisible);

    const handleAddCoupon = () => {
        const newCoupon = {
            id: Math.random().toString(),
            name: couponDetails.name,
            discount: couponDetails.type === 'percentage' ? `${couponDetails.discountValue}% OFF` : `₹${couponDetails.discountValue} OFF`,
            description: couponDetails.description,
            expiry: couponDetails.expiryDate,
            active: true,
        };
        setCoupons([...coupons, newCoupon]);
        setModalVisible(false);
        setCouponDetails({
            name: '',
            expiryDate: '',
            type: 'percentage',
            discountValue: '',
            description: '',
            minOrderValue: '',
            discountUpto: '',
        });
    };

    const renderCoupon = ({ item }) => (
        <View style={styles.card}>
            <View style={[styles.discountLabel, { backgroundColor: item.active ? 'red' : 'gray' }]}>
                <View style={{height: 20, width: 20, borderRadius: 10, backgroundColor: 'white', position: 'absolute', left: -10, top: 10}} />
                <View style={{height: 20, width: 20, borderRadius: 10, backgroundColor: 'white', position: 'absolute', left: -10}} />
                <View style={{height: 20, width: 20, borderRadius: 10, backgroundColor: 'white', position: 'absolute', left: -10, bottom: 10}} />
                <Text style={styles.discountText}>{item.discount}</Text>
                <View style={{height: '100%', width: 30, position: 'absolute', right: 0, top: 0, backgroundColor: '#fff'}} />
            </View>
            <View style={styles.cardContent}>
                <Text style={[styles.code, { color: item.active ? 'red' : 'gray' }]}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.expiry}>{item.active ? 'Active' : `Expired on ${item.expiry}`}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={coupons}
                keyExtractor={(item) => item.id}
                renderItem={renderCoupon}
                contentContainerStyle={styles.couponsList}
            />
            <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                <Icon name="plus" size={40} color={'white'} />
            </TouchableOpacity>

            {/* Add Coupon Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Add Coupon</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Coupon Name"
                            value={couponDetails.name}
                            placeholderTextColor={'gray'}
                            onChangeText={(text) => setCouponDetails({ ...couponDetails, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Expiry Date"
                            placeholderTextColor={'gray'}
                            value={couponDetails.expiryDate}
                            onChangeText={(text) => setCouponDetails({ ...couponDetails, expiryDate: text })}
                        />
                        <View style={styles.switchContainer}>
                            <Text style={{ color: 'black' }}>Coupon Type:</Text>
                            <Text style={{ color: 'black' }}>{couponDetails.type === 'percentage' ? 'Percentage' : 'Amount'}</Text>
                            <Switch
                                value={couponDetails.type === 'percentage'}
                                onValueChange={(val) =>
                                    setCouponDetails({ ...couponDetails, type: val ? 'percentage' : 'amount' })
                                }
                                trackColor={{ true: 'lightblue', false: 'lightgreen' }}
                                thumbColor={couponDetails.type === 'percentage' ? 'lightblue' : 'lightgreen'}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Discount Value"
                            placeholderTextColor={'gray'}
                            value={couponDetails.discountValue}
                            onChangeText={(text) => setCouponDetails({ ...couponDetails, discountValue: text })}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Description"
                            placeholderTextColor={'gray'}
                            value={couponDetails.description}
                            onChangeText={(text) => setCouponDetails({ ...couponDetails, description: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Minimum Order Value"
                            placeholderTextColor={'gray'}
                            value={couponDetails.minOrderValue}
                            onChangeText={(text) => setCouponDetails({ ...couponDetails, minOrderValue: text })}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Discount Upto"
                            placeholderTextColor={'gray'}
                            value={couponDetails.discountUpto}
                            onChangeText={(text) => setCouponDetails({ ...couponDetails, discountUpto: text })}
                            keyboardType="numeric"
                        />
                        <View style={{flexDirection: 'row', gap: 20, justifyContent: 'flex-end'}}>
                            <Button title="Add Coupon" onPress={handleAddCoupon} />
                            <Button title="Close" color="red" onPress={toggleModal} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    couponsList: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        marginBottom: 16,
        elevation: 3,
    },
    discountLabel: {
        backgroundColor: '#f00',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopStartRadius: 8,
        borderBottomStartRadius: 8,
        // paddingHorizontal: 8,
        marginRight: 16,
        // width: 60,
    },
    discountText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        transform: [{ rotate: '-90deg' }, { translateY: -10 }],
    },
    cardContent: {
        flex: 1,
        paddingVertical: 10,
    },
    code: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        color: 'black',
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    expiry: {
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
    },
    detail: {
        fontSize: 14,
        color: '#000',
    },
    couponCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        borderRadius: 8,
        overflow: 'hidden',
        padding: 16,
    },
    activeCoupon: {
        backgroundColor: '#FFFFFF',
    },
    inactiveCoupon: {
        backgroundColor: '#EEEEEE',
    },
    couponInfo: {
        flex: 1,
        marginLeft: 16,
    },
    couponName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    couponDescription: {
        fontSize: 14,
        color: '#777',
    },
    couponExpiry: {
        fontSize: 12,
        color: '#888',
    },
    addButton: {
        width: 50,
        height: 50,
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#FF4D4D',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
        color: 'black',
    },
    input: {
        height: 40,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 6,
        color: 'black',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
});

export default CouponsScreen;
