import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const backIcon = (props) => (
    <Icon
        {...props}
        name='arrow-back'
    />
);


export default function Settings() {
    const renderBackAction = () => (
        <TopNavigationAction style={styles.logo} icon={backIcon} onPress={() => router.back()} />
    );

    return (
        <Layout
            level='1'
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    accessoryLeft={renderBackAction}
                    title='Settings'
                //subtitle='Customize your profile'
                />
            </SafeAreaView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    logo: {
        padding: 16,
    },
});