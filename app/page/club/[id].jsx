import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Input, Text, Icon, TopNavigation, TopNavigationAction, Tab, TabBar, Button } from '@ui-kitten/components';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import database from '@react-native-firebase/database';
import { UserContext } from "../../_layout";
import Membres from "./membres";

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
        name='arrow-back'
    />
);


export default function ClubPage() {
    const [club, setClub] = React.useState([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const clubID = useLocalSearchParams()["id"];
    const { userInfo, deleteUserData } = React.useContext(UserContext);

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
        <TopNavigationAction style={styles.logo} icon={backIcon} onPress={() => router.back()} />
    );

    const quit = () => {
        const ref0 = database().ref(`/club/${clubID}/members/`);

        ref0.once('value').then(snapshot => {
            let membrers = snapshot.val();
            membrers.splice(membrers.indexOf(userInfo.uid), 1);
            //del you from club
            ref0.set(
                membrers
            );
        });

        const ref = database().ref(`/users/${userInfo.uid}/clubID/`);
        ref.remove();

        const ref2 = database().ref(`/club/${clubID}/convID/`);
        leng = null;
        ref2.once('value').then(snapshot => {
            let convID = snapshot.val();

            const ref1 = database().ref(`/conv/${convID}/users/`);
            ref1.once('value').then(snapshot => {
                let membrers = snapshot.val();
                membrers.splice(membrers.indexOf(userInfo.uid), 1);
                //del you from club
                ref1.set(
                    membrers
                );

            });

        })

        router.back();

    };

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
                <TabBar
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                >
                    <Tab title='CLUB' />
                    <Tab title='MEMBRES' />
                </TabBar>
                {
                    selectedIndex == 0 ?
                        <Layout style={{ padding: 16, }}>
                            <Text category='h4'>{club.clubName}</Text>
                            <Text>{club.description}</Text>
                            <Button
                                appearance='outline'
                                size='large'
                                status='danger'
                                style={{ marginTop: 16 }}
                                onPress={() => quit()}
                            >
                                Quitter le club
                            </Button>

                        </Layout>
                        : selectedIndex == 1 ?
                            <Membres members={club.members}></Membres>
                            : null
                }


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

