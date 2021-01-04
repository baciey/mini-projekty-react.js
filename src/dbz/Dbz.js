import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import OnePlayer from './OnePlayer'
import TwoPlayers from './TwoPlayers'
import Home from './Home'
// import './css/index.css'

function Dbz() {
  let { path, url } = useRouteMatch();

  return (
    // basename={process.env.PUBLIC_URL}
    <>
      <section className="dragon-ball">
        <Switch>
          <Route exact path={path}  ><Home url={url} /></Route>
          <Route path={`${path}/1gracz`} ><OnePlayer /></Route>
          <Route path={`${path}/2graczy`}><TwoPlayers /></Route>
        </Switch>
      </section>
    </>
  )
}



export default Dbz;

