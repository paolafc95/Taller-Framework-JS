import Vue from "vue";
import Vuex from "vuex";
import {db} from "./main";
import firebase from "firebase/app";

Vue.use(Vuex);

export default new Vuex.Store({

    state: {
        users: [],
        campuses: [],
    },

    mutations: {
        addToCampuses(state, payload){
            try{
                payload.id=((state.campuses.length) - 1) + 1;
                db.collection('campuses').add(payload);

                db.collection("campuses").get().then(up => {
                    up.forEach(doc => {
                        if(doc.data().id === payload.id){
                            payload.id = doc.id;
                            db.collection("campuses").doc(doc.id).update(payload);
                            state.dependencies.push(payload);
                        }
                    });
                });
            }catch(error){
                console.log(error);
            }
        },

        addToUsers(state, payload){
            try{
                payload.id = ((state.users.length) - 1) + 1;
                db.collection('users').add(payload);

                db.collection("users").get().then(up => {
                    up.forEach(doc => {
                        if(doc.data().id === payload.id){
                            payload.id = doc.id;
                            db.collection("users").doc(doc.id).update(payload);
                            state.users.push(payload);
                        }
                    });
                });
                
                state.campuses.forEach(dep => {
                    if(dep.id === payload.campus){
                        dep.users.push(payload);
                    }
                });

                db.collection("campuses").get().then((dep) => {
                    dep.forEach(doc => {
                        if(doc.date().id === payload.campus){
                            db.collection("campuses").doc(doc.id).update({
                                users: firebase.firestore.FieldValue.arrayUnion(payload)
                            });
                        }
                    })
                });

            }catch(error){
                console.log(error);
            }
        },

        editUsers(state, payload){
            let newUser = state.users.find(usr => usr.id === payload.id);

            if(payload.campus === newUser.campus){
                let index = state.users.indexOf(newUser);
                state.users[index] = payload;

                state.campuses.forEach(dep => {
                    dep.users.forEach((usr, index) => {
                        if(payload.id === usr.id){
                            dep.users[index] = payload;
                        }
                    });
                });
            }else{
                state.campuses.forEach(dep => {
                    if(dep.id === newUser.campus){
                        dep.users.splice(newUser, 1);
                    }
                });
                let index = state.users.indexOf(newUser);
                state.users[index] = payload;

                state.campuses.forEach(dep => {
                    if(dep.id === payload.campus){
                        dep.users.push(payload);
                    }
                });
            }

            this.state.users.forEach(usr => {
                db.collection("users").get().then(us => {
                    us.forEach(doc => {
                        if(usr.id === doc.data().id){
                            db.collection("users").doc(doc.id).update(usr);
                        }
                    });
                });
            });

            this.state.dependencies.forEach(dep => {
                db.collection("campuses").get().then(us => {
                    us.forEach(doc => {
                        if(dep.id === doc.data().id){
                            db.collection("campuses").doc(doc.id).update(dep);
                        }
                    });
                });
            });
        },
        
        editCampus(state, payload){
            try{
                db.collection("campuses").get().then(upd => {
                    upd.forEach(doc => {
                        if(doc.data().id === payload.id){
                            db.collection("campuses").doc(doc.id).update(payload);
                        }
                    })
                });

                let newDep = state.campuses.find(us => us.id === payload.id);
                let index = state.campuses.indexOf(newDep);
                state.campuses[index] = payload;
            }catch(error){
                console.log(error);
            }
        },

        deleteUsers(state, payload){
            try{
                db.collection("users").get().then(usr => {
                    usr.forEach(doc => {
                        if(doc.data().id === payload.id){
                            db.collection("users").doc(doc.id).delete();
                        }
                    });
                });

                db.collection("campuses").get().then(dep => {
                    dep.forEach(doc => {
                        doc.data().users.forEach(usr => {
                            if(usr.id === payload.id){
                                db.collection("campuses").doc(doc.id).update({
                                    users: firebase.firestore.FieldValue.arrayRemove(payload)
                                });
                            }
                        });
                    });
                });

                state.users.forEach((usr, index) => {
                    if(usr.id === payload.id){
                        state.users.splice(index, 1);
                    }
                });

                state.dependencies.forEach(dep => {
                    if(dep.users.includes(payload)){
                        dep.users.splice(payload, 1);
                    }
                });
            }catch(error){
                console.log(error);
            }
        },

        deleteCampus(state, payload){
            if(payload.users.length <= 0){
                db.collection("campuses").get().then(upd => {
                    upd.forEach(doc => {
                        if(doc.data().id === payload.id){
                            db.collection("campuses").doc(doc.id).delete();
                        }
                    });
                });

                state.campuses.forEach((dep, index) => {
                    if(dep.id === payload.id){
                        state.campuses.slice(index, 1);
                    }
                });
            }
        },
    },

    actions: {
        addToUsers({commit}, payload){
            commit("addToUsers", payload);
        },
        addToCampuses({commit}, payload){
            commit("addToCampuses", payload);
        },
        deleteUsers({commit}, payload){
            commit("deleteUsers", payload);
        },
        editUsers({commit}, payload){
            commit("editUsers", payload);
        },
        editCampus({commit}, payload){
            commit("editCampus", payload);
        },
        deleteCampus(state, payload){
            this.commit("deleteCampus", payload);
        },
    },
});