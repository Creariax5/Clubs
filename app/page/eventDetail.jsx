import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Layout, Icon, TopNavigation, TopNavigationAction, TabBar, Text, Tab, useTheme, Button } from '@ui-kitten/components';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsButton from '../../components/settingsButton';
import { UserContext } from "../_layout";

const backIcon = (props) => (
	<Icon
		{...props}
		name='arrow-back'
	/>
);


export default function Profile() {
	const user = React.useContext(UserContext);
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const renderBackAction = () => (
		<TopNavigationAction style={styles.logo} icon={backIcon} onPress={() => router.back()} />
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
					title='Cardio'
					subtitle='10 February 18h30-20h30'
				/>
				<ScrollView
					style={{ width: '100%' }}
					contentContainerStyle={{ padding: 16 }}
				>
					<View>
						<Button
							style={styles.footerControl}
							size='small'
							status='success'
						>
							PRESENT
						</Button>
					</View>
					<TabBar
						selectedIndex={selectedIndex}
						onSelect={index => setSelectedIndex(index)}
					>
						<Tab title='INFORMATIONS' />
						<Tab title='JOUEURS' />
					</TabBar>
					<Text appearance='hint' style={{ margin: 16, marginBottom: 4 }}>RENDEZ-VOUS</Text>
					<Text appearance='hint' style={{ margin: 16, marginBottom: 4 }}>ENTRAINEMENT</Text>
					<Text appearance='hint' style={{ margin: 16, marginBottom: 4 }}>MESSAGE</Text>

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

