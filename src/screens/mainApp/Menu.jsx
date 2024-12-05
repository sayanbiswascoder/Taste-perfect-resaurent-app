/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Switch, Image } from 'react-native';
import Modal from 'react-native-modal';
// Uncomment if using image picker
import { launchImageLibrary } from 'react-native-image-picker';

const MenuScreen = () => {
    const [menuItems, setMenuItems] = useState([
        { id: '1', name: 'Veg Burger', description: 'Delicious veggie burger', price: '₹70', isVeg: true, image: 'https://via.placeholder.com/50', available: true },
        { id: '2', name: 'Paneer Roll', description: 'Spicy paneer roll', price: '₹150', isVeg: true, image: 'https://via.placeholder.com/50', available: true },
    ]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newDishName, setNewDishName] = useState('');
    const [newDishCategory, setNewDishCategory] = useState('');
    const [newDishDescription, setNewDishDescription] = useState('');
    const [newDishPrice, setNewDishPrice] = useState('');
    const [isVeg, setIsVeg] = useState(true);
    const [dishImage, setDishImage] = useState(null);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const addNewDish = () => {
        const newDish = {
            id: Math.random().toString(),
            name: newDishName,
            category: newDishCategory,
            description: newDishDescription,
            price: `₹${newDishPrice}`,
            isVeg,
            image: dishImage,
        };
        setMenuItems([...menuItems, newDish]);
        setNewDishName('');
        setNewDishCategory('');
        setNewDishDescription('');
        setNewDishPrice('');
        setIsVeg(true);
        setDishImage(null);
        toggleModal();
    };

    // Function to select an image (mocked for now)
    const selectImage = () => {
        // Uncomment if using image picker
        launchImageLibrary({}, response => {
            if (response.assets && response.assets.length > 0) {
                setDishImage(response.assets[0].uri);
            }
        });
        // setDishImage('https://via.placeholder.com/150'); // Temporary placeholder
    };

    const renderMenuItem = ({ item }) => (
        <View style={styles.menuItem}>
            {item.image && <Image source={{ uri: item.image }} style={[styles.dishImage, {filter: 'grayscale(100%)'}]} />}
            <View style={{flexDirection: 'column', width: '70%', padding: 10}}>
                <View style={styles.menuTextContainer}>
                    <View>
                        <Text style={styles.menuItemText}>{item.name}</Text>
                        <Text style={styles.menuItemDescription}>{item.description}</Text>
                    </View>
                    <View>
                        <Text style={styles.menuItemPrice}>{item.price}</Text>
                        <Text style={[styles.menuItemVeg, {color: item.isVeg ? 'green' : 'red'}]}>{item.isVeg ? 'Veg' : 'Non-Veg'}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5, gap: 10}}>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={[styles.menuItemButtonText, {color: 'green'}]}>{item.available ? 'Not Available' : 'Available'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={[styles.menuItemButtonText, {color: 'red'}]}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Restaurant Menu</Text>

            {/* Menu List */}
            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id}
                renderItem={renderMenuItem}
                contentContainerStyle={styles.menuList}
            />

            {/* Add Dish Button */}
            <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
                <Text style={styles.addButtonText}>+ Add Dish</Text>
            </TouchableOpacity>

            {/* Add Dish Modal */}
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>Add New Dish</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Dish Name"
                        value={newDishName}
                        onChangeText={setNewDishName}
                        placeholderTextColor={'black'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Dish Category"
                        value={newDishCategory}
                        onChangeText={setNewDishCategory}
                        placeholderTextColor={'black'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Short Description"
                        value={newDishDescription}
                        onChangeText={setNewDishDescription}
                        placeholderTextColor={'black'}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={newDishPrice}
                        onChangeText={setNewDishPrice}
                        placeholderTextColor={'black'}
                    />
                    <View style={styles.switchContainer}>
                        <Text style={styles.switchLabel}>Veg</Text>
                        <Switch
                            value={isVeg}
                            onValueChange={(value) => setIsVeg(value)}
                            trackColor={{ true: '#f44336', false: '#4CAF50' }}
                            thumbColor={isVeg ? '#f44336' : '#4CAF50'}
                        />
                        <Text style={styles.switchLabel}>Non Veg</Text>
                    </View>
                    <TouchableOpacity style={styles.imageButton} onPress={selectImage}>
                        <Text style={styles.imageButtonText}>Upload Image</Text>
                    </TouchableOpacity>
                    {dishImage && <Image source={{ uri: dishImage }} style={styles.previewImage} />}
                    <TouchableOpacity style={styles.submitButton} onPress={addNewDish}>
                        <Text style={styles.submitButtonText}>Add Dish</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    menuList: {
        paddingBottom: 20,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    dishImage: {
        height: '100%',
        width: 100,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    menuTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuItemText: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    menuItemDescription: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    menuItemPrice: {
        fontSize: 16,
        color: '#333',
        alignSelf: 'flex-end',
    },
    menuItemVeg: {
        fontSize: 14,
        color: '#4CAF50',
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    menuItemButtonText: {
        color: 'black',
    },
    addButton: {
        backgroundColor: '#ff4d4f',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        color: 'black',
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    switchLabel: {
        fontSize: 16,
        color: '#333',
        marginHorizontal: 10,
    },
    imageButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    imageButtonText: {
        color: '#333',
        fontSize: 16,
    },
    previewImage: {
        width: 150,
        height: 150,
        marginBottom: 15,
        alignSelf: 'center',
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default MenuScreen;
