import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const AccountScreen = ({ navigation }) => {
    const screenWidth = Dimensions.get('window').width;
    // Dummy data
    const profile = {
        name: 'STAYFIT RESTAURANT',
        address: 'Karol Bagh, New Delhi, India',
        phone: '9101085890',
        email: 'agarwal.piyush@gmail.com',
        image: 'https://via.placeholder.com/50',
    };

    const reviews = [
        {
            id: 1,
            name: 'Nikhil Agarwal',
            date: 'Dec 12, 2023',
            rating: 4,
            comment: 'Tasty!',
            image: 'https://via.placeholder.com/50',
        },
        {
            id: 2,
            name: 'Sonia Verma',
            date: 'Nov 20, 2023',
            rating: 5,
            comment: 'Delicious and quick service!',
            image: 'https://via.placeholder.com/50',
        },
        {
            id: 3,
            name: 'Raj Patel',
            date: 'Oct 15, 2023',
            rating: 3,
            comment: 'Could be better.',
            image: 'https://via.placeholder.com/50',
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradient
                    colors={['#dd2536', 'red', 'red', 'red', '#3939d9']}
                    style={[styles.backgroundGradient, {left:  -((1000 - screenWidth) / 2)}]}
            />
            {/* Profile Header */}
            <View style={styles.headerContainer}>
                <Image source={{ uri: profile.image }} style={styles.profileImage} />
                <TouchableOpacity style={styles.editIcon}>
                    <Icon name="pencil" size={16} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.profileName}>{profile.name}</Text>
                <Text style={styles.profileDetails}>{profile.address}</Text>
                <Text style={styles.profileDetails}>{profile.phone} | {profile.email}</Text>
            </View>

            {/* Profile Actions */}
            <View style={styles.actionContainer}>
                {/* <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Categories</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.actionButton} onPress={()=> navigation.push('PastOrders')}>
                    <Text style={styles.actionText}>Past Orders</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}><Text style={styles.actionText}>Edit Profile</Text></TouchableOpacity>
            </View>

            {/* Reviews Section */}
            <Text style={styles.reviewTitle}>REVIEWS</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewScroll}>
                {reviews.map(review => (
                    <View key={review.id} style={styles.reviewCard}>
                        <View style={styles.reviewHeader}>
                            <Image source={{ uri: review.image }} style={styles.reviewImage} />
                            <View style={styles.reviewInfo}>
                                <Text style={styles.reviewerName}>{review.name}</Text>
                                <Text style={styles.reviewDate}>{review.date}</Text>
                            </View>
                        </View>
                        <View style={styles.ratingContainer}>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Icon
                                    key={index}
                                    name="star"
                                    size={16}
                                    color={index < review.rating ? '#FFD700' : '#d3d3d3'}
                                />
                            ))}
                        </View>
                        <Text style={styles.reviewComment}>{review.comment}</Text>
                    </View>
                ))}
                {/* See All Reviews Button */}
                <TouchableOpacity style={styles.seeAllButton} onPress={()=> navigation.push('Reviews')}>
                    <Icon name="arrow-right" size={20} color={'white'} />
                </TouchableOpacity>
            </ScrollView>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>LOGOUT</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    backgroundGradient: {
        height: 1000,
        width: 1000,
        position: 'absolute',
        top: -820,
        borderRadius: 1000,

    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 8,
        borderWidth: 5,
        borderColor: '#fff',
        marginTop: 100,
    },
    editIcon: {
        position: 'absolute',
        top: 190,
        right: 130,
        backgroundColor: '#FF4E4E',
        padding: 6,
        borderRadius: 50,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    profileDetails: {
        fontSize: 14,
        color: '#666',
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 16,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderColor: '#FF4E4E',
        borderWidth: 1,
        borderRadius: 20,
    },
    actionText: {
        color: '#FF4E4E',
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 8,
    },
    reviewScroll: {
        marginBottom: 16,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    reviewCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginRight: 12,
        width: 300,
        height: 180,
        elevation: 3,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    reviewImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 8,
    },
    reviewInfo: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    reviewDate: {
        fontSize: 12,
        color: '#666',
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    reviewComment: {
        fontSize: 14,
        color: '#333',
    },
    seeAllButton: {
        height: 50,
        width: 50,
        backgroundColor: '#FF4E4E',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
        alignSelf: 'center',
    },
    seeAllText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#FF4E4E',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    logoutText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default AccountScreen;
