import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';


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
        comment: 'This restaurant is the best. The ambiance is great, and the food is delicious.',
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

const ReviewsItem = ({ item }) => {
    return <View key={item.id} style={styles.reviewCard}>
        <View style={styles.reviewHeader}>
            <Image source={{ uri: item.image }} style={styles.reviewImage} />
            <View style={styles.reviewInfo}>
                <Text style={styles.reviewerName}>{item.name}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
            </View>
        </View>
        <View style={styles.ratingContainer}>
            {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                    key={index}
                    name="star"
                    size={16}
                    color={index < item.rating ? '#FFD700' : '#d3d3d3'}
                />
            ))}
        </View>
        <Text style={styles.reviewComment}>{item.comment}</Text>
    </View>;
};

const ReviewsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.sectionText}>Reviews</Text>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewsItem item={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 15,
    },
    sectionText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reviewCard: {
        backgroundColor: '#fff',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        width: '95%',
        minHeight: 200,
        elevation: 5,
        alignSelf: 'center',
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewInfo: {
        flex: 1,
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black',
    },
    reviewDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginTop: 5,
    },
    reviewComment: {
        fontSize: 14,
        color: 'black',
    },

});
