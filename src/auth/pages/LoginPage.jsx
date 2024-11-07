import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

export const LoginPage = () => {

  const { login } = useContext(AuthContext)
  
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const onInputChange = (e) => {
    setName(e.target.value);
  }

  const onLoginSubmit = (e) => {

    e.preventDefault()

    const lastPath = localStorage.getItem('lastPath') || '/';
    
    login(name);

    navigate(lastPath, {
      replace: true
    })
  }
  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr />

      <form onSubmit={onLoginSubmit}>

        <input
          type="text"
          placeholder="Name"
          className="form-control"
          name="searchText"
          autoComplete="off"
          onChange={onInputChange}
        />

        <button
          className="btn btn-primary mt-2"
        >
          Login
        </button>
      </form>


    </div>
  )
}
