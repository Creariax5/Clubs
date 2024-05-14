import React from 'react';
import { Divider, List, ListItem, Avatar } from '@ui-kitten/components';
import { router } from 'expo-router';

const data = [
	{
		id: '0',
		title: 'First Item',
	},
	{
		id: '1',
		title: 'Second Item',
	},
	{
		id: '2',
		title: 'Third Item',
	},
	{
		id: '3',
		title: 'Third Item',
	},
	{
		id: '4',
		title: 'First Item',
	},
	{
		id: '5',
		title: 'Second Item',
	},
	{
		id: '6',
		title: 'Third Item',
	},
	{
		id: '7',
		title: 'Third Item',
	},
	{
		id: '8',
		title: 'First Item',
	},
	{
		id: '9',
		title: 'Second Item',
	},
	{
		id: '10',
		title: 'Third Item',
	},
	{
		id: '11',
		title: 'Third Item',
	},
];

const renderItemIcon = (props) => (
	<Avatar style={{ marginRight: 6, marginLeft: 6 }} size='giant' source={require('../../assets/images/avatar.png')} />
);


const pressed = (props) => (
	router.push('page/chat')

);

const renderItem = ({ item, index }) => (
	<ListItem
		title={`${item.title} ${index + 1}`}
		description={`${item.description} ${index + 1}`}
		accessoryLeft={renderItemIcon}
		onPress={pressed}
	/>
);

export default function Mail() {
	return (
		<List
			data={data}
			ItemSeparatorComponent={Divider}
			renderItem={renderItem}
		/>
	);
}
