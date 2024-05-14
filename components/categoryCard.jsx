import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';

export default function CategoryCard({emoji, onSelect}) {
    const theme = useTheme();
    const [selected, setSelected] = React.useState(false);

    function select() {
        setSelected(!selected)
        onSelect(emoji, !selected);
	};

    return (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: theme['color-basic-300'], borderColor: theme['color-basic-300'] },  selected ? { backgroundColor: theme['color-basic-100'], borderColor: theme['color-primary-500'] } : {  } ]}
            onPress={() => select()}
        >
            <Text style={{ fontSize: 45, borderRadius: 12 }}>
                {emoji}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        margin: 8,
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
    },
});
