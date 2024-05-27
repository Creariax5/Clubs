import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon, Input, Layout, Text, List, Button, Card, ViewPager } from '@ui-kitten/components';
import database from '@react-native-firebase/database';
import { UserContext } from "../_layout";
import { router } from 'expo-router';
import ClubCard from '../../components/clubCard';
import CategoryCard from '../../components/categoryCard';


var emojis = []

const renderIcon = (props) => (
	<Icon
		{...props}
		name='search-outline'
	/>
);

var categoryData = [
];

var clubData = [
];


export default function MyClub() {
	const [value, setValue] = React.useState(0);
	const [club, setClub] = React.useState([]);
	const { userInfo, deleteUserData } = React.useContext(UserContext);
	const [inputValue, setInputValue] = React.useState('');
	const [showData, setShowData] = React.useState(categoryData);
	const [showClubData, setShowClubData] = React.useState(clubData);

	const getMyClubData = async () => {
		const reference = database().ref(`/users/${userInfo.uid}`);

		reference.once('value').then(snapshot => {
			if (snapshot.exists() && snapshot.val()["clubID"] != undefined) {
				var clubID = snapshot.val()["clubID"];
				setValue(1);

				const ref2 = database().ref(`/club/${clubID}`);
				ref2.once('value').then(snapshot => {
					if (snapshot.exists()) {
						var myClub = snapshot.val();
						myClub["id"] = clubID;
						setClub(myClub);

					}
				});
			}
		});
	};

	const getSportData = async () => {
		const reference = database().ref(`/sport`);

		reference.once('value').then(snapshot => {
			if (snapshot.exists()) {
				categoryData = snapshot.val();
				for (let i = 0; i < categoryData.length; i++) {
					categoryData[i]["id"] = i;

				}
				setShowData(categoryData)
			}
		});
	};

	const getClubData = async () => {
		const reference = database().ref(`/club`);

		reference.once('value').then(snapshot => {
			if (snapshot.exists()) {
				clubData = snapshot.val();
				for (let i = 0; i < clubData.length; i++) {
					clubData[i]["id"] = i;

				}
				setShowClubData(clubData)
			}
		});
	};

	React.useEffect(() => {
		getMyClubData();
		getSportData();
		getClubData();
	}, []);

	//search algo
	function onSearch(nextValue) {
		setInputValue(nextValue);
		var tmp = [];
		for (let i = 0; i < categoryData.length; i++) {
			if (categoryData[i].sport.toLowerCase().includes(nextValue.toLowerCase())) {
				tmp.push(categoryData[i]);
			}
		}
		setShowData(tmp);
		var tmp = [];
		for (let i = 0; i < clubData.length; i++) {
			var add = false;
			for (let j = 0; j < clubData[i].sports.length; j++) {
				if (add == false && (clubData[i].sports[j].toLowerCase().includes(nextValue.toLowerCase()) || clubData[i].clubName.toLowerCase().includes(nextValue.toLowerCase()))) {
					tmp.push(clubData[i]);
					add = true;
				}
			}
		}
		setShowClubData(tmp);
	};

	function onSelect(emoji, selected) {
		if (selected) {
			emojis.push(emoji);
		} else {
			emojis.splice(emojis.indexOf(emoji), 1);
		}
		//console.log(emojis)
		if (emojis.length == 0) {
			setShowClubData(clubData);
		} else {
			var tmp = [];
			for (let k = 0; k < emojis.length; k++) {
				for (let i = 0; i < clubData.length; i++) {
					var add = false;
					for (let j = 0; j < clubData[i].emoji.length; j++) {
						if (add == false && clubData[i].emoji[j].includes(emojis[k])) {
							tmp.push(clubData[i]);
							add = true;
						}
					}
				}
			}
			setShowClubData(tmp);
		}
	};

	return (
		<ScrollView style={{ width: '100%' }}>
			<View style={{ margin: 16, marginTop: 8 }}>
				<Input
					placeholder='Place your Text'
					value={inputValue}
					onChangeText={nextValue => onSearch(nextValue)}
					accessoryRight={renderIcon}
				/>
			</View>
			{value == 1 ?
				<Layout style={{ padding: 16, flex: 1 }}>
					<Text category='h1' style={{ marginBottom: 8 }}>Mes clubs</Text>
					<Card onPress={() => router.push(`page/club/${club.id}`)}><Text>{club.clubName}</Text></Card>
					{/*<Layout style={styles.container}><Button onPress={() => setValue(0)}>SearchOtherClubs</Button></Layout>*/}
				</Layout>
				:
				null}
			<Text style={styles.category} category='h1'>Categories</Text>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				automaticallyAdjustContentInsets={true}
				style={styles.container2}
			>
				{
					showData != null ?
						showData.map((item) => <CategoryCard key={item.id} emoji={item.emoji} onSelect={onSelect} />)
						: null
				}
			</ScrollView>
			<Text style={styles.category} category='h1'>Les Clubs</Text>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				automaticallyAdjustContentInsets={true}
			>
				{
					showClubData != null ?
						showClubData.slice(0, 5).map((item) => <ClubCard key={item.id} clubID={item.id} name={item.clubName} description={item.description} />)
						: null
				}
			</ScrollView>
		</ScrollView>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	container2: {
		padding: 8,
		flex: 1,
		flexDirection: "row",
	},
	category: {
		margin: 16,
		marginBottom: 8,
	},
	list: {
		alignItems: 'center',
	},
});
