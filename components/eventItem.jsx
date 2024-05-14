import { StyleSheet, View } from 'react-native';
import { Card, Text, Button, Icon } from '@ui-kitten/components';

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
        style={[props.style, styles.footerContainer]}
    >
        <Button
            style={styles.footerControl}
            size='small'
            status='basic'
        >
            CANCEL
        </Button>
        <Button
            style={styles.footerControl}
            size='small'
        >
            ACCEPT
        </Button>
    </View>
);


export default function EventItem() {
    return (
        <Card
            style={styles.card}
        //header={Header}
        //footer={Footer}
        //status='basic'
        >
            <View style={{ flexDirection: 'row' }}>

                <View>
                    <Header />
                    <Text></Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='pin-outline' fill='gray' height={20} width={20} />
                        <Text appearance='hint'>Nice</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='calendar-outline' fill='gray' height={20} width={20} />
                        <Text appearance='hint'>10 February 18h30-20h30</Text>
                    </View>
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
        width: '90%'
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
});
