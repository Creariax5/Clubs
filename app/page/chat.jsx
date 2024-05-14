import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Input, Text, Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import MessageBulb from '../../components/messageBulb.jsx'
import moment from 'moment';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const data = [
    {
        id: '0',
        sender: 'Florian',
        message: 'Salut ça va',
        time: '10/05/24-19:12',
    },
    {
        id: '1',
        sender: 'Julie',
        message: 'Oui et toi',
        time: '10/05/24-19:14',
    },
    {
        id: '2',
        sender: 'Julie',
        message: 'tu fais quoi',
        time: '10/05/24-19:15',
    },
    {
        id: '3',
        sender: 'Florian',
        message: "Je vais bien, merci! Je travaille sur un projet pour l'école. Et toi?",
        time: '10/05/24-19:17',
    },
    {
        id: '4',
        sender: 'Julie',
        message: 'Je suis chez moi, je regarde un film. Quel genre de projet?',
        time: '10/05/24-19:18',
    },
    {
        id: '5',
        sender: 'Florian',
        message: "C'est un projet de science sur les effets du changement climatique.",
        time: '10/05/24-19:20',
    },
    {
        id: '6',
        sender: 'Julie',
        message: "Ah, ça a l'air intéressant! Tu as besoin d'aide?",
        time: '10/05/24-19:22',
    },
    {
        id: '7',
        sender: 'Florian',
        message: 'Oui, je pourrais utiliser un coup de main pour collecter des données. Tu serais disponible demain?',
        time: '10/05/24-19:23',
    },
    {
        id: '8',
        sender: 'Julie',
        message: "D'accord, je serai là. Tu veux qu'on se retrouve à quelle heure?",
        time: '10/05/24-19:25',
    },
    {
        id: '9',
        sender: 'Florian',
        message: 'Disons vers 10 heures du matin?',
        time: '10/05/24-19:27',
    },
    {
        id: '10',
        sender: 'Julie',
        message: 'Parfait, je serai prête. On se voit demain alors!',
        time: '10/05/24-19:28',
    },
    {
        id: '11',
        sender: 'Florian',
        message: 'Super, à demain!',
        time: '10/05/24-19:30',
    },
    {
        id: '12',
        sender: 'Luc',
        message: 'Salut les amis, que faites-vous de beau ce soir?',
        time: '10/05/24-19:32',
    },
    {
        id: '13',
        sender: 'Julie',
        message: 'Salut Luc, on discute juste. Et toi?',
        time: '10/05/24-19:33',
    },
    {
        id: '14',
        sender: 'Luc',
        message: 'Je vais sortir avec des amis. Peut-être faire un tour en ville.',
        time: '10/05/24-19:35',
    },
    {
        id: '15',
        sender: 'Florian',
        message: 'Ça sonne bien! Amuse-toi bien.',
        time: '10/05/24-19:36',
    },
    {
        id: '16',
        sender: 'Julie',
        message: 'Oui, passe une bonne soirée Luc!',
        time: '10/05/24-19:38',
    },
    {
        id: '17',
        sender: 'Luc',
        message: 'Merci, à plus tard!',
        time: '10/05/24-19:40',
    },
    {
        id: '18',
        sender: 'Florian',
        message: "Tu veux qu'on continue notre discussion sur le projet?",
        time: '10/05/24-19:42',
    },
    {
        id: '19',
        sender: 'Julie',
        message: 'Bien sûr, parlons-en.',
        time: '10/05/24-19:44',
    }
];

const renderIcon = (props) => (
    <TouchableOpacity>
        <Icon
            {...props}
            name='image-outline'
        />
    </TouchableOpacity>
);

const backIcon = (props) => (
    <Icon
        {...props}
        onPress={() => router.back()}
        name='arrow-back'
    />
);


export default function Chat() {
    const [value, setValue] = React.useState('');
    const scrollViewRef = React.useRef();

    function send() {
        data.push(
            {
                id: data.length + 2,
                sender: 'Florian',
                message: value,
                time: moment().utcOffset('+01:00').format('DD/MM/YYYY/HH:mm'),
            },
        );
        setValue('');
    }

    const renderSend = (props) => (
        <TouchableOpacity
            onPress={send}
        >
            <Text
                style={styles.text}
                appearance={value == '' ? 'hint' : 'default'}
                status={value == '' ? 'basic' : 'primary'}
                category='h6'
            >
                ENVOYER
            </Text>
        </TouchableOpacity>
    );

    const renderBackAction = () => (
        <TopNavigationAction style={styles.logo} icon={backIcon} />
    );

    return (
        <Layout
            level='1'
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TopNavigation
                    alignment='center'
                    accessoryLeft={renderBackAction}
                    title='Roger'
                    subtitle='Subtitle'
                    maxHeight={100}
                />
                    <ScrollView
                        style={{ width: '100%' }}
                        contentContainerStyle={styles.container}
                        ref={scrollViewRef}
                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    >
                        {
                            data.map((item) => <MessageBulb key={item.id} sender={item.sender} message={item.message} />)
                        }
                    </ScrollView>
                <Input
                    placeholder='Place your Text'
                    value={value}
                    onChangeText={nextValue => setValue(nextValue)}
                    style={styles.messageBar}
                    accessoryLeft={renderIcon}
                    accessoryRight={renderSend}
                    size='large'
                    multiline={true}
                />
            </SafeAreaView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    messageBar: {
        padding: 16,
        paddingTop: 0,
        backgroundColor: 'transparent',
        width: '100%',
        maxHeight: 120,
    },
    logo: {
		padding: 16,
	},
});

