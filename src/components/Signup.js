import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    nameS: "", emailS: "", passwordS: "", confirmPass: ""
  })

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.passwordS === credentials.confirmPass) {
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "name": credentials.nameS,
          "email": credentials.emailS,
          "password": credentials.passwordS
        })
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Signed up", "success");
      }
      else {
        props.showAlert("There is a problem while Signing Up","danger");
      }
    }

    else{
      props.showAlert("Password & Confirm Password do not match", "danger");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="nameS" className="form-label">Name</label>
        <input type="text" className="form-control" id="nameS" name="nameS" aria-describedby="emailHelp" required minLength={5} onChange={onChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="emailS" className="form-label">Email address</label>
        <input type="email" className="form-control" id="emailS" name="emailS" aria-describedby="emailHelp" required minLength={5} onChange={onChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="passwordS" className="form-label">Password</label>
        <input type="password" className="form-control" id="passwordS" name='passwordS' required minLength={5} onChange={onChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="confirmPass" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="confirmPass" name='confirmPass' required minLength={5} onChange={onChange} />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup