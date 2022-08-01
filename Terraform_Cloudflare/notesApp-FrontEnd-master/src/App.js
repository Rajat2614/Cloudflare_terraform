import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';

import AddNotes from './components/user/addNote';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path='/addNotes' component={AddNotes}></Route>
        <Redirect from='*' to='/addNotes'></Redirect>
      </Switch>
      
    </Router>
    
  );
}

export default App;
