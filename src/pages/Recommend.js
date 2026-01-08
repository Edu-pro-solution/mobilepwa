import pro from "./reco.png";
import "./style.css";

const Recommend = () => {
  return (
    <main className="practice-wrapper">
      <div className="practice-container">
        {/* LEFT CONTENT */}
        <div className="practice-left">
          <h2 className="practice-title">Recommendations</h2>

          <p className="practice-text">
            Get personalized recommendations to help you focus on the right
            topics and study materials for your exams.
          </p>

          {/* PROGRESS BAR (STEP 2 OF 3) */}
          <div className="onboarding-progress-bar">
            <div className="onboarding-progress-fill2"></div>
          </div>

          <a href="/ask" className="practice-button" style={{color: "white"}}>
            Continue
          </a>
        </div>

        {/* RIGHT IMAGE */}
        <div className="practice-right">
          <img src={pro} alt="Recommendation illustration" />
        </div>
      </div>
    </main>
  );
};

export default Recommend;
