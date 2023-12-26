import { useEffect, useState } from 'react';
import './index.scss'
import { EmailIcon, PasswordIcon, UserIcon } from '../../../assets/icon';
import { useNavigate } from 'react-router-dom'
import { register } from '../../../Services/userService';
import { useDispatch } from 'react-redux'

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [userInformations, setUserInformations] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repassword: "",
  });

  useEffect(() => {
    document.title = "Create an account"
  }, [])
  const handleSubmit = () => {
    console.log(userInformations);
    register(userInformations, dispatch);
  };
  return (
    <div className="register-container">
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
            <h1>Hello!</h1>
            <p>Sign Up to Get Started</p>
          </div>
          <div className="form-card">
            <form >
              <div className='input-box'>
                <UserIcon />
                <input type="text" placeholder='Name'
                  required
                  value={userInformations.name}
                  onChange={(e) =>
                    setUserInformations({
                      ...userInformations,
                      name: e.target.value,
                    })
                  } />
              </div>
              <div className='input-box'>
                <UserIcon />
                <input type="text" placeholder='Surname'
                  required
                  value={userInformations.surname}
                  onChange={(e) =>
                    setUserInformations({
                      ...userInformations,
                      surname: e.target.value,
                    })
                  } />
              </div>
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
              <div className='input-box'>
                <PasswordIcon />
                <input type="password" placeholder='Confirm Password'
                  required
                  value={userInformations.repassword}
                  onChange={(e) =>
                    setUserInformations({
                      ...userInformations,
                      repassword: e.target.value,
                    })
                  } />
              </div>
              <div className='login-btn' onClick={handleSubmit}>Register</div>
              <div className='register'>Already have an account?<span onClick={() => navigate('/login')}>Login</span></div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
};
export default Register;
