import React, { Component } from 'react';
import { firebaseDb } from './firebase/'
import './index.css'

import { Header, Contents } from './components'

class App extends Component {
  constructor(props) {
   super(props);

   this.state = {
     users: [],
   }

   this.pushUserAction = this.pushUserAction.bind(this);
 }
 fetchUserAllAction () {
   return firebaseDb
     .collection(`users`)
     .get()
     .then(querySnapshot => {
       return querySnapshot.docs.map(doc => {
         return doc.data();
       });
     })
     .catch(error => {
       console.warn('Error getting documents: ', error);
     });
 }

 pushUserAction(first,last,born) {
   firebaseDb.collection(`users`).add({
     first: first,
     last: last,
     born: born,
   })
     .then(docRef => {
        this.renderUsers();
        console.log("Document written with ID: ", docRef.id);
     })
     .catch(error => {
         console.error("Error adding document: ", error);
     });
   console.log("push!",`${first} ${last} ${born}`);
 }
  renderUsers() {
    this.fetchUserAllAction().then(res => {
        this.setState({
          users: res,
        });
        console.log(res);
      }).catch(error => {
        console.warn('Error getting documents: ', error);
      });
  }

  componentDidMount() {
    this.renderUsers();
  }



  render() {
    return (
      <div className="App">
        <Header />
        <Contents
          users={this.state.users}
          pushUserAction={this.pushUserAction}
          />
      </div>
    );
  }
}

export default App;
