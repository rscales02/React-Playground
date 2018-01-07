import React from 'react'
import Markdown from '../Markdown/Markdown';
import LeaderBoard from '../LeaderBoard/Components/LeaderBoard'
import RecipeBoxApp from '../RecipeBox/Components/RecipeBoxApp'
import Life from '../Life/Components/Life'
import AppContainer from '../Dungeons-and-Dorks/Components/AppContainer'
import Example from '../Example/Example'

export default class Switcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'Dungeon'
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
            // "LeaderBoard": <LeaderBoard />,
            // "Markdown": <Markdown />,
            // "RecipeBox": <RecipeBoxApp />,
            // "Life": <Life />,
            "Dungeon": <AppContainer />,
            /* "Example": <Example /> */
        }
        let selectedComponent = pageMap[this.state.id]
        return (
            <div>
                <button href="#" id="LeaderBoard" onClick={this.handleSwitch}>Leader Board</button>
                <button href="#" id="Markdown" onClick={this.handleSwitch}>Markdown</button>
                <button href="#" id="RecipeBox" onClick={this.handleSwitch}>Recipe Box</button>
                <button href="#" id="Life" onClick={this.handleSwitch}>Life</button>
                <button href="#" id="Dungeon" onClick={this.handleSwitch}>Dungeon</button>
                <button href="#" id="Example" onClick={this.handleSwitch}>Example</button>
                <div id="mount">{selectedComponent}</div>
            </div>
        )
    }
}
