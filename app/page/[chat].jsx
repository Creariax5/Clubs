import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Input, Text, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import MessageBulb from '../../components/messageBulb.jsx'
import moment from 'moment';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import database from '@react-native-firebase/database';
import { UserContext } from "../_layout";

const renderIcon = (props) => (
    <TouchableOpacity>
        <Icon
            {...props}
            name='image-outline'
        />
    </TouchableOpacity>
);

const backIcon = (props) => (
    <Icon
        {...props}
        onPress={() => router.back()}
        name='arrow-back'
    />
);


export default function Chat() {
    const [value, setValue] = React.useState('');
    const scrollViewRef = React.useRef();
    const [data, setData] = React.useState([]);
    const [title, setTitle] = React.useState("");


    // local : soit l'id de la conv si elle existe sinon id du user
    const [local, setLocal] = React.useState(useLocalSearchParams()["chat"]);
    const { userInfo, deleteUserData } = React.useContext(UserContext);

    const getMessageData = async () => {
        const reference = database().ref(`/conv/${local}`);

        // si conv id existe recup data sinon chercher avec l'id du user
        reference.once('value').then(snapshot => {
            if (snapshot.exists()) {
                setData(snapshot.val())

            } else {
                // inutile ? (si utilisé a la creation d'une conv entre 2 pers)
                const ref0 = database().ref(`/conv/`);
                console.log("local")

                ref0.once('value').then(snapshot => {
                    for (let i = 0; i < snapshot.val().length; i++) {
                        if (snapshot.val()[i]['title'] == undefined) {

                            if (snapshot.val()[i]['users'].includes(local) && snapshot.val()[i]['users'].includes(userInfo.uid)) {
                                // inutile car local est deja le nom de la conv ?
                                let conv = snapshot.val()[i];
                                conv['users'].splice(conv['users'].indexOf(local), 1);
                                conv["title"] = conv['users'][0];

                                setLocal(i);
                                console.log("conv id 2", local)

                                setData(conv);
                            }
                        }
                    }
                })
            }
        });
    };

    React.useEffect(() => {
        getMessageData();

    }, []);

    React.useEffect(() => {
        const listerNewMsgRef = database().ref(`users/${userInfo.uid}/notif/msg`);

        const handleNewMessages = (snapshot) => {
            const messages = snapshot.val();

            if (messages) {
                const newMessages = [];

                Object.keys(messages).forEach((key) => {
                    const msg = messages[key];
                    if (msg && msg["convID"] === local) {
                        getMessageData();

                        return;
                    }
                });
            }
        };

        listerNewMsgRef.on('value', handleNewMessages);

        return () => listerNewMsgRef.off('value', handleNewMessages); // Clean up the listener on unmount
    }, [userInfo.uid, local]);


    function sendTo(users, msg, convID) {
        users.splice(users.indexOf(userInfo.uid), 1);
        for (let i = 0; i < users.length; i++) {
            let leng = 0;

            const ref4 = database().ref(`/users/${users[i]}/notif/msg/`);
            ref4.once('value').then(snapshot => {
                if (snapshot.exists()) {
                    leng = snapshot.val().length;
                }

                const ref3 = database().ref(`/users/${users[i]}/notif/msg/${leng}`);

                ref3.set({
                    convID: convID,
                    message: msg
                });

            })

        }
    }

    function send() {
        // si la conversation n'a pas de messages
        if (data["messages"] == undefined) {
            const ref0 = database().ref(`/conv/`);

            // recup la taille de la conv (inutile car egale a 0 ?)
            var leng = 0;
            ref0.once('value').then(snapshot => {
                if (snapshot.exists()) {
                    leng = snapshot.val().length;
                }

                // ajouter le message envoyé à la conv
                const reference = database().ref(`/conv/${leng}`);
                let msg = {
                    users: [local, userInfo.uid],
                    messages: [{
                        id: 0,
                        sender: userInfo.uid,
                        message: value,
                        time: moment().utcOffset('+01:00').format('DD/MM/YYYY/HH:mm'),
                    }]
                }

                reference.set(msg);

                // leng : nombres de messages dans la conv
                setLocal(leng);
                getMessageData();

                sendTo([local, userInfo.uid], msg, leng)

            });
        } else {
            let msg = {
                id: data["messages"].length,
                sender: userInfo.uid,
                message: value,
                time: moment().utcOffset('+01:00').format('DD/MM/YYYY/HH:mm'),
            }

            // ajouter localement le message à la conv 
            data["messages"].push(msg);

            // ajouter sur la base de données le message à la conv 
            const reference = database().ref(`/conv/${local}/messages/${data["messages"].length - 1}`);
            reference.set(msg);

            // ajouter à la file des messages non lu de chaque user de la conv
            sendTo(data["users"], msg, local);

        }

        setValue('');
    }

    const renderSend = (props) => (
        <TouchableOpacity
            onPress={send}
        >
            <Text
                style={styles.text}
                appearance={value == '' ? 'hint' : 'default'}
                status={value == '' ? 'basic' : 'primary'}
                category='h6'
            >
                ENVOYER
            </Text>
        </TouchableOpacity>
    );

    const renderBackAction = () => (
        <TopNavigationAction style={styles.logo} icon={backIcon} />
    );

    function getTitle() {
        if (data.users == undefined) {
            return;
        }
        let dat = data;
        if (data.users[0] == userInfo.uid) {
            dat["title"] = data.users[1];
        } else {
            dat["title"] = data.users[0];
        }

        const ref1 = database().ref(`/users/${dat["title"]}`);

        ref1.once('value').then(snapshot => {
            if (snapshot.exists()) {
                var nVal = snapshot.val();
                dat["title"] = nVal.name

                setTitle(nVal.name)
            }
        });

    }

    return (
        <Layout
            level='1'
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    accessoryLeft={renderBackAction}
                    title={data["title"] == undefined ? (title == "" ? getTitle() : title) : data["title"]}
                    subtitle='Subtitle'
                    maxHeight={100}
                />
                <ScrollView
                    style={{ width: '100%' }}
                    contentContainerStyle={styles.container}
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                >
                    {data["messages"] != undefined ?
                        data["messages"].map((item) => <MessageBulb key={item.id} sender={item.sender} uid={userInfo.uid} message={item.message} />)
                        : null
                    }
                </ScrollView>
                <Input
                    placeholder='Place your Text'
                    value={value}
                    onChangeText={nextValue => setValue(nextValue)}
                    style={styles.messageBar}
                    accessoryLeft={renderIcon}
                    accessoryRight={renderSend}
                    size='large'
                    multiline={true}
                />
            </SafeAreaView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    messageBar: {
        padding: 16,
        paddingTop: 0,
        backgroundColor: 'transparent',
        width: '100%',
        maxHeight: 120,
    },
    logo: {
        padding: 16,
    },
});

