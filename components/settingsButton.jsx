import React from 'react';
import { Button, useTheme } from '@ui-kitten/components';

export default function SettingsButton(props) {
    const theme = useTheme();
    const [isPress, setIsPress] = React.useState(false);

    const handlePressIn = () => {
        setIsPress(true);
    };

    const handlePressOut = () => {
        setIsPress(false);
    };

    return (
        <Button
            style={isPress ? { margin: 4, backgroundColor: theme['color-primary-200'] } : { margin: 4, backgroundColor: theme['color-primary-100'] }}
            appearance='outline'
            size='large'
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            {props.children}
        </Button>
    );
}