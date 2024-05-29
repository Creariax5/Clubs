import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Button, Text, Icon, TopNavigation, TopNavigationAction, Tab, TabBar } from '@ui-kitten/components';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import database from '@react-native-firebase/database';
import { UserContext } from "../../../_layout";


const backIcon = (props) => (
    <Icon
        {...props}
        onPress={() => router.back()}
        name='arrow-back'
    />
);

export default function ClubDetail() {
    const [club, setClub] = React.useState([]);

    const { userInfo, deleteUserData } = React.useContext(UserContext);

    function joinClub(id) {
        const ref0 = database().ref(`/club/${id}/members/`);

        var leng = null;
        ref0.once('value').then(snapshot => {
            if (snapshot.exists()) {
                leng = snapshot.val().length;
            } else {
                leng = 0;
            }

            const reference = database().ref(`/club/${id}/members/${leng}`);
            reference.set(
                userInfo.uid
            );
            const ref = database().ref(`/users/${userInfo.uid}/clubID/`);
            ref.set(
                id
            );
        });

        //create club conv if not exist
        //else add you to the conv
        const ref1 = database().ref(`/club/${id}/convID/`);
        leng = null;
        ref1.once('value').then(snapshot => {
            if (snapshot.exists()) {
                console.log("exist")

                let convID = snapshot.val();
                const ref5 = database().ref(`/conv/${convID}/users/`);
                ref5.once('value').then(snapshot => {
                    leng = snapshot.val().length;
                    const ref6 = database().ref(`/conv/${convID}/users/${leng}`);
                    ref6.set(
                        userInfo.uid
                    );
                })
            } else {
                console.log("don't exist")

                const ref2 = database().ref(`/conv/`);
                ref2.once('value').then(snapshot => {
                    if (snapshot.exists()) {
                        leng = snapshot.val().length;
                    } else {
                        leng = 0;
                    }

                    //create conv
                    const ref4 = database().ref(`/conv/${leng}`);
                    ref4.set({
                        title: club.clubName,
                        users: [userInfo.uid],
                        messages: [
                            {
                                id: 0,
                                message: "création du groupe",
                                sender: "systeme",
                                time: moment().utcOffset('+01:00').format('DD/MM/YYYY/HH:mm')
                            }
                        ]
                    });
                    //link to club
                    ref1.set(
                        leng
                    );
                });

            }
        })
    }

    const clubID = useLocalSearchParams()["id"];

    const getClubData = async () => {

        const ref2 = database().ref(`/club/${clubID}`);
        ref2.once('value').then(snapshot => {
            if (snapshot.exists()) {
                var myClub = snapshot.val();
                myClub["id"] = clubID;
                setClub(myClub);
            }
        });
    };

    React.useEffect(() => {
        getClubData();
    }, []);


    const renderBackAction = () => (
        <TopNavigationAction style={styles.logo} icon={backIcon} />
    );

    return (
        <Layout
            level='1'
            style={{ flex: 1, }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    accessoryLeft={renderBackAction}
                    title={club.clubName}
                    //subtitle='Subtitle'
                    maxHeight={100}
                />
                <Layout style={{ padding: 16, }}>
                    <Text category='h4'>{club.clubName}</Text>
                    <Text>{club.description}</Text>
                </Layout>
                <Button
                    style={styles.footerControl}
                    size='small'
                    onPress={() => joinClub(clubID)}
                >
                    NOUS REJOINDRE
                </Button>
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

