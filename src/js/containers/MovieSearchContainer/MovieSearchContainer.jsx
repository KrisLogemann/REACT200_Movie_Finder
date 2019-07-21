import { Link } from 'react-router-dom';
import React from 'react';
import { updateSearch, getMovie } from './searchActions';

export default class MovieSearchContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearch(e) {
    const { dispatch } = this.props;
    const { value } = e.target;
    dispatch(updateSearch(value));
  }

  handleSubmit() {
    const { title, dispatch } = this.props;
    dispatch(getMovie(title));
  }

  render() {
    const { value, movies } = this.props;
    return (
      <div>
        <div style={ { marginTop: '20px', marginBottom: '20px' } }>
          <div className='jumbotron text-center'>
            <h1>SDCS Movie Finder</h1>
          </div>
          <div className='input-group'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter A Movie'
              value={ value }
              onChange={ this.handleSearch }
            />
            <div className='input-group-append'>
              <button
                className='btn btn-outline-secondary'
                type='button'
                onClick={ this.handleSubmit }
              >
                Go!
              </button>
            </div>
          </div>
        </div>

        {movies.map(searchedMovie => (
          <div className='card' key={ searchedMovie.imdbID }>
            <div className='card-body row'>
              <div className='col-4'>
                <img
                  className='img-fluid'
                  src={ searchedMovie.Poster }
                  alt={ searchedMovie.Title }
                />
              </div>
              <div className='col-8'>
                <h5 className='card-title'>{searchedMovie.Title}</h5>
                <h6 className='card-subtitle'>
                  Released: {searchedMovie.Year}
                </h6>
                <hr />
                <p className='card-text'>Type: {searchedMovie.Type}</p>
                <Link
                  to={ `/movie/${searchedMovie.imdbID}` }
                  className='btn btn-primary float-right'
                >
                  More Information
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
