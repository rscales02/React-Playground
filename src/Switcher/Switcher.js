import React from 'react'
import Markdown from '../Markdown/Markdown';
import LeaderBoard from '../LeaderBoard/Components/LeaderBoard'
import RecipeBoxApp from '../RecipeBox/Components/RecipeBoxApp'
import Life from '../Life/Components/Life'
// import Dungeon from '../Dungeons-and-Dorks/Components/Dungeon'
import TravelApp from '../WikiTravelApp/TravelApp'

export default class Switcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'Life'
        }
        this.handleSwitch = this.handleSwitch.bind(this)
    }

    handleSwitch(e) {
        this.setState({
            id: e.target.id
        });
    }

    render() {
        let pageMap = {
            "LeaderBoard": <LeaderBoard />,
            "Markdown": <Markdown />,
            "RecipeBox": <RecipeBoxApp />,
            "Life": <Life />,
            // "Dungeon": <Dungeon />,
            "TravelApp": <TravelApp />
        }
        let selectedComponent = pageMap[this.state.id]
        return (
            <div>
                <button href="#" id="LeaderBoard" onClick={this.handleSwitch}>Leader Board</button> 
                <button href="#" id="Markdown" onClick={this.handleSwitch}>Markdown</button>
                <button href="#" id="RecipeBox" onClick={this.handleSwitch}>Recipe Box</button> 
                <button href="#" id="Life" onClick={this.handleSwitch}>Life</button>
                {/* <button href="#" id="Dungeon" onClick={this.handleSwitch}>Dungeon</button> */}
                <button href="#" id="TravelApp" onClick={this.handleSwitch}>Travel App</button>
                <div id="mount">{selectedComponent}</div>
            </div>
        )
    }
}
