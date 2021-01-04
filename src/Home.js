import React from 'react';
import { Link } from 'react-router-dom'

import dbz from './img/dbzMemory.png'
import hangman from './img/hangman.png'
import toDo from './img/toDoList.png'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Mini Projekty React.js</h1>
      <div className="flex-child">

      <Link to="/dragon-ball-memory">
          <p>Gra w pamięć</p>
          <img src={dbz} alt=""/>
          </Link>
          </div>
          <div className="flex-child">

          <Link to="/hangman">
            <p>Gra w szubienicę</p>
              <img src={hangman} alt=""/>
        </Link>
        </div>
        <div className="flex-child">

        <Link to="/to-do-list">
            <p>Lista zadań</p>
            <img src={toDo} alt=""/>
          </Link>
          </div>

    </div>
  );
}

export default Home;