import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Button, Text, Icon, TopNavigation, TopNavigationAction, Tab, TabBar } from '@ui-kitten/components';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useGlobalSearchParams, Link } from 'expo-router';
import database from '@react-native-firebase/database';
import { UserContext } from "../../../_layout";
import joinClub from "../join";


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
                    style={{ margin: 32, position: 'absolute', bottom: 0, alignSelf: "center" }}
                    size='large'
                    onPress={() => joinClub(clubID, userInfo, club.name)}
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

