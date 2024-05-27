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

    const [local, setLocal] = React.useState(useLocalSearchParams()["chat"]);
    console.log(local)
    const { userInfo, deleteUserData } = React.useContext(UserContext);

    const getMessageData = async () => {
        const reference = database().ref(`/conv/${local}`);

        // si conv id existe recup data sinon chercher avec l'id du user
        reference.once('value').then(snapshot => {
            if (snapshot.exists()) {
                setData(snapshot.val())

            } else {
                const ref0 = database().ref(`/conv/`);
                console.log("local")

                ref0.once('value').then(snapshot => {
                    for (let i = 0; i < snapshot.val().length; i++) {
                        if (snapshot.val()[i]['title'] == undefined) {

                            if (snapshot.val()[i]['users'].includes(local) && snapshot.val()[i]['users'].includes(userInfo.uid)) {
                                console.log(local)
                                let conv = snapshot.val()[i];
                                let title = conv['users'].splice(conv['users'].indexOf(local), 1)[0];
                                conv["title"] = title;

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

    function send() {
        if (data["messages"] == undefined) {
            const ref0 = database().ref(`/conv/`);

            var leng = 0;
            ref0.once('value').then(snapshot => {
                if (snapshot.exists()) {
                    leng = snapshot.val().length;
                }

                const reference = database().ref(`/conv/${leng}`);
                reference.set({
                    users: [local, userInfo.uid],
                    messages: [{
                        id: 0,
                        sender: userInfo.uid,
                        message: value,
                        time: moment().utcOffset('+01:00').format('DD/MM/YYYY/HH:mm'),
                    }]
                });

                setLocal(leng);
                getMessageData();

            });
        } else {
            data["messages"].push(
                {
                    id: data["messages"].length + 2,
                    sender: userInfo.uid,
                    message: value,
                    time: moment().utcOffset('+01:00').format('DD/MM/YYYY/HH:mm'),
                },
            );
            console.log("conv id", local)
            const reference = database().ref(`/conv/${local}/messages/${data["messages"].length - 1}`);
            reference.set({
                id: data["messages"].length - 1,
                sender: userInfo.uid,
                message: value,
                time: moment().utcOffset('+01:00').format('DD/MM/YYYY/HH:mm'),
            });
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

    return (
        <Layout
            level='1'
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    accessoryLeft={renderBackAction}
                    title={data["title"] == undefined ? local : data["title"]}
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

