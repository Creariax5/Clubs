import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Input, Text, Icon, TopNavigation, TopNavigationAction, Tab, TabBar } from '@ui-kitten/components';

export default function ClubPage() {
    return (
        <Layout style={{ padding: 16, }}>
            <Text category='h4'>{club.clubName}</Text>
            <Text>{club.description}</Text>
            <Text>{club.members}</Text>
        </Layout>

    );
}

const styles = StyleSheet.create({

});

