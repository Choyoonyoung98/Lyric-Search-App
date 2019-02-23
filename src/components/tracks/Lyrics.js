import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner'
import Moment from 'react-moment';


class Lyrics extends Component {
    state = {
        track: {},
        lyrics: {}
    };
    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_KEY}`
        ).then(res => {
            console.log(res.data);
            this.setState({lyrics: res.data.message.body.lyrics});//넘어온 데이터를 state에 저장
            return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_KEY}`
            );
        })
        .then(res => {
            console.log(res.data);
            this.setState({track: res.data.message.body.track})

        })
        .catch(err => console.log(err));
    }

  render() {
    const { track, lyrics } = this.state;
    console.log(track);//track의 모든 정보를 로그로 찍어볼 수 있음 유용유용
    if( track === undefined || 
        lyrics === undefined ||
        Object.keys(track).length === 0 
        ||Object.keys(lyrics).length === 0
        ) {//데이터 넘오올 때까지 로딩화면 띄우기
            return <Spinner></Spinner>;
    }else{  
        return(
            <React.Fragment>
                <Link to = '/' className="btn btn-dark btn-sm mb-4">Go back</Link>
                <div className="card">
                    <h5 className="card-header">
                    {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
                    </h5>
                    <div className="card-body">
                        <p className="card-text">{lyrics.lyrics_body} </p>
                    </div>
                </div>

                <ul className="list-group mt-3">
                    <li className="list-group-item">
                        <strong>Album ID</strong>: {track.album_id}
                    </li>
                    <li className="list-group-item">
                    <strong>Song Genre</strong>: {track.primary_genres.music_genre_list[0] === 0 ? 'none': track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
                    </li>
                    <li className="list-group-item">
                        <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
                    </li>
                    <li className="list-group-item">
                        <strong>Release Date</strong>: <Moment format="MM/DD/YYYY">{track.updated_time}</Moment>
                    </li>
                </ul>

            </React.Fragment>

        );
    }

  }
}

export default Lyrics;
