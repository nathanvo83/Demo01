import React, {useState, useEffect} from 'react';
import './components/UserList'
import UserList from './components/UserList';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

// const API_URL = 'https://localhost:44332/api/myusersapi';
const API_URL = 'https://demo012019.azurewebsites.net/api/myusersapi';

// function Index() {
//   return <h2>Home</h2>;
// }

function App() {
  // const [state, setState] = useState(initialState)
  const [list, setStateList] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
    .then(
      res => setStateList(res.data)
      // console.log(res.data)  
    )
    .catch(
      err => console.log('err:', err)
    )
      return () => {
        // cleanup
      };
  }, []);

  function remove(id) {
    // delete from db
    axios.delete(`${API_URL}/${id}`)
    .then(res => {
      setStateList(list.filter(user=>user.id !== id))
    }, reason => {
      console.log("reject");
      setStateList(list);
    })
    
    // remove from list

  }

  // console.log('list:', list);

  return (
    <Router>
      {/* <Route path="/" exact component={Index} />
      <Route path="/about/" component={About} />
      <Route path="/users/" component={Users} /> */}
      <div className="App">
        <UserList list={list} remove={remove}></UserList>
      </div>
      <Route path="/" exact components={UserList} />
      {/* <Route path="/details"  components={UserDetails} /> */}


      
    </Router>    
  );
}

export default App;
