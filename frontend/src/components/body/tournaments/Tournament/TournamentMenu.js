import React from 'react'
import { Link, Route} from'react-router-dom';

import Matches from './Matches';
import Teams from './Teams';

const TournamentMenu = (tournament1)=> {
    const {tournament} = tournament1; 
    return (
        <div>
            <Link to={"/tournaments/"+tournament.name}>{tournament.name}</Link>
            <Link to={"/tournaments/"+tournament.name+"/matches"}>Ottelut</Link>
            <Link to={"/tournaments/"+tournament.name+"/teams"}>Joukkueet</Link>

            <Route path={"/tournaments/"+tournament.name+"/matches"} component={Matches}/>
            <Route path={"/teams/"+tournament.name+"/teams"} component={Teams}/>
        </div>  
    )
}
export default TournamentMenu;