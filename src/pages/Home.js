import { useNavigate } from "react-router-dom";
import "./style.css";

const Home = () => {
    const navigate = useNavigate();
  return (
    <main className="hero-wrapper">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Edu Pro Solution</h1>

        <p className="hero-text">
          Edu Pro Solution provides the best way to prepare for your exam with materials
          you need readily available
        </p>

        <a href="/practice" className="hero-button">
          Next
        </a>

      <span
          className="skip-text"
          onClick={() => navigate("/login")}
        >
          Skip this step
        </span>
      </div>
    </main>
  );
};

export default Home;
