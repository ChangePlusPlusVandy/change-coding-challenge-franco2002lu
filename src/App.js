import React from 'react';
import axios from 'axios';
import Tweet from './Tweet';
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      tweets: [],
      correct: 0,
      incorrect: 0,
      currentIndex: 0,
      complete: false
    }
  }

  async componentDidMount() {
    // Get tweets for Elon Musk
    let musk = await axios.get('https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=elonmusk&include_rts=false&exclude_replies=true&trim_user=true&count=10000&tweet_mode=extended ',
        {headers: {
          Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAGRVAwEAAAAARwfzHewGaupSy1mPkO8WfNrXi6k%3DpNJkyFccIZITDJEE6q6iuv4mLjmbGFNFhPbIhwkQOxkdRIfJd5`,
            "Access-Control-Allow-Origin": "*"
        }}
        )
        .then(function (response) {
          let array = response.data.map((tweet) => {
            //tweets which only include a link should be ignored
            if(tweet.full_text.indexOf('https://t.co') != -1 && tweet.full_text.substring(0, tweet.full_text.indexOf('https://t.co')).length == 0){
              return null
            }
            // return an object with the tweet's text and author, where the text is formatted to include & instead of &amp; and exlude any links
            return {text: tweet.full_text.substring(0, tweet.full_text.indexOf('https://t.co') > 0 ? tweet.full_text.indexOf('https://t.co'): tweet.full_text.length).replace(/&amp;/g, '&'), author: 'elon'}
          })
          return array.filter((val) => val != null);
        });
    // Get tweets from Kanye West
    let west = await axios.get('https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kanyewest&include_rts=false&exclude_replies=true&trim_user=true&count=10000&tweet_mode=extended ',
        {headers: {
            Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAGRVAwEAAAAARwfzHewGaupSy1mPkO8WfNrXi6k%3DpNJkyFccIZITDJEE6q6iuv4mLjmbGFNFhPbIhwkQOxkdRIfJd5`,
            "Access-Control-Allow-Origin": "*"
          }}
    )
        .then(function (response) {
          let array = response.data.map((tweet) => {
            //tweets which only include a link should be ignored
            if(tweet.full_text.indexOf('https://t.co') != -1 && tweet.full_text.substring(0, tweet.full_text.indexOf('https://t.co')).length == 0){
              return null
            }
            // return an object with the tweet's text and author, where the text is formatted to include & instead of &amp; and exlude any links
            return {text: tweet.full_text.substring(0, tweet.full_text.indexOf('https://t.co') > 0 ? tweet.full_text.indexOf('https://t.co'): tweet.full_text.length).replace(/&amp;/g, '&'), author: 'kanye'}
          })
          return array.filter((val) => val != null);
        });
    this.setState({
      // set tweets state to the randomized concatenation of the two tweet arrays
      tweets: musk.concat(west).sort(() => Math.random() - 0.5),
      complete: true,
    })
  }

  select = (name) => {
    //if user selected the correct author, increment the correct answers by 1
    //else, increment the incorrect answers by 1
    if(this.state.tweets[this.state.currentIndex].author == name){
      this.setState({
        correct: this.state.correct + 1,
        currentIndex: this.state.currentIndex + 1
      })
    } else {
      this.setState({
        incorrect: this.state.incorrect + 1,
        currentIndex: this.state.currentIndex + 1
      })
    }
  }

  render(){
    return (
        <div className="App">
          <header className="App-header">
            <div className='row-container'>
              <div className='score-value'>
                <p>Correct: {this.state.correct}</p>
              </div>
              <div className='score-value'>
                <p>Incorrect: {this.state.incorrect}</p>
              </div>
            </div>
            <p>Did Elon Musk or Kanye West write this Tweet?</p>
            {
              this.state.complete
                ? <Tweet tweet={this.state.tweets[this.state.currentIndex]}/>
                : null
            }
            <div class='row-container'>
              <button class='button' id='kanye' onClick={() => this.select('kanye')}>
                <p>Kanye West</p>
              </button>
              <button class='button' id='elon' onClick={() => this.select('elon')}>
                <p>Elon Musk</p>
              </button>
            </div>
          </header>
        </div>
    );
  }

}

export default App;