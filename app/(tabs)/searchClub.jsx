import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Icon, Input, Layout, Text, ViewPager } from '@ui-kitten/components';
import ClubCard from '../../components/clubCard'
import CategoryCard from '../../components/categoryCard'

const categoryData = [
	{
		"id": "1",
		"sport": "Basketball",
		"emoji": "🏀"
	},
	{
		"id": "2",
		"sport": "Football",
		"emoji": "⚽"
	},
	{
		"id": "3",
		"sport": "Tennis",
		"emoji": "🎾"
	},
	{
		"id": "4",
		"sport": "Swimming",
		"emoji": "🏊"
	},
	{
		"id": "5",
		"sport": "Running",
		"emoji": "🏃"
	},
	{
		"id": "6",
		"sport": "Cycling",
		"emoji": "🚴"
	},
	{
		"id": "7",
		"sport": "Golf",
		"emoji": "⛳"
	},
	{
		"id": "8",
		"sport": "Surfing",
		"emoji": "🏄"
	},
	{
		"id": "9",
		"sport": "Boxing",
		"emoji": "🥊"
	},
	{
		"id": "10",
		"sport": "Skiing",
		"emoji": "⛷️"
	},
	{
		"id": "11",
		"sport": "Snowboarding",
		"emoji": "🏂"
	},
	{
		"id": "12",
		"sport": "Volleyball",
		"emoji": "🏐"
	},
	{
		"id": "13",
		"sport": "Baseball",
		"emoji": "⚾"
	},
	{
		"id": "14",
		"sport": "Ice Hockey",
		"emoji": "🏒"
	},
	{
		"id": "15",
		"sport": "Table Tennis",
		"emoji": "🏓"
	},
	{
		"id": "16",
		"sport": "Badminton",
		"emoji": "🏸"
	},
	{
		"id": "17",
		"sport": "Rock Climbing",
		"emoji": "🧗‍♂️"
	},
	{
		"id": "18",
		"sport": "Archery",
		"emoji": "🏹"
	},
	{
		"id": "19",
		"sport": "Fencing",
		"emoji": "🤺"
	},
	{
		"id": "21",
		"sport": "Rowing",
		"emoji": "🚣"
	},
	{
		"id": "22",
		"sport": "Karate",
		"emoji": "🥋"
	},
	{
		"id": "23",
		"sport": "Taekwondo",
		"emoji": "🥋"
	},
	{
		"id": "24",
		"sport": "Judo",
		"emoji": "🥋"
	},
	{
		"id": "25",
		"sport": "Sailing",
		"emoji": "⛵"
	},
	{
		"id": "26",
		"sport": "Canoeing",
		"emoji": "🛶"
	},
	{
		"id": "27",
		"sport": "Rugby",
		"emoji": "🏉"
	},
	{
		"id": "28",
		"sport": "Ice Skating",
		"emoji": "⛸️"
	},
	{
		"id": "29",
		"sport": "Figure Skating",
		"emoji": "⛸️"
	},
	{
		"id": "30",
		"sport": "Skateboarding",
		"emoji": "🛹"
	},
	{
		"id": "31",
		"sport": "Surfboarding",
		"emoji": "🏄‍♂️"
	},
	{
		"id": "32",
		"sport": "Pole Vault",
		"emoji": "🏃‍♂️"
	},
	{
		"id": "33",
		"sport": "High Jump",
		"emoji": "🏃‍♂️"
	},
	{
		"id": "34",
		"sport": "Long Jump",
		"emoji": "🏃‍♂️"
	},
	{
		"id": "35",
		"sport": "Triple Jump",
		"emoji": "🏃‍♂️"
	},
	{
		"id": "36",
		"sport": "Pole Dance",
		"emoji": "👯‍♀️"
	},
	{
		"id": "37",
		"sport": "Ballet",
		"emoji": "💃"
	},
	{
		"id": "38",
		"sport": "Wrestling",
		"emoji": "🤼‍♂️"
	},
	{
		"id": "39",
		"sport": "Martial Arts",
		"emoji": "🥋"
	},
	{
		"id": "40",
		"sport": "Parkour",
		"emoji": "🏃‍♂️"
	},
	{
		"id": "41",
		"sport": "Trampoline",
		"emoji": "🤸‍♂️"
	},
	{
		"id": "42",
		"sport": "Bouldering",
		"emoji": "🧗‍♂️"
	},
	{
		"id": "43",
		"sport": "Gymnastics",
		"emoji": "🤸‍♂️"
	},
	{
		"id": "44",
		"sport": "Horseback Riding",
		"emoji": "🏇"
	},
	{
		"id": "45",
		"sport": "Pilates",
		"emoji": "🧘‍♀️"
	},
	{
		"id": "46",
		"sport": "Yoga",
		"emoji": "🧘‍♀️"
	},
	{
		"id": "47",
		"sport": "Aerobics",
		"emoji": "💃"
	},
	{
		"id": "48",
		"sport": "Zumba",
		"emoji": "💃"
	},
	{
		"id": "49",
		"sport": "Kickboxing",
		"emoji": "🥊"
	},
	{
		"id": "50",
		"sport": "Muay Thai",
		"emoji": "🥊"
	},
	{
		"id": "51",
		"sport": "Kung Fu",
		"emoji": "🥋"
	},
	{
		"id": "52",
		"sport": "CrossFit",
		"emoji": "🏋️‍♂️"
	},
	{
		"id": "53",
		"sport": "Powerlifting",
		"emoji": "🏋️‍♂️"
	},
	{
		"id": "54",
		"sport": "Weightlifting",
		"emoji": "🏋️‍♂️"
	},
	{
		"id": "55",
		"sport": "Bodybuilding",
		"emoji": "🏋️‍♂️"
	},
	{
		"id": "56",
		"sport": "Synchronized Swimming",
		"emoji": "🏊‍♂️"
	},
	{
		"id": "57",
		"sport": "Water Polo",
		"emoji": "🤽‍♂️"
	},
	{
		"id": "58",
		"sport": "Kiteboarding",
		"emoji": "🪁"
	},
	{
		"id": "59",
		"sport": "Bobsleigh",
		"emoji": "🛷"
	},
	{
		"id": "60",
		"sport": "Skeleton",
		"emoji": "☠️"
	},
	{
		"id": "61",
		"sport": "Luge",
		"emoji": "🛷"
	},
	{
		"id": "62",
		"sport": "Speed Skating",
		"emoji": "⛸️"
	},
	{
		"id": "63",
		"sport": "Biathlon",
		"emoji": "🎿"
	},
	{
		"id": "64",
		"sport": "Mountain Biking",
		"emoji": "🚵‍♂️"
	},
	{
		"id": "65",
		"sport": "Triathlon",
		"emoji": "🏊‍♂️🚴‍♂️🏃‍♂️"
	},
];

const clubData = [
	{
		"id": "1",
		"clubName": "Arkose Climbing",
		"sports": ["Climbing", "Weightlifting"],
		"emoji": ["🧗‍♂️", "🏋️‍♂️"],
		"description": "Come climb in a good mood!! We meet several times a week to climb and strengthen your muscles.",
	},
	{
		"id": "2",
		"clubName": "Zenith Yoga Studio",
		"sports": ["Yoga", "Meditation"],
		"emoji": ["🧘‍♂️", "🌿"],
		"description": "Find your inner peace and strength through yoga and meditation. Join us for rejuvenating sessions to calm your mind and energize your body.",
	},
	{
		"id": "3",
		"clubName": "Endurance Runners",
		"sports": ["Running"],
		"emoji": ["🏃‍♂️"],
		"description": "Join us for exhilarating runs through scenic routes. Whether you're a beginner or a seasoned runner, our club offers a supportive environment to improve your endurance and achieve your running goals.",
	},
	{
		"id": "4",
		"clubName": "Flow State Dance Academy",
		"sports": ["Dance"],
		"emoji": ["💃"],
		"description": "Experience the joy of movement and express yourself through dance! Our academy offers a variety of dance styles for all levels, from beginners to advanced. Join us to groove, connect, and find your flow on the dance floor.",
	},
	{
		"id": "5",
		"clubName": "Mindful Martial Arts Dojo",
		"sports": ["Martial Arts", "Mindfulness"],
		"emoji": ["🥋", "🧘‍♂️"],
		"description": "Discover the harmony between mind and body with our mindful approach to martial arts training. Our dojo focuses on traditional martial arts techniques combined with mindfulness practices to cultivate inner strength, resilience, and focus.",
	},
	{
		"id": "6",
		"clubName": "Aquatic Adventures",
		"sports": ["Swimming", "Scuba Diving"],
		"emoji": ["🏊‍♂️", "🤿"],
		"description": "Dive into the world of aquatic exploration with our club! Whether you're looking to improve your swimming skills or embark on underwater adventures through scuba diving, we offer a supportive community and expert guidance to help you explore the depths and enjoy the wonders of the water.",
	},
	{
		"id": "7",
		"clubName": "Mindful Movement Pilates",
		"sports": ["Pilates", "Mindfulness"],
		"emoji": ["🧘‍♀️", "💪"],
		"description": "Strengthen your body and mind with our mindful approach to Pilates. Our classes focus on core strength, flexibility, and mindfulness techniques to enhance overall well-being and body awareness. Join us to sculpt your body and calm your mind.",
	},
	{
		"id": "8",
		"clubName": "Trail Blazers Hiking Club",
		"sports": ["Hiking"],
		"emoji": ["🥾"],
		"description": "Embark on thrilling adventures with our hiking club! Explore scenic trails, conquer challenging terrain, and connect with nature while enjoying the camaraderie of fellow outdoor enthusiasts. Whether you're a seasoned hiker or new to the trails, our club welcomes all who seek adventure and exploration.",
	},
	{
		"id": "9",
		"clubName": "Urban Cyclists Collective",
		"sports": ["Cycling"],
		"emoji": ["🚴‍♂️"],
		"description": "Pedal your way to fitness and fun with our urban cycling collective! Join us for group rides through city streets, scenic routes, and challenging trails. Whether you're a casual rider or a cycling enthusiast, our collective offers a supportive community and exciting cycling adventures for all.",
	},
	{
		"id": "10",
		"clubName": "Mindful Movement Tai Chi",
		"sports": ["Tai Chi", "Mindfulness"],
		"emoji": ["🏮", "👣"],
		"description": "Experience the harmony of body and mind with Tai Chi! Our classes blend the ancient practice of Tai Chi with mindfulness techniques to promote relaxation, balance, and inner peace. Join us to cultivate physical and mental well-being through the gentle movements of Tai Chi.",
	},
	{
		"id": "11",
		"clubName": "High Spirits Cheerleading",
		"sports": ["Cheerleading"],
		"emoji": ["📣", "💃"],
		"description": "Join our energetic cheerleading squad and unleash your spirit! Whether you're passionate about stunts, dance, or cheering on the team, our club offers a supportive and inclusive environment for athletes of all skill levels. Get ready to spread positivity, teamwork, and high-flying fun!",
	},
	{
		"id": "12",
		"clubName": "Zen Archery Sanctuary",
		"sports": ["Archery", "Mindfulness"],
		"emoji": ["🏹", "🧘‍♂️"],
		"description": "Find your focus and inner calm with the ancient art of archery. Our sanctuary provides a tranquil setting for practicing archery techniques while incorporating mindfulness and meditation practices. Whether you're a beginner or an experienced archer, join us to sharpen your skills and cultivate a peaceful mind.",
	},
	{
		"id": "13",
		"clubName": "Gravity Defiers Parkour Crew",
		"sports": ["Parkour"],
		"emoji": ["🏃‍♂️", "🏞️"],
		"description": "Embrace the thrill of movement and defy gravity with our parkour crew! Explore urban landscapes, overcome obstacles, and unleash your creativity through the art of parkour. Whether you're a seasoned traceur or new to the discipline, our crew provides a supportive community and opportunities for exhilarating exploration.",
	},
	{
		"id": "14",
		"clubName": "Serenity Sailing Club",
		"sports": ["Sailing"],
		"emoji": ["⛵", "🌊"],
		"description": "Set sail on a journey of serenity and adventure with our sailing club! Whether you're a novice or an experienced sailor, join us to explore the open waters, feel the wind in your sails, and experience the beauty of seafaring. Our club offers sailing lessons, regattas, and social events for all enthusiasts.",
	},
	{
		"id": "15",
		"clubName": "Zen Tennis Academy",
		"sports": ["Tennis", "Mindfulness"],
		"emoji": ["🎾", "🧘‍♀️"],
		"description": "Elevate your tennis game and find inner peace on the court with our Zen Tennis Academy. Our approach combines tennis training with mindfulness techniques to enhance focus, concentration, and overall performance. Join us to improve your skills, connect with others, and experience the joy of tennis with a mindful twist.",
	},
	{
		"id": "16",
		"clubName": "Elevate Equestrian Club",
		"sports": ["Equestrian"],
		"emoji": ["🐎", "🌟"],
		"description": "Experience the beauty and grace of equestrian sports with our Elevate Equestrian Club. Whether you're a beginner or an experienced rider, join us to learn horseback riding skills, participate in equestrian events, and forge a deep connection with these majestic animals. Our club offers lessons, trail rides, and a supportive community for horse enthusiasts of all levels.",
	},
	{
		"id": "17",
		"clubName": "Ace Tennis Academy",
		"sports": ["Tennis"],
		"emoji": ["🎾"],
		"description": "Serve, volley, and ace your way to success with our tennis academy! Whether you're a beginner or a seasoned player, join us to improve your skills, participate in tournaments, and experience the thrill of competitive tennis. Our academy offers professional coaching, state-of-the-art facilities, and a supportive community of tennis enthusiasts.",
	},
	{
		"id": "18",
		"clubName": "Striker Soccer Club",
		"sports": ["Soccer"],
		"emoji": ["⚽"],
		"description": "Score goals and showcase your skills on the soccer field with our Striker Soccer Club! Join our team to train, compete, and experience the excitement of the world's most popular sport. Whether you're a striker, midfielder, defender, or goalkeeper, our club offers opportunities for players of all positions and abilities.",
	},
	{
		"id": "19",
		"clubName": "Hoops Basketball Academy",
		"sports": ["Basketball"],
		"emoji": ["🏀"],
		"description": "Dribble, shoot, and slam dunk with our basketball academy! Join us to improve your game, hone your skills, and compete in thrilling basketball tournaments. Whether you're a point guard, shooting guard, forward, or center, our academy offers expert coaching, state-of-the-art facilities, and a supportive environment to elevate your basketball skills.",
	},
	{
		"id": "20",
		"clubName": "Ace Volleyball Club",
		"sports": ["Volleyball"],
		"emoji": ["🏐"],
		"description": "Spike, block, and set your way to victory with our volleyball club! Join our team to train, compete, and experience the excitement of indoor and beach volleyball. Whether you're a hitter, setter, blocker, or libero, our club offers opportunities for players of all positions and skill levels to excel in the fast-paced and dynamic sport of volleyball.",
	},
];

var emojis = []

const renderIcon = (props) => (
	<Icon
		{...props}
		name='search-outline'
	/>
);

export default function SearchClub() {
	const [value, setValue] = React.useState('');
	const [showData, setShowData] = React.useState(categoryData);
	const [showClubData, setShowClubData] = React.useState(clubData);

	function onSearch(nextValue) {
		setValue(nextValue);
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
			emojis.splice(emojis.indexOf(emoji));
		}

		if (emojis == 0) {
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
					value={value}
					onChangeText={nextValue => onSearch(nextValue)}
					accessoryRight={renderIcon}
				/>
			</View>
			<Text style={styles.category} category='h1'>Categories</Text>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				automaticallyAdjustContentInsets={true}
				style={styles.container}
			>
				{
					showData.map((item) => <CategoryCard key={item.id} emoji={item.emoji} onSelect={onSelect} />)
				}
			</ScrollView>
			<Text style={styles.category} category='h1'>Les Clubs</Text>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				automaticallyAdjustContentInsets={true}
			>
				{
					showClubData.map((item) => <ClubCard key={item.id} name={item.clubName} description={item.description} />)
				}
			</ScrollView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
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
