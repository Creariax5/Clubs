import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction, Avatar, Text, Button, useTheme } from '@ui-kitten/components';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsButton from '../../components/settingsButton';
import { UserContext } from "../_layout";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

const backIcon = (props) => (
	<Icon
		{...props}
		onPress={() => router.back()}
		name='arrow-back'
	/>
);

const storeData = async (value, key) => {
	console.log("storing ", value)
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
		console.log("saved", jsonValue);
	} catch (e) {
		console.log(e);
	}
};

export default function Profile() {
	const { userInfo, deleteUserData } = React.useContext(UserContext);

	const renderBackAction = () => (
		<TopNavigationAction style={styles.logo} icon={backIcon} />
	);

	const theme = useTheme();

	const logout = () => {
		GoogleSignin.revokeAccess();
		GoogleSignin.signOut();
		auth().signOut();
		storeData(null, "user");
		deleteUserData();
		router.back();
	};

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
						source={{
							uri: userInfo.photoURL,
						}}
					/>
					<Text style={{ margin: "auto", marginTop: 0, marginBottom: 16 }} category='h1'>{userInfo.displayName}</Text>
					<View>
						<Button
							appearance='outline'
							size='large'
							status='basic'
							style={{ margin: 4 }}
						>
							Manage Profile
						</Button>
						<Button
							appearance='outline'
							size='large'
							status='basic'
							style={{ margin: 4 }}
						>
							Manage Bookings
						</Button>
						<Button
							appearance='outline'
							size='large'
							status='basic'
							style={{ margin: 4 }}
						>
							Notifications
						</Button>
						<Button
							appearance='outline'
							size='large'
							status='danger'
							style={{ margin: 4 }}
							onPress={() => logout()}
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

