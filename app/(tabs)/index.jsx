import React from 'react';
import { BottomNavigation, BottomNavigationTab, Icon, TopNavigation, Avatar, TopNavigationAction, Text, Layout } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, View, Keyboard } from 'react-native';
import Mail from './mail';
import MyClub from './myClub';
import Event from './event';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { UserContext } from "../_layout";
import { firebase } from '@react-native-firebase/database';

const reference = firebase
	.app()
	.database('https://clubs-94def-default-rtdb.europe-west1.firebasedatabase.app/')
	.ref('/user');

const PersonIcon = (props) => (
	<Icon
		{...props}
		name='people-outline'
	/>
);
const CalendarIcon = (props) => (
	<Icon
		{...props}
		name='calendar-outline'
	/>
);
const EmailIcon = (props) => (
	<Icon
		{...props}
		name='email-outline'
	/>
);
const SettingsIcon = (props) => (
	<Icon
		{...props}
		height="35"
		width="35"
		name='settings-2-outline'
	/>
);

const renderSettingsAction = () => (
	<TopNavigationAction style={styles.logo} icon={SettingsIcon} onPress={() => pressed('page/settings')} />
);

const pressed = (link) => (
	router.push(link)

);

const renderIcon = (props) => (
	<View>
		<TouchableOpacity style={styles.logo} onPress={() => pressed('page/profile')}>
			<Avatar
				source={require('../../assets/images/avatar.png')}
			/>
		</TouchableOpacity>
	</View>
);

export default function HomeLayout() {
	const [selectedIndex, setSelectedIndex] = React.useState(1);

	const navig = (index) => (
		setSelectedIndex(index)
	);

	const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
	const keyboardDidShowListener = Keyboard.addListener(
		'keyboardDidShow',
		() => {
			setKeyboardVisible(true); // or some other action
		}
	);
	const keyboardDidHideListener = Keyboard.addListener(
		'keyboardDidHide',
		() => {
			setKeyboardVisible(false); // or some other action
		}
	);

	const renderTitle = (props) => (
		<Text category='h5'>
			{
				selectedIndex == 0 ? "MESSAGE" : selectedIndex == 1 ? "CLUBS" : "EVENT"
			}
		</Text>
	);

	return (
		<Layout
			style={{ flex: 1 }}
			level='1'
		>
			<SafeAreaView style={styles.container}>
				<TopNavigation
					alignment='center'
					title={renderTitle}
					//subtitle='Subtitle'
					accessoryLeft={renderIcon}
				//accessoryRight={renderSettingsAction}
				/>
				{
					selectedIndex == 0 ? <Mail /> : selectedIndex == 1 ? <MyClub /> : <Event />
				}
				{isKeyboardVisible ? null :
					<BottomNavigation
						selectedIndex={selectedIndex}
						onSelect={index => navig(index)}
					>
						<BottomNavigationTab icon={EmailIcon} />
						<BottomNavigationTab icon={PersonIcon} />
						<BottomNavigationTab icon={CalendarIcon} />
					</BottomNavigation>
				}
			</SafeAreaView>
		</Layout>
	);
}

const styles = StyleSheet.create({
	logo: {
		margin: 16,
	},
	container: {
		flex: 1,
	},
});

