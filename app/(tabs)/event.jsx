import { ScrollView, StyleSheet, View } from 'react-native';
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
];


export default function Event() {
	return (
		<>
			<ScrollView style={{ width: '100%' }} >
				<View>
					<Text appearance='hint' style={{ margin: 16, marginBottom: 4, marginTop: 8 }}>TERMINÉS</Text>

					<ScrollView
						style={{ width: '100%' }}
						contentContainerStyle={styles.container}
					>
						{
							data.map((item) => <EventItem key={item.id} />)
						}
					</ScrollView>
				</View>
				<Text appearance='hint' style={{ margin: 16, marginBottom: 4 }}>A VENIR</Text>
				<ScrollView style={{ width: '100%' }} contentContainerStyle={styles.container}>
					{
						data.map((item) => <EventItem key={item.id} />)
					}
				</ScrollView>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
});
