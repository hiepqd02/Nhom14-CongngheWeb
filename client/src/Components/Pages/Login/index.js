import { useEffect, useState } from 'react';
import './index.scss'
import { EmailIcon, PasswordIcon } from '../../../assets/icon';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../Services/userService';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userInformations, setUserInformations] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    document.title = "Log in to Boostme"
  }, [])
  const handleSubmit = () => {
    console.log(userInformations);
    login(userInformations, dispatch);
  };
  return (
    <div className="login-container">
      <div className="left-content">
        <div className="header">
          <div className="logo"></div>
          <div className="name">Boostme</div>
        </div>
        <div className="greeting">
          <h1>Boostme helps teams fuel achievement.</h1>
          <p>Empower collaboration, project management, and reach new heights of productivity with Boostme. From bustling offices to remote work setups, elevate your team's unique workflow and achieve it all seamlessly.</p>
        </div>
        <img src="images/left-login.png" alt="left-img" />
      </div>
      <div className="right-content">
        <div className='form-container'>
          <div className="top-title">
            <h1>Hello Again!</h1>
            <p>Welcome Back</p>
          </div>
          <div className="form-card">
            <form  >
              <div className='input-box'>
                <EmailIcon />
                <input type="email" placeholder='Email Address'
                  required
                  value={userInformations.email}
                  onChange={(e) =>
                    setUserInformations({
                      ...userInformations,
                      email: e.target.value,
                    })
                  } />
              </div>
              <div className='input-box'>
                <PasswordIcon />
                <input type="password" placeholder='Password'
                  required
                  value={userInformations.password}
                  onChange={(e) =>
                    setUserInformations({
                      ...userInformations,
                      password: e.target.value,
                    })
                  } />
              </div>
              <div className='login-btn' onClick={() => handleSubmit()}>Login</div>
              <div className='register' >Need an account?<span onClick={() => navigate('/register')}>Create one</span></div>
            </form>
          </div>

        </div>
      </div>
    </div >
  )
};
export default Login;
