import pro from "./image.png";
import "./style.css";

const Ask = () => {
  console.log("Ask page");

  return (
    <main className="practice-wrapper">
      <div className="practice-container">
        {/* LEFT CONTENT */}
        <div className="practice-left">
          <h2 className="practice-title">Ask Questions</h2>

          <p className="practice-text">
            Ask questions and get instant help using a wide collection of past
            questions and learning materials.
          </p>

          {/* PROGRESS BAR (STEP 3 OF 3) */}
          <div className="onboarding-progress-bar">
            <div className="onboarding-progress-fill3"></div>
          </div>

          <a href="/register" className="practice-button" style={{color: "white"}}> 
            Get Started
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="practice-right">
          <img src={pro} alt="Ask questions illustration" />
        </div>
      </div>
    </main>
  );
};

export default Ask;
