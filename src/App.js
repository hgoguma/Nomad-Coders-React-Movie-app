import React, {Component} from 'react';
import './App.css';
import Movie from './Movie';


class App extends Component{
  state = {}
  
  componentDidMount(){
    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(( movie, index ) => {
      return <Movie 
      title={movie.title_english} 
      poster={movie.medium_cover_image} 
      key={movie.id}
      genres={movie.genres}
      synopsis={movie.synopsis}
      />
    })
    return movies
  }

  //async : 이전 작업이 끝나야 그 다음 작업이 시작하는 형태가 아님! 순서 상관없이 시작됨
   _getMovies = async () => {
    const movies = await this._callApi(); 
    //await : _callApi()가 끝나기를 기다림 -> return 되는게 무엇이든 setState로 넣어줌
    //_callApi 작업이 완료되기 전까지(성공이 아님) setState 함수는 실행되지 않음!
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.mx/api/v2/list_movies.json?sort_by=like_count')
   .then(response => response.json())
   .then(json =>  json.data.movies)
   .catch(err => console.log(err))
  }

  render(){
    return (
      <div className="App">
       {this.state.movies ? this._renderMovies() : 'Loading'}
      </div>
    )
  }
}

export default App;
