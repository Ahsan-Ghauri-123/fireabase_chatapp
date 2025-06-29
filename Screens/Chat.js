// import React, {
//     useState,
//     useEffect,
//     useLayoutEffect,
//     useCallback
// } from 'react';
// import { TouchableOpacity, Text } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import {
//     collection,
//     addDoc,
//     orderBy,
//     query,
//     onSnapshot
// } from 'firebase/firestore';
// import { signOut } from 'firebase/auth';
// import { auth, database } from '../config/firebase';
// import { useNavigation } from '@react-navigation/native';
// import { AntDesign } from '@expo/vector-icons';
// import color from '../color';


// export default function Chat() {

//     const [messages, setMessages] = useState([]);
//     const navigation = useNavigation();

//     const onSignOut = () => {
//         signOut(auth).catch(error => console.log('Error logging out: ', error));
//     };

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             headerRight: () => (
//                 <TouchableOpacity
//                     style={{
//                         marginRight: 10
//                     }}
//                     onPress={onSignOut}
//                 >
//                     <AntDesign name="logout" size={24} color={color.gray} style={{ marginRight: 10 }} />
//                 </TouchableOpacity>
//             )
//         });
//     }, [navigation]);

//     useLayoutEffect(() => {

//         const collectionRef = collection(database, 'chats');
//         const q = query(collectionRef, orderBy('createdAt', 'desc'));

//         const unsubscribe = onSnapshot(q, querySnapshot => {
//             console.log('querySnapshot unsusbscribe');
//             setMessages(
//                 querySnapshot.docs.map(doc => ({
//                     _id: doc.data()._id,
//                     createdAt: doc.data().createdAt.toDate(),
//                     text: doc.data().text,
//                     user: doc.data().user
//                 }))
//             );
//         });
//         return unsubscribe;
//     }, []);

//     const onSend = useCallback((messages = []) => {
//         setMessages(previousMessages =>
//             GiftedChat.append(previousMessages, messages)
//         );
//         // setMessages([...messages, ...messages]);
//         const { _id, createdAt, text, user } = messages[0];
//         addDoc(collection(database, 'chats'), {
//             _id,
//             createdAt,
//             text,
//             user
//         });
//     }, []);

//     return (
//         // <>
//         //   {messages.map(message => (
//         //     <Text key={message._id}>{message.text}</Text>
//         //   ))}
//         // </>
//         <GiftedChat
//             messages={messages}
//             showAvatarForEveryMessage={false}
//             showUserAvatar={false}
//             onSend={messages => onSend(messages)}
//             messagesContainerStyle={{
//                 backgroundColor: '#fff'
//             }}
//             textInputStyle={{
//                 backgroundColor: '#fff',
//                 borderRadius: 20,
//             }}
//             user={{
//                 _id: auth?.currentUser?.email,
//                 avatar: 'https://i.pravatar.cc/300'
//             }}
//         />
//     );
// }


import React, { useState, useCallback } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';


const uniqueId = uuidv4();


export default function Chat() {
    const [messages, setMessages] = useState([]);

    React.useEffect(() => {
        const collectionRef = collection(database, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            const newMessages = querySnapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
                image: doc.data().image || null,
            }));
            console.log('Loaded messages:', newMessages);
            setMessages(newMessages);
        });
        return unsubscribe;
    }, []);


    // Send messages (text or image)
    const onSend = useCallback(async (messages = []) => {
        const message = messages[0];
        const newMessage = {
            _id: message._id,
            createdAt: message.createdAt,
            text: message.text || '', // Ensure text is an empty string if not provided
            user: message.user,
            image: message.image || null, // Ensure image is null if not provided
        };

        await addDoc(collection(database, 'chats'), newMessage);
        setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
    }, []);

    // Pick an image from the gallery
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const imageMessage = {
                _id: `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`, // Unique ID
                createdAt: new Date(),
                text: '', // No text for image messages
                user: {
                    _id: auth?.currentUser?.email,
                    avatar: 'https://i.pravatar.cc/300',
                },
                image: result.assets[0].uri, // Image URI
            };
            onSend([imageMessage]);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: auth?.currentUser?.email,
                    avatar: 'https://i.pravatar.cc/300',
                }}
                messagesContainerStyle={styles.messagesContainer}
                textInputStyle={styles.textInput}
                renderActions={() => (
                    <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
                        <AntDesign name="picture" size={24} color="gray" />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    messagesContainer: {
        backgroundColor: '#fff',
    },
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 20,
    },
    actionButton: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

