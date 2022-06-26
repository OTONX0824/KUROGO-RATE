const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {
    async
} = require('@firebase/util');
admin.initializeApp();


exports.test = functions.firestore
    .document('test/{testId}')
    .onCreate(async(_, __) => {
        console.log('----------------start function--------------------')


        const allProject = await admin.firestore().collection('project').get();
        allProject.docs.forEach(async(project) => {
            await ratingInProject(project).then((_) => {
                makeRanking(project);
            });
        })

        async function ratingInProject(project) {
            const allUsers = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').get();
            allUsers.docs.forEach(async(user) => {
                const recieveRating = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).collection('RecieveRating').orderBy('Rate', 'desc').limit(10).get();
                console.log(user.id);
                let reviews = [];
                let rates = [];
                for (i = 0; i < recieveRating.docs.length; i++) {
                    const review = {
                        "rank": i + 1,
                        "Comment": recieveRating.docs[i].data().Comment,
                        "Rate": recieveRating.docs[i].data().Rate,
                        "SendUID": recieveRating.docs[i].data().SendUID ? recieveRating.docs[i].data().SendUID : "",
                    };
                    rates.push(parseFloat(recieveRating.docs[i].data().Rate));
                    reviews.push(review);
                }
                let total = 0;
                rates.forEach((rate) => {
                    total += rate;
                });
                const average = total / rates.length;
                if (user.data().hasOwnProperty('averageRate')) {
                    await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).update('averageRate', average);
                    await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).update('topReviews', reviews);
                } else {
                    await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).set({
                        'averageRate': average
                    }, {
                        merge: true
                    });
                    await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).set({
                        'topReviews': reviews
                    }, {
                        merge: true
                    });
                }
            });
        }


        async function makeRanking(project) {
            const topFiveUser = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').orderBy('averageRate', 'desc').limit(5).get();
            let users = [];
            for (i = 0; i < topFiveUser.docs.length; i++) {
                const user = {
                    "rank": i + 1,
                    "averageRate": topFiveUser.docs[i].data().averageRate ? topFiveUser.docs[i].data().averageRate : 0,
                    "ArtistName": topFiveUser.docs[i].data().ArtistName ? topFiveUser.docs[i].data().ArtistName : "",
                    "SongName": topFiveUser.docs[i].data().SongName ? topFiveUser.docs[i].data().SongName : "",
                    "UID": topFiveUser.docs[i].id,
                    "YouTubeID": topFiveUser.docs[i].data().YouTubeID ? topFiveUser.docs[i].data().YouTubeID : "",
                };
                console.log(user);
                users.push(user);
            }
            if (project.data().hasOwnProperty('ranking')) {
                await admin.firestore().collection('project').doc(project.id).update('ranking', users);
            } else {
                await admin.firestore().collection('project').doc(project.id).set({
                    'ranking': users
                }, {
                    merge: true
                });
            }

        }

    });

exports.putTopTenData = functions.pubsub.schedule('every 24 hours').onRun(async(_) => {
    console.log('----------------start function--------------------')


    const allProject = await admin.firestore().collection('project').get();
    allProject.docs.forEach(async(project) => {
        await ratingInProject(project).then((_) => {
            makeRanking(project);
        });
    })

    async function ratingInProject(project) {
        const allUsers = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').get();
        allUsers.docs.forEach(async(user) => {
            const recieveRating = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).collection('RecieveRating').orderBy('Rate', 'desc').limit(10).get();
            console.log(user.id);
            let reviews = [];
            let rates = [];
            for (i = 0; i < recieveRating.docs.length; i++) {
                const review = {
                    "rank": i + 1,
                    "Comment": recieveRating.docs[i].data().Comment,
                    "Rate": recieveRating.docs[i].data().Rate,
                    "SendUID": recieveRating.docs[i].data().SendUID ? recieveRating.docs[i].data().SendUID : "",
                };
                rates.push(parseFloat(recieveRating.docs[i].data().Rate));
                reviews.push(review);
            }
            let total = 0;
            rates.forEach((rate) => {
                total += rate;
            });
            const average = total / rates.length;
            if (user.data().hasOwnProperty('averageRate')) {
                await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).update('averageRate', average);
                await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).update('topReviews', reviews);
            } else {
                await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).set({
                    'averageRate': average
                }, {
                    merge: true
                });
                await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).set({
                    'topReviews': reviews
                }, {
                    merge: true
                });
            }
        });
    }


    async function makeRanking(project) {
        const topFiveUser = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').orderBy('averageRate', 'desc').limit(5).get();
        let users = [];
        for (i = 0; i < topFiveUser.docs.length; i++) {
            const user = {
                "rank": i + 1,
                "averageRate": topFiveUser.docs[i].data().averageRate ? topFiveUser.docs[i].data().averageRate : 0,
                "ArtistName": topFiveUser.docs[i].data().ArtistName ? topFiveUser.docs[i].data().ArtistName : "",
                "SongName": topFiveUser.docs[i].data().SongName ? topFiveUser.docs[i].data().SongName : "",
                "UID": topFiveUser.docs[i].id,
                "YouTubeID": topFiveUser.docs[i].data().YouTubeID ? topFiveUser.docs[i].data().YouTubeID : "",
            };
            console.log(user);
            users.push(user);
        }
        if (project.data().hasOwnProperty('ranking')) {
            await admin.firestore().collection('project').doc(project.id).update('ranking', users);
        } else {
            await admin.firestore().collection('project').doc(project.id).set({
                'ranking': users
            }, {
                merge: true
            });
        }

    }
});