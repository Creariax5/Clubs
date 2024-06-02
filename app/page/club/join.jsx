import database from '@react-native-firebase/database';
import moment from 'moment';


export default function joinClub(id, userInfo, name, setModalVisible) {
    const ref = database().ref(`/users/${userInfo.uid}/clubID/`);
    ref.once('value').then(snapshot => {
        //si deja dans un club
        if (snapshot.exists()) {
            console.log("deja dans un club")
        } else {
            setModalVisible(true);

            const ref0 = database().ref(`/club/${id}/members/`);

            var leng = null;
            ref0.once('value').then(snapshot => {
                if (snapshot.exists()) {
                    leng = snapshot.val().length;
                } else {
                    leng = 0;
                }
                //add to club
                const reference = database().ref(`/club/${id}/members/${leng}`);
                reference.set(
                    userInfo.uid
                );

                ref.set(
                    id
                );
            });

            //create club conv if not exist
            //else add you to the conv
            const ref1 = database().ref(`/club/${id}/convID/`);
            leng = null;
            ref1.once('value').then(snapshot => {
                if (snapshot.exists()) {
                    console.log("exist")

                    let convID = snapshot.val();
                    const ref5 = database().ref(`/conv/${convID}/users/`);
                    ref5.once('value').then(snapshot => {
                        leng = snapshot.val().length;
                        const ref6 = database().ref(`/conv/${convID}/users/${leng}`);
                        ref6.set(
                            userInfo.uid
                        );
                    })
                } else {
                    console.log("don't exist")

                    const ref2 = database().ref(`/conv/`);
                    ref2.once('value').then(snapshot => {
                        if (snapshot.exists()) {
                            leng = snapshot.val().length;
                        } else {
                            leng = 0;
                        }

                        //create conv
                        const ref4 = database().ref(`/conv/${leng}`);
                        ref4.set({
                            title: name,
                            users: [userInfo.uid],
                            messages: [
                                {
                                    id: 0,
                                    message: "création du groupe",
                                    sender: "systeme",
                                    time: moment().utcOffset('+01:00').format('DD/MM/YYYY/HH:mm')
                                }
                            ]
                        });
                        //link to club
                        ref1.set(
                            leng
                        );
                    });

                }
            })
        }
    })

}