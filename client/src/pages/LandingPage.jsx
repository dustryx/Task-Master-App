
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import '../components/Styles/LandingPage.css'; 

gsap.registerPlugin(TextPlugin);

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // GSAP animations for the entire landing page
    gsap.from('.card', { opacity: 0, y: 50, duration: 1.5, ease: "power4.out" });
    gsap.from('.welcome', { opacity: 0, x: -50, duration: 1.5, ease: "power4.out", delay: 0.5 });
    gsap.to('.description', {
      text: "Your one-stop solution for managing tasks efficiently.",
      duration: 3,
      ease: "none",
      delay: 0.5,
    });
    gsap.from('.ready', { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)", delay: 0.5 });
    gsap.from('.sign-up-button', { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)", delay: 0.2 });
    gsap.from('.already', { opacity: 0, duration: 1, ease: "power4.out", delay: 0.3 });
    gsap.from('.login-button', { opacity: 0, scale: 0.8, duration: 1, ease: "back.out(1.7)", delay: 0.2 });
  }, []);

  const handleSignUp = () => {
    console.log("Sign Up button clicked");
    navigate('/signup');
  };

  const handleLogin = () => {
    console.log("Log In button clicked");
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <div className="card">
        <h1 className='welcome'>
          Welcome to <br /> <span>TaskMaster</span>
        </h1>
        <p className='description'></p>
        <div className="button-group">
          <p className='ready'>Ready to start your task management journey?</p>
          <button className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
          <p className='already'>Already have an account?</p>
          <button className="login-button" onClick={handleLogin}>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
