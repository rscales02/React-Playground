import React from 'react';
import Leaders from './Leaders';

require("../Style/LeaderBoard.scss");

const BASE_URL = 'https://fcctop100.herokuapp.com/api/fccusers/top/';


class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  getAllTimeData() {
    this.getData(BASE_URL + 'alltime')
  }

  getRecentData() {
    this.getData(BASE_URL + 'recent')
  }

  getData(url) {
    fetch(url).then(response => {
      response.json().then(json => this.setState({
        data: json,
      })).catch(error => console.error(error));
    }).catch(error => console.error(error));
  }

  componentWillMount() {
    this.getRecentData();
  }

  render() {
    const data = this.state.data

    const leaders = data.map( (item, index) => {
      return <Leaders userName={item.username} avatar={item.img} recent={item.recent} allTime={item.alltime} key={index} id={index + 1} />
    })
    
    return (
      <div className="leaderboard">
        <table>
          <tbody>
            <tr>
              <th colSpan="4" id="top"><h3 className="inline">Free Code Camp Leader Board</h3><img src="https://avatars0.githubusercontent.com/u/9892522?s=400&v=4" className="inline"/></th>
            </tr>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th><a href='#' onClick={this.getRecentData.bind(this)}>Points Last 30 Days</a></th>
              <th><a href='#' onClick={this.getAllTimeData.bind(this)}>Points All Time</a></th>
            </tr>
            {leaders}
          </tbody>
        </table>
      </div>
    );
  }
}
export default LeaderBoard
