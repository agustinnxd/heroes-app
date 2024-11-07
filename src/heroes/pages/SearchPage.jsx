import { useLocation, useNavigate } from "react-router-dom"
import querystring from 'query-string'

import { getHeroesByName } from '../helpers'
import { useForm } from "../../hooks/useForm"
import { HeroCard } from '../components'

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = querystring.parse(location.search)

  const heroes = getHeroesByName(q)

  const { searchText, onInputChange } = useForm({
    searchText: q
  })

  const onSearchSubmit = (e) => {
    e.preventDefault();

    navigate(`?q=${searchText}`)
  };

  return (
    <>
      <h1 className="mt-2">Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit} aria-label="form">
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-2">
              Search
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {
            (q === '')
              ?
              <div className="alert alert-primary animate__animated animate__fadeInRight">
                Search a hero
              </div>
              :
              (heroes.length === 0) && (<div className="alert alert-danger animate__animated animate__fadeInRight">No results for <b>{q}</b></div>)
          }

          {
            heroes.map(hero => (
              <HeroCard key={hero.id} {...hero} />
            ))
          }
        </div>
      </div>

    </>
  )
}
