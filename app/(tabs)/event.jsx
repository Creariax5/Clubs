import { ScrollView, StyleSheet, View } from 'react-native';
import { Layout, Text, List } from '@ui-kitten/components';
import EventItem from '../../components/eventItem'

const data = [
	{
		"id": "0",
		"title": "Cardio",
		"description": "Séance de cardio en bord de mer le soir. Rejoignez-nous pour une session énergisante et revitalisante en profitant de la vue magnifique sur la mer Méditerranée.",
		"date": "10 February 18h30-20h30",
		"place": "Nice"
	},
	{
		"id": "1",
		"title": "Yoga Matinal",
		"description": "Commencez votre journée avec une séance de yoga matinale en plein air. Respirez profondément et étirez-vous en douceur dans un cadre naturel paisible.",
		"date": "15 February 07h00-08h00",
		"place": "Marseille"
	},
	{
		"id": "2",
		"title": "Randonnée en Montagne",
		"description": "Participez à une randonnée guidée en montagne et découvrez des paysages époustouflants. Une activité parfaite pour les amateurs de nature et de plein air.",
		"date": "22 February 09h00-16h00",
		"place": "Grenoble"
	}

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
							data.map((item) => <EventItem key={item.id} item={item} />)
						}
					</ScrollView>
				</View>
				<Text appearance='hint' style={{ margin: 16, marginBottom: 4 }}>A VENIR</Text>
				<ScrollView style={{ width: '100%' }} contentContainerStyle={styles.container}>
					{
						data.map((item) => <EventItem key={item.id} item={item} />)
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
