
// import React, { useEffect, useState } from "react";

// import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import color from "../color";

// const Home = () => {
//     const navigation = useNavigation();
//     const [userChat, setUserChat] = useState(null);

//     useEffect(() => {
//         // Mock chat data for a specific user
//         const chatData = {
//             id: 1,
//             userName: "Abuzar",
//             lastMessage: "Hi, let's chat!",
//             profileImage: require('../assets/images/user.png'), // Use the path to your uploaded image here
//         };

//         // Set the user chat
//         setUserChat(chatData);
//     }, []);

//     return (
//         <View style={styles.container}>
//             {userChat && (
//                 <TouchableOpacity
//                     style={styles.chatPreview}
//                     onPress={() => navigation.navigate("Chat", { userId: userChat.id })}
//                 >
//                     <Image source={require("../assets/images/user.png")} style={styles.profileImage} />
//                     <View>
//                         <Text style={styles.userName}>{userChat.userName}</Text>
//                         <Text style={styles.lastMessage}>{userChat.lastMessage}</Text>
//                     </View>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "flex-end",
//         alignItems: "flex-end",
//         backgroundColor: "#fff",
//     },
//     chatPreview: {
//         flexDirection: "row",
//         alignItems: "center",
//         position: "absolute",
//         height: 70,
//         width: 320,
//         top: 40,
//         left: 20,
//         padding: 10,
//         borderColor:"gray",
//         backgroundColor: color.lightGray,
//         borderRadius: 12,
//         borderWidth: 2,
//     },
//     profileImage: {
//         width: 40,
//         height: 40,
//         borderRadius: 20, // This makes the image circular
//         marginRight: 10,
//     },
//     userName: {
//         fontSize: 16,
//         fontWeight: "bold",
//         color: color.primary,
//     },
//     lastMessage: {
//         fontSize: 14,
//         color: color.gray,
//     },
// });

import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import color from "../color";

const Home = () => {
    const navigation = useNavigation();
    const [userChats, setUserChats] = useState([]);

    useEffect(() => {
        // Mock chat data for multiple users
        const chatData = [
            {
                id: 0,
                userName: "Me",
                lastMessage: "Hi, let's chat!",
                profileImage: require('../assets/images/user.png'), // Replace with correct path
            },
            {
                id: 1,
                userName: "Abuzar",
                lastMessage: "Hi, let's chat!",
                profileImage: require('../assets/images/ab.jpeg'), // Replace with correct path
            },
            {
                id: 2,
                userName: "Hunain Sheikh",
                lastMessage: "Hey there!",
                profileImage: require('../assets/images/t.jpeg'), // Replace with correct path
            },
            {
                id: 3,
                userName: "Muhammad Ahsan",
                lastMessage: "Good morning!",
                profileImage: require('../assets/images/ahsan.jpeg'), // Replace with correct path
            },
            {
                id: 4,
                userName: "Tahir",
                lastMessage: "How's it going?",
                profileImage: require('../assets/images/h.jpeg'), // Replace with correct path
            },
            {
                id: 5,
                userName: "Ziauddin University Group",
                lastMessage: "Hello, Everyone",
                profileImage: require('../assets/images/zu.png'), // Replace with correct path
            },
        ];

        // Set the user chats
        setUserChats(chatData);
    }, []);

    const renderChatPreview = ({ item }) => (
        <TouchableOpacity
            style={styles.chatPreview}
            onPress={() => navigation.navigate("Chat", { userId: item.id })}
        >
            <Image source={item.profileImage} style={styles.profileImage} />
            <View>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={userChats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderChatPreview}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    chatPreview: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        padding: 10,
        borderColor: "gray",
        backgroundColor: color.lightGray,
        borderRadius: 12,
        borderWidth: 2,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20, // This makes the image circular
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        color: color.primary,
    },
    lastMessage: {
        fontSize: 14,
        color: color.gray,
    },
});
