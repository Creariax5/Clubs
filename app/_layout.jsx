import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, createContext } from 'react';
import 'react-native-reanimated';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { default as theme } from './theme.json';
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { firebase } from '@react-native-firebase/database';
//import AsyncStorage from '@react-native-async-storage/async-storage';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const reference = firebase
	.app()
	.database('https://clubs-94def-default-rtdb.europe-west1.firebasedatabase.app/')
	.ref('/user');

export const UserContext = createContext(null);

/*
const storeData = async (value, key) => {
	try {
		const jsonValue = JSON.stringify(value);
		await AsyncStorage.setItem(key, jsonValue);
		console.log("saved", jsonValue);
	} catch (e) {
		console.log(e);
	}
};

const getData = async (key) => {
	try {
		const jsonValue = await AsyncStorage.getItem(key);
		console.log("readed", jsonValue);
		return jsonValue != null ? JSON.parse(jsonValue) : null;
	} catch (e) {
		console.log(e);
	}
};
*/


export default function RootLayout() {
	const [error, setError] = useState();
	const [userInfo, setUserInfo] = useState();

	/*
	useEffect(() => {
		setUserInfo(getData("user"));
	}, []);
	*/

	useEffect(() => {
		GoogleSignin.configure({
			webClientId:
				"330057627535-gf87u90n66fkb0mk78var7b99ep4l7f3.apps.googleusercontent.com",
		});
	}, []);

	const signin = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const user = await GoogleSignin.signIn();
			setUserInfo(user.user);
			reference.once('value').then(snapshot => {
				if (!(user.user.id in snapshot.toJSON())) {
					console.log(user.user.id);
					reference.child(user.user.id).set({
						name: user.user.name,
						email: user.user.email,
					})
				}
			});
			storeData(user.user, "user");
			setError();
		} catch (e) {
			setError(e);
			console.log(e)
		}
	};

	const logout = () => {
		setUserInfo();
		GoogleSignin.revokeAccess();
		GoogleSignin.signOut();
	};

	//------------------------------------------------

	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});
	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);
	if (!loaded) {
		return null;
	}



	return (
		<>
			{userInfo ?
				<>
					<IconRegistry icons={EvaIconsPack} />
					<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
						<UserContext.Provider value={userInfo}>
							<Stack screenOptions={{ headerShown: false }}>
								<Stack.Screen name="(tabs)/index" />
							</Stack>
						</UserContext.Provider>
					</ApplicationProvider>
				</>
				:
				<View style={styles.container}>
					<Text>{JSON.stringify(error)}</Text>
					{userInfo && <Text>{JSON.stringify(userInfo)}</Text>}
					{userInfo ? (
						<Button title="Logout" onPress={logout} />
					) : (
						<GoogleSigninButton
							size={GoogleSigninButton.Size.Standard}
							color={GoogleSigninButton.Color.Dark}
							onPress={signin}
						/>
					)}
					<StatusBar style="auto" />
				</View>
			}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
