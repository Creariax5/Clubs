import { StyleSheet, View, Image, ImageBackground } from 'react-native';
import { Card, Text, Button, Layout, Divider } from '@ui-kitten/components';

const Header = (props) => (
    <ImageBackground source={require('../assets/images/calisthenics.png')} resizeMode="cover" style={styles.image}>
    </ImageBackground>
);

const Footer = (props) => (
    <View
        {...props}
        style={[props.style, styles.footerContainer]}
    >
        <Button
            style={styles.footerControl}
            size='small'
        >
            NOUS REJOINDRE
        </Button>
    </View>
);


export default function ClubCard({ name, description }) {
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
