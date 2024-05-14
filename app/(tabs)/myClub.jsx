import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon, Input, Layout, Text, List } from '@ui-kitten/components';
import SearchClub from './searchClub';


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
];

export default function MyClub() {
	const [value, setValue] = React.useState(0);

	if (value == 0) {
		return (
			<SearchClub>
			</SearchClub>
		);
	} else {
		return (
			<>
	
			</>
		);
	}
}

const styles = StyleSheet.create({

});
