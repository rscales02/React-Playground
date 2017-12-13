import React from 'react'
import Markdown from '../Markdown/Markdown';
import LeaderBoard from '../LeaderBoard/Components/LeaderBoard'
import RecipeBox from '../RecipeBox/Components/RecipeBox'

export default class Switcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 'RecipeBox'
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
            "RecipeBox": <RecipeBox />
        }
        let selectedComponent = pageMap[this.state.id]
        return (
            <div>
                <button href="#" id="LeaderBoard" onClick={this.handleSwitch}>Leader Board</button>
                <button href="#" id="Markdown" onClick={this.handleSwitch}>Markdown</button>
                <button href="#" id="RecipeBox" onClick={this.handleSwitch}>Recipe Box</button>
                <div id="mount">{
                    selectedComponent
                }</div>
            </div>
        )
    }
}