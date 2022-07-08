const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {
    async
} = require('@firebase/util');
admin.initializeApp();


exports.secondTest = functions.region('asia-northeast1').firestore
    .document('test/{testId}')
    .onCreate(async(_, __) => {
        console.log('----------------start function--------------------')


        const allProject = await admin.firestore().collection('project').get();
        allProject.docs.forEach(async(project) => {
            await ratingInProject(project).then(async(_) => {
                await resetRanking(project).then(async(_) => {
                    await makeRanking(project);
                });
            });
        })

        async function ratingInProject(project) {
            const allUsers = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').get();
            allUsers.docs.forEach(async(user) => {
                const recieveRating = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).collection('RecieveRating').orderBy('Rate', 'desc').limit(10).get();
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

        async function resetRanking(project) {
            var users = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').get();
            users.docs.forEach(async(user) => {
                if (user.data().hasOwnProperty('rank')) {
                    await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).update({
                        'rank': null
                    }, {
                        merge: true
                    });
                }
            });
        }


        async function makeRanking(project) {
            let baseRate;
            let rank = 1;
            for (rank; rank <= 5; rank++) {
                let baseUser;
                if (rank == 1) {
                    baseUser = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').orderBy('averageRate', 'desc').limit(1).get();
                } else {
                    baseUser = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').orderBy('averageRate').endBefore(baseRate).get();
                }
                if (baseUser.length != 0) {
                    baseRate = baseUser.docs[baseUser.docs.length - 1].data().averageRate ? baseUser.docs[baseUser.docs.length - 1].data().averageRate : 0;
                    const rankTieUsers = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').where('averageRate', '==', baseRate).get();
                    rankTieUsers.forEach(async(user) => {
                        if (user.data().hasOwnProperty('rank')) {
                            await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).update('rank', rank);
                        } else {
                            await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).set({ 'rank': rank }, { merge: true });
                        }

                    })
                } else {
                    return;
                }
            }

        }

    });

exports.everyProjectRankingUpdate = functions.region('asia-northeast1').pubsub.schedule('every 24 hours').onRun(async(_) => {
    console.log('----------------start function--------------------')


    const allProject = await admin.firestore().collection('project').get();
    allProject.docs.forEach(async(project) => {
        await ratingInProject(project).then(async(_) => {
            await resetRanking(project).then(async(_) => {
                await makeRanking(project);
            });
        });
    })

    async function ratingInProject(project) {
        const allUsers = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').get();
        allUsers.docs.forEach(async(user) => {
            const recieveRating = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).collection('RecieveRating').orderBy('Rate', 'desc').limit(10).get();
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

    async function resetRanking(project) {
        var users = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').get();
        users.docs.forEach(async(user) => {
            if (user.data().hasOwnProperty('rank')) {
                await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).update({
                    'rank': null
                }, {
                    merge: true
                });
            }
        });
    }


    async function makeRanking(project) {
        let baseRate;
        let rank = 1;
        for (rank; rank <= 5; rank++) {
            let baseUser;
            if (rank == 1) {
                baseUser = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').orderBy('averageRate', 'desc').limit(1).get();
            } else {
                baseUser = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').orderBy('averageRate').endBefore(baseRate).get();
            }
            if (baseUser.length != 0) {
                baseRate = baseUser.docs[baseUser.docs.length - 1].data().averageRate ? baseUser.docs[baseUser.docs.length - 1].data().averageRate : 0;
                const rankTieUsers = await admin.firestore().collection('project').doc(project.id).collection('JoinUser').where('averageRate', '==', baseRate).get();
                rankTieUsers.forEach(async(user) => {
                    if (user.data().hasOwnProperty('rank')) {
                        await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).update('rank', rank);
                    } else {
                        await admin.firestore().collection('project').doc(project.id).collection('JoinUser').doc(user.id).set({ 'rank': rank }, { merge: true });
                    }

                })
            } else {
                return;
            }
        }

    }


});