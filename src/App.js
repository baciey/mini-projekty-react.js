import React, { Suspense } from 'react';
import './App.sass';
import ScrollToTop from 'react-router-scroll-top'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

//Navi Routes
import Home from './Home'
import Hangman from './hangman/Hangman'
import ToDoList from './todolist/ToDoList'
import Dbz from './dbz/Dbz'




class App extends React.Component {
  state = {
    width: 0,
  }


  render() {

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
          <>

            <Suspense fallback={<div className="loader centered" ></div>}>
              <Switch>
                <Route path="/" exact ><Home /></Route>
                <Route path="/hangman"><Hangman /></Route>
                <Route path="/dragon-ball-memory"><Dbz /></Route>
                <Route path="/to-do-list"><ToDoList /></Route>
              </Switch>
            </Suspense>
          </>
        </ScrollToTop >
      </Router >
    );
  }
}

export default App;
