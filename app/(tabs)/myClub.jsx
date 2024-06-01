import React from 'react';
import { StyleSheet, View, ScrollView, Alert, Modal } from 'react-native';
import { Icon, Input, Layout, Text, List, Button, Card, ViewPager } from '@ui-kitten/components';
import database from '@react-native-firebase/database';
import { UserContext } from "../_layout";
import { router } from 'expo-router';
import ClubCard from '../../components/clubCard';
import CategoryCard from '../../components/categoryCard';
import EventItem from '../../components/eventItem'


const data = [
	{
		id: "0",
		title: "Coupe de France de natation",
		description: "La Coupe de France de natation est une compétition de natation où les meilleurs nageurs de tout le pays se réunissent pour concourir. Attendez-vous à des performances exceptionnelles et à une ambiance électrique.",
		date: "10 February 18h30-20h30",
		place: "Paris"
	},
	{
		id: "1",
		title: "Rassemblement caritatif d'escalade",
		description: "Cet événement caritatif réunit des grimpeurs de tous niveaux pour une journée de défis et de solidarité. Les fonds récoltés seront reversés à des associations locales. Venez grimper pour une bonne cause et partager un moment convivial.",
		date: "15 March 09h00-17h00",
		place: "Lyon"
	},
	{
		id: "2",
		title: "Roland Garros",
		description: "Le célèbre tournoi de tennis Roland Garros revient cette année avec les meilleurs joueurs du monde. Ne manquez pas l'occasion de voir des matchs intenses et de vivre l'ambiance unique de ce grand événement sportif.",
		date: "20 May - 9 June",
		place: "Paris"
	},
	{
		id: "3",
		title: "Marathon de Paris",
		description: "Le Marathon de Paris est l'un des marathons les plus prestigieux au monde, attirant des coureurs de tous horizons. Parcourez les rues emblématiques de Paris et vivez une expérience inoubliable au cœur de la capitale française.",
		date: "14 April 08h00-14h00",
		place: "Paris"
	}



];


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
	const [modalVisible, setModalVisible] = React.useState(false);

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
		<View style={{ flex: 1 }}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text>Voulez vous vraiment rejoindre ... ?</Text>
						<View style={styles.footerContainer} >
							<Button
								style={styles.footerControl}
								size='small'
								status='danger'
								onPress={() => setModalVisible(!modalVisible)}
							>
								NON
							</Button>
							<Button
								style={styles.footerControl}
								size='small'
								status='success'
								onPress={() => setModalVisible(!modalVisible)}
							>
								OUI
							</Button>
						</View>
					</View>
				</View>
			</Modal>
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
							showClubData.slice(0, 5).map((item) => <ClubCard key={item.id} clubID={item.id} name={item.clubName} description={item.description} setModalVisible={setModalVisible} />)
							: null
					}
				</ScrollView>
				<Text style={styles.category} category='h1'>Les Events</Text>
				<ScrollView
					style={{ width: '100%', margin: 16 }}
				>
					{
						data.map((item) => <EventItem key={item.id} item={item} />)
					}
				</ScrollView>
			</ScrollView>
		</View>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
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
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	footerContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		marginTop: 16,
	},
	footerControl: {
		marginHorizontal: 2,
	},
});
