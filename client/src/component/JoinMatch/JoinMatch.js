import React from 'react';
import { browserHistory } from 'react-router';
import JoinMatchData from './JoinMatchData.js';
import Profile from '../Home/Profile.js';
import userProfile from '../userProfile.js';

class JoinMatch extends React.Component {
  constructor(props) {
	  super(props);
	  this.state = {
	    user: null,
      liveMatches: []
	  };
  }

  componentWillMount() {
    if(userProfile.User === 'Guest') {
      if(window.localStorage.id) {
        $.ajax({
          url: '/api/getUserByFacebookID/' + window.localStorage.id,
          method: 'Get',
          success: (data) => {
            userProfile.User = data.username;
            userProfile.Skins = data.skins || [];
            userProfile.facebookid = data.facebookid;
            userProfile.userId = data.id;
            // userProfile.FacebookPicture = data.FacebookPicture;
            browserHistory.push('JoinMatch')
          },
          error: (error) => {
            console.log(error)
          }
        })
      }
    }
    $.ajax({
      url: '/api/liveGames',
      method: 'GET',
      success: (data) => {
        this.setState({liveMatches: JSON.parse(data)})
      }
    })
  }

  backToHome() {
    browserHistory.push('/Home');
  }

  selectSkin() {
    browserHistory.push('/SelectSkin')
  }

  render() {
    return (
      <div className='menuContainer'>
        <div id='Profile'>
          <Profile />
        </div>
        <div className='menuBackground'>
          <div className='buttonBox'>
            <button className='btn btn-primary homeBtn' onClick={this.backToHome}>◀ Back</button>
            <h1>Join Match</h1>
            <button className='btn btn-warning selectSkinBtn' onClick={this.selectSkin}>Select Skin</button>
          </div>
          <div id='JoinMatchData'>
            <div id='JoinMatchTable'>
              <div className='JoinMatchHeader'>
                <div className='JoinMatchSpan'>Map</div>
                <div className='JoinMatchSpan'>Host</div>
                <div className='JoinMatchSpan'>Players</div>
                <div className='JoinMatchSpan'></div>
              </div>
              <div className='JoinMatchBody'>
                {this.state.liveMatches.map((match) => <JoinMatchData key={match.matchId} match={match} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default JoinMatch;