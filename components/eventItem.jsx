import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, Icon, ButtonGroup } from '@ui-kitten/components';
import { router } from 'expo-router';
import textSized from "../app/func/myFunc";


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

export default function EventItem({ item }) {

    const Header = (props) => (
        <View {...props}>
            <Text category='h6'>
                {item.title}
            </Text>
            <Text category='s1'>
                {textSized(item.description)}
            </Text>
        </View>
    );

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
                        <Text appearance='hint'>{item.date}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='pin-outline' fill='gray' height={20} width={20} />
                        <Text appearance='hint'>{item.place}</Text>
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
        width: '92%',
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
