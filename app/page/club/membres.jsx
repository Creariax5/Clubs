import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { Layout, Divider, Text, Avatar, List, ListItem, Icon, TabBar } from '@ui-kitten/components';
import database from '@react-native-firebase/database';
import { router } from 'expo-router';


const renderItemIcon = (props) => (
    <Avatar style={{ marginRight: 6, marginLeft: 6 }} size='giant' source={require('../../../assets/images/avatar.png')} />
);

const mailPress = (id) => (
    router.push(`page/${id}`)

);

const EmailIcon = (props) => (
    <TouchableOpacity onPress={() => mailPress(props.id)}>
        <Icon
            style={{ padding: 8 }}
            {...props}
            name='paper-plane-outline'
        />
    </TouchableOpacity>
);

const pressed = (id) => (
    console.log(id)
    //router.push(`page/${id}`)

);

const renderItem = ({ item, index }) => (
    <ListItem
        title={`${item.name}`}
        description={`En ligne il y a ${index + 1} h`}
        accessoryLeft={renderItemIcon}
        accessoryRight={<EmailIcon id={item.id} />}
        onPress={() => pressed(item.id)}
    />
);

export default function Membres({ members }) {
    const [member, setMember] = React.useState([]);

    const getMember = async () => {
        const reference = database().ref(`/users`);

        reference.once('value').then(snapshot => {
            if (snapshot.exists()) {
                users = snapshot.val();
                let usersKeys = Object.keys(users);
                let memberData = [];

                for (let i = 0; i < usersKeys.length; i++) {
                    let key = usersKeys[i];
                    if (members.includes(key)) {  // Check if the list value matches the dictionary key
                        users[key]["id"] = key;
                        memberData.push(users[key]);  // Append the corresponding value to list2
                    }
                }

                setMember(memberData)
            }
        });
    };

    React.useEffect(() => {
        getMember();
    }, []);

    return (
        <Layout style={{ padding: 16, }}>
            <List
                data={member}
                ItemSeparatorComponent={Divider}
                renderItem={renderItem}
            />
        </Layout>

    );
}

const styles = StyleSheet.create({

});

