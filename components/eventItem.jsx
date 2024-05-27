import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, Icon, ButtonGroup } from '@ui-kitten/components';
import { router } from 'expo-router';

const Header = (props) => (
    <View {...props}>
        <Text category='h6'>
            Cardio
        </Text>
        <Text category='s1'>
            Séance de cardio en bord de mer le soir
        </Text>
    </View>
);

const Footer = (props) => (
    <View
        {...props}
        // eslint-disable-next-line react/prop-types
        style={styles.footerContainer}
    >
        <Button
            style={styles.footerControl}
            size='small'
            status='danger'
        >
            ABSENT
        </Button>
        <Button
            style={styles.footerControl}
            size='small'
            status='success'
        >
            PRESENT
        </Button>
    </View>
);

const pressed = (link) => (
    router.push(link)

);

export default function EventItem() {
    return (
        <Card
            style={styles.card}
            onPress={() => pressed('page/eventDetail')}
        >
            <View style={{ flexDirection: 'row' }}>

                <View>
                    <Header style={{ marginBottom: 16 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='calendar-outline' fill='gray' height={20} width={20} />
                        <Text appearance='hint'>10 February 18h30-20h30</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='pin-outline' fill='gray' height={20} width={20} />
                        <Text appearance='hint'>Nice</Text>
                    </View>
                    <Footer />
                </View>
            </View>
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
        marginBottom: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '94%',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 16,
    },
    footerControl: {
        marginHorizontal: 2,
    },
});
