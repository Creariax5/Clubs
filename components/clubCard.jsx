import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Card, Text, Button, Layout, Divider } from '@ui-kitten/components';
import database from '@react-native-firebase/database';
import { UserContext } from "../app/_layout";
import moment from 'moment';


const Header = (props) => (
    <ImageBackground source={require('../assets/images/calisthenics.png')} resizeMode="cover" style={styles.image}>
    </ImageBackground>
);

export default function ClubCard({ clubID, name, description }) {
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
                        title: name,
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

    const Footer = (props) => (
        <View
            {...props}
            style={[props.style, styles.footerContainer]}
        >
            <Button
                style={styles.footerControl}
                size='small'
                onPress={() => joinClub(clubID)}
            >
                NOUS REJOINDRE
            </Button>
        </View>
    );
    return (
        <Card
            style={styles.card}
            header={Header}
            footer={Footer}
        //status='basic'
        >
            <Text style={{ marginBottom: 8 }} category='h6'>
                {name}
            </Text>
            <Text category='s1' style={{ maxHeight: 56 }}>
                {description}
            </Text>
        </Card>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        margin: 16,
        marginTop: 0,
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxWidth: 320,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
    tinyLogo: {
        height: 140,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        padding: 80
    },
});
