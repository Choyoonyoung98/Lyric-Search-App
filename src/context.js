import React, { Component } from 'react'
import axios from 'axios';

const Context = React.createContext();


export class Provider extends Component {

    state = {
        tack_list : [],
        heading: 'Top 10 Track'
        //heading값 또한 바꿀 수 있다.

    };

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=5&country=it&f_has_lyrics=1&apikey=${process.env.REACT_APP_KEY}`
        //kind of proxy?
        ).then(res => {
            // console.log(res.data);
            this.setState({track_list: res.data.message.body.track_list});
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
        <Context.Provider value={this.state}>
            {this.props.children}
        </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;

