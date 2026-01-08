import pro from "./image.png";
import "./style.css";

const Practice = () => {
  return (
    <main className="practice-wrapper">
      <div className="practice-container">
        {/* LEFT CONTENT */}
        <div className="practice-left">
          <h2 className="practice-title">Get practice material</h2>

          <p className="practice-text">
            A wide collection of past questions and materials spanning many
            years is available.
          </p>

          {/* PROGRESS BAR */}
          <div className="onboarding-progress-bar">
            <div className="onboarding-progress-fill"></div>
          </div>

          <a href="/recommendation" className="practice-button" style={{color: "white"}}>
            Get Started
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="practice-right">
          <img src={pro} alt="Practice illustration" />
        </div>
      </div>
    </main>
  );
};

export default Practice;
