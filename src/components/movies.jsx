import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 3,
  };

  handleDelete = (movie) => {
    console.log(movie._id);
    // we shouldnot directly update the state
    // 1. create new movies array, except the one we chose to be deleted
    const movies = this.state.movies.filter((m) => m._id !== movie._id); //we get, except(here true)
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  //should receive page naumber
  handlePageChange = (page) => {
    console.log(page)
  };


  render() {
    const { length: movieCount } = this.state.movies;

    // * conditional, if no more movies return no table *
    if (movieCount === 0) return <p>There are no movies in database</p>;

    return (
      <>
        <p>Showing stock of movies: {movieCount}</p>
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th>function</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onLike={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    type='button'
                    className='btn btn-outline-danger'
                    onClick={() => this.handleDelete(movie)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemCount={movieCount}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default Movies;
