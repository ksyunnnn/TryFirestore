import React, { Component } from 'react';
import { firebaseDb } from './firebase/'
import './index.css'

import { Header, Contents } from './components'

/*
  sampledata = {
  first: "Ada",
  last: "Lovelace",
  born: 1815
  }
*/
const DataSetAction = (target,data) => {
  firebaseDb.collection(target).add(data)
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

// DataSetAction('users',{
//   first: "Test",
//   last: "User",
//   born: 1815
// })

const DataGetAction = (target) => {
  let dataList = [];

  firebaseDb.collection(target).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          dataList.push(doc.data());
          // console.log("push data",doc.data())
      });
  });

  return dataList;
}

console.log("debug",DataGetAction('users'))

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Contents
          users={DataGetAction('users')}
          />
      </div>
    );
  }
}

export default App;
