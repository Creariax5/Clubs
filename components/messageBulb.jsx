import { Text, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

export default function MessageBulb({ sender, uid, message }) {
    const theme = useTheme();

    return (
        <>
            {sender == uid ?
                <View style={[styles.bulb, styles.sender, { backgroundColor: theme['color-primary-500'] }]}>
                    <Text style={{ color: theme['color-basic-100'] }}>{message}</Text>
                </View>
                :
                <View style={[styles.bulb, styles.friend, { backgroundColor: theme['color-basic-300'] }]}>
                    <Text>{message}</Text>
                </View>

            }
        </>
    );
}

const styles = StyleSheet.create({
    bulb: {
        marginBottom: 8,
        padding: 8,
        paddingRight: 16,
        paddingLeft: 16,
        borderRadius: 20,
        maxWidth: '75%',
    },
    sender: {
        alignSelf: 'flex-end',
    },
    friend: {
        backgroundColor: "white",
        alignSelf: 'flex-start',
    },
});