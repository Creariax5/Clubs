import React from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Card, Text, Button, Layout, Divider } from '@ui-kitten/components';
import { UserContext } from "../app/_layout";
import { router } from 'expo-router';
import joinClub from "../app/page/club/join";
import textSized from "../app/func/myFunc";


const Header = (props) => (
    <ImageBackground source={require('../assets/images/calisthenics.png')} resizeMode="cover" style={styles.image}>
    </ImageBackground>
);

export default function ClubCard({ clubID, name, description, setModalVisible }) {
    const { userInfo, deleteUserData } = React.useContext(UserContext);

    description = textSized(description);

    const Footer = (props) => (
        <View
            {...props}
            style={[props.style, styles.footerContainer]}
        >
            <Button
                style={styles.footerControl}
                size='small'
                onPress={() => joinClub(clubID, userInfo, name, setModalVisible)}
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
            onPress={() => router.push(`page/club/detail/${clubID}`)}
        //status='basic'
        >
            <Text style={{ marginBottom: 8 }} category='h6'>
                {name}
            </Text>
            <Text category='s1' style={{ maxHeight: 80 }}>
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
