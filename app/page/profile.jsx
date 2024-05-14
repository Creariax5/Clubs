import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction, Avatar, Text, Button, useTheme } from '@ui-kitten/components';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsButton from '../../components/settingsButton'

const backIcon = (props) => (
	<Icon
		{...props}
		onPress={() => router.back()}
		name='arrow-back'
	/>
);


export default function Profile() {
	const renderBackAction = () => (
		<TopNavigationAction style={styles.logo} icon={backIcon} />
	);

	const theme = useTheme();

	return (
		<Layout
			level='1'
			style={{ flex: 1 }}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<TopNavigation
					alignment='center'
					accessoryLeft={renderBackAction}
					title='Profile'
					subtitle='Customize your profile'
				/>
				<ScrollView
					style={{ width: '100%' }}
					contentContainerStyle={{ padding: 16, }}
				>
					<Avatar
						style={{ margin: "auto", marginTop: 8, marginBottom: 8, height: 160, width: 160 }}
						size='giant'
						source={require('../../assets/images/avatar.png')}
					/>
					<Text style={{ margin: "auto", marginTop: 0, marginBottom: 16 }} category='h1'>Florian</Text>
					<View>
						<Button
							appearance='outline'
							size='large'
							status='basic'
							style={{margin: 4}}
						>
							Manage Profile
						</Button>
						<Button
							appearance='outline'
							size='large'
							status='basic'
							style={{margin: 4}}
						>
							Manage Bookings
						</Button>
						<Button
							appearance='outline'
							size='large'
							status='basic'
							style={{margin: 4}}
						>
							Notifications
						</Button>
						<Button
							appearance='outline'
							size='large'
							status='danger'
							style={{margin: 4}}
						>
							Logout
						</Button>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Layout>
	);
}

const styles = StyleSheet.create({
	logo: {
		padding: 16,
	},
	button: {
		margin: 4,
	},
});

