import { ScrollView, StyleSheet } from 'react-native';
import { Layout, Text, List } from '@ui-kitten/components';
import EventItem from '../../components/eventItem'

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


export default function Event() {
	return (
		<ScrollView style={{ width: '100%' }} contentContainerStyle={styles.container}>
			{
				data.map((item) => <EventItem key={item.id} />)
			}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
});
