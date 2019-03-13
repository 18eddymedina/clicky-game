import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PictureCard from "./components/PictureCard";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";



class App extends Component {
  //Setting this.state.cards to the cards json array
  state = {
    cards,
    clickedArray: [],
    topScore: 0,
    score: 0,
    message: "",
    shakeit: "false"
  };

  clickPicture = id => {
    //arrange the pictures randomly
    const shuffleArray = this.shuffleArray(cards);
    this.setState({ cards: shuffleArray });
    //if clicked an image already clicked set this.state.score = 0
    if (this.state.clickedArray.includes(id)) {
      this.setState({ score: 0, clickedArray: [], message: "Sorry, start game again!", shakeit: "true" });
    }
    else {
      this.setState({
        clickedArray: this.state.clickedArray.concat([id]),
        score: this.state.score + 1,
        message: "Correct",
        shakeit: "false"
      });
    }
    // set topscore = score if score > topscore.
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
    }
    // shake the wrapper if shakeit it set to true
  }
  shuffleArray = (picturesArray) => {
    for (let i = picturesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picturesArray[i], picturesArray[j]] = [picturesArray[j], picturesArray[i]];
    }
    return picturesArray;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://fanart.tv/api/download.php?type=download&image=72476&section=1" className="App-logo" alt="logo" />

        </header>
        <h3 className="App-intro">
        <h1 className="App-title">The Clicky Game</h1>
          <strong>How many can you click without clicking more than once!</strong>
          <p className="score"><strong>Score: {this.state.score} | HighScore: {this.state.topScore}</strong></p>
          <p className="message"><strong> {this.state.message}</strong></p>
        </h3>
        <Wrapper
          shakeWrapper={this.state.shakeit}
          pictures={this.state.cards.map(picture => (
            <PictureCard
              clickPicture={this.clickPicture}
              id={picture.id}
              key={picture.id} // to get rid of the unique key prop warning
              name={picture.name}
              image={picture.image}
            />
          ))}
        />
      </div>
    );
  }
}

export default App;
