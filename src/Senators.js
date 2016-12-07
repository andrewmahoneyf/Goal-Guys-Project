import React from 'react';
import Modal from 'react-bootstrap';
import Controller from './Controller';
import _ from 'lodash';
import senatorsData from './SenatorsData';
import sampleVotingRecord from './sampleVotingRecord';

var STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

//Show user a bill and have them guess whether or not a particular senator supported it.
class SenatorGuessPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usState: '',
      senatorName: '',
      senatorId: '',
      votingRecord: []
    }
  }

  setUpGame() {
    /*var thisComponent = this;
    Controller.getCurrentSenators()
      .then(function(data) {
        console.log(data);
        thisComponent.setState({
          senators:data['objects']
        })
      });*/
  }

  componentWillMount() {
    //this.setUpGame();
    Controller.getSenatorVotingRecord('400222')
      .then(function(data) {
        console.log(data);
        /*thisComponent.setState({
          vorintRecord: data["objects"]
        })*/
      })
    this.setState({
      usState: 'Washington',
      senatorName: 'Mark Kirk',
      senatorId: '400222',
      votingRecord: sampleVotingRecord['objects']
    });
  }

  handleChange(event) {

  }

  render() {
    return (
      <div className="guessing-game-box">
        <h2>Senator Guessing Game</h2>
        <label htmlFor='searchSenator'>Enter Your Senator: </label>
        <input type='text' id='searchSenator' name='search-senator' />

        <h3 className="senator-name">Current Senator: {this.state.senatorName}</h3>
        {console.log(this.state.votingRecord)}
        <SenatorGuess votingRecord={this.state.votingRecord} />
      </div>
    );
  }
}

class SenatorGuess extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      currentVote: {},
      vote: ""
    }
    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  /*pickSenator() {
    var shuffledSenators = _.shuffle(this.props.senators);
    console.log(shuffledSenators);
    var current = shuffledSenators[0];
    this.setState({
      senatorsArray:shuffledSenators,
      currentSenator:current
    });
  }*/

  componentWillMount() {
    var thisComponent = this;
    this.setState({
      index: 1,
      currentVote: thisComponent.props.votingRecord[1],
      vote: thisComponent.props.votingRecord[1]["option"]["value"]
    })
    //this.pickSenator();
  }

  nextQuestion() {
    var currentIndex = this.state.index;
    currentIndex++;
    this.setState({
      index: currentIndex,
      currentVote: this.props.votingRecord[currentIndex],
      vote: this.props.votingRecord[currentIndex]["option"]["value"]
    })
  }

  handleYes(event) {
    if(this.state.vote === "Yea") {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
    this.nextQuestion();
  }

  handleNo(event) {
    if(this.state.vote === "Nea") {
      console.log("correct");
    } else {
      console.log("incorrect");
    }
    this.nextQuestion();
  }

  render() {

    /*var makeButtons = function() {
      var buttons = [];
      buttons.push(this.state.currentSenator['state']);
      var shuffledStates = _.shuffle(STATES);
      for(var i=0; i < 3; i++) {
        buttons.push(shuffledStates[i]);
      }
      buttons = _.shuffle(buttons);
      console.log(buttons);
      buttons.map(function(current) {
        return <SenatorGuessStateButton onClickParent={this.handleClick} state={current} />
      });
    }*/

    return (
      <main className="bill-guess-game">
        <h4>How do you think this senator voted on: </h4>
        <p>{this.state.currentVote["vote"]["question"]}</p>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">

            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">You got it right!</h4>
              </div>
          <div className="modal-body">
            <p>Mark Kirk voted {this.state.vote}</p>
          </div>
        </div>
          </div>
        </div>
        <div className='yesno-buttons-box'>
          <button className="yesno-buttons" onClick={this.handleYes}>Yes</button>
          <button className="yesno-buttons" onClick={this.handleNo}>No</button>
        </div>
      </main>
    );
  }
}

export default SenatorGuessPage; 