import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


function Login(props) {
    const navigate = useNavigate();
    
    const [credentials, setcredentials] = useState({
        email: "",
        password: ""
    });
    
    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value});
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": credentials.email,
                "password": credentials.password
            })
        });

        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token",json.authtoken)
            navigate("/");
            props.showAlert("Logged in","success");
        }
        else{
            props.showAlert("There is a problem while Logging in", "danger");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required minLength={5} />
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5} />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login