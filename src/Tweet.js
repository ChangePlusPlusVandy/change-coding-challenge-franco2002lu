import React from 'react';
import './App.css';

class Tweet extends React.Component {
    render(){
        return (
            <div>
                <p>{this.props.tweet.text}</p>
            </div>
        );
    }
}

export default Tweet;