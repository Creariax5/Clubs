import React from 'react';
import { Divider, List, ListItem, Avatar } from '@ui-kitten/components';
import { router } from 'expo-router';
import database from '@react-native-firebase/database';
import { UserContext } from "../_layout";


const renderItemIcon = (props) => (
	<Avatar style={{ marginRight: 6, marginLeft: 6 }} size='giant' source={require('../../assets/images/avatar.png')} />
);


const pressed = (id) => (
	router.push(`page/${id}`)

);

export default function Mail() {
	const [data, setData] = React.useState([]);
	const { userInfo, deleteUserData } = React.useContext(UserContext);

	function getTitle(item) {
		let title = "";
		if (item.users[0] == userInfo.uid) {
			title = item.users[1];
		} else {
			title = item.users[0];
		}

		return title;
	}

	const renderItem = ({ item, index }) => (
		<ListItem
			title={`${item.title != undefined ? item.title : getTitle(item)}`}
			description={`En ligne il y a ${index + 1} h`}
			accessoryLeft={renderItemIcon}
			onPress={() => pressed(item.id)}
		/>
	);

	const getContactData = async () => {
		const reference = database().ref(`/conv`);

		reference.once('value').then(snapshot => {
			if (snapshot.exists()) {
				var categoryDataID = snapshot.val();

				for (let i = 0; i < categoryDataID.length; i++) {
					categoryDataID[i]["id"] = i;

				}

				var categoryData = [];
				for (let i = 0; i < categoryDataID.length; i++) {
					//console.log(categoryDataID[i]["users"])
					if (categoryDataID[i]["users"].includes(userInfo.uid)) {
						categoryData.push(categoryDataID[i]);
					}
				}

				setData(categoryData)
			}
		});
	};

	React.useEffect(() => {
		getContactData();
	}, []);

	return (
		<List
			data={data}
			ItemSeparatorComponent={Divider}
			renderItem={renderItem}
		/>
	);
}
