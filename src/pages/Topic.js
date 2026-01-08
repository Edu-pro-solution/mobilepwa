import { useState, useEffect } from "react";
import {
  FaBell,
  FaCog,
  FaHome,
  FaNewspaper,
  FaStickyNote
} from "react-icons/fa";
import AddUser from "./AddUser";
import "./admin.css";
import TopicModal from "./TopicModal";
import { useNavigate } from "react-router-dom";

const Topic = () => {
  const [activeTab, setActiveTab] = useState("key");
  const [showModal, setShowModal] = useState(false);
const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectTopics, setSubjectTopics] = useState({});
  
const [subjects, setSubjects] = useState([]);
  const [subjectsState, setSubjectsState] = useState({});
useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const res = await fetch("https://eduproapi.vercel.app/api/jamb/subject");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      console.log("Subjects from API:", data);
      setSubjects(data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  fetchSubjects();
}, []);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };


  const toggleSubject = (subject) => {
  setSubjectsState((prev) => ({
    ...prev,
    [subject]: prev[subject]
      ? { ...prev[subject], enabled: !prev[subject].enabled }
      : {
          enabled: true,
          topicCount: 10,   
          includeTheory: false,
          selectedTopics: []
        }
  }));
};
const openTopicModal = async (subject) => {
  setSelectedSubject(subject);

  if (!subjectTopics[subject]) {
    try {
      const res = await fetch(`http://eduproapi.vercel.app/api/jamb/subject/${subject}/topics`);
      if (!res.ok) throw new Error("Network response was not ok");

      const topics = await res.json();
      setSubjectTopics((prev) => ({ ...prev, [subject]: topics }));
      console.log(`Topics for ${subject}:`, topics);
    } catch (err) {
      console.error("Error fetching topics:", err);
      setSubjectTopics((prev) => ({ ...prev, [subject]: [] }));
    }
  }

  setShowModal(true);
};

  const handleSubmitTopics = (subject, topics) => {
    setSubjectsState((prev) => ({
      ...prev,
      [subject]: {
        ...prev[subject],
        selectedTopics: topics
      }
    }));
  };

  return (
    <div className="dashboard">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="profile">
          <div className="avatar" />
          <div className="bell">
            <FaBell />
            <span className="badge">23</span>
          </div>
        </div>

        <nav>
          <button className="active"><FaHome /> Home</button>
          <button><FaStickyNote /> Notes</button>
          <button><FaNewspaper /> News</button>
          <button><FaCog /> Settings</button>
        </nav>

        <AddUser open={showModal} onClose={() => setShowModal(false)} />
      </aside>

{/* MAIN */}
<main className="bodys">
  <header className="headers">
    <h1>Practice by Topic</h1>
  </header>

  <section className="topic-container">

    {/* ADD SUBJECT BUTTON */}
    <button className="add-subject-btn">
      + Add Practice Subjects
    </button>
<div className="subject-list">
  {subjects.map((subject) => {
    const state = subjectsState[subject] || {
      enabled: false,
      topicCount: 10,
      includeTheory: false,
      selectedTopics: []
    };

    return (
      <div key={subject} className="subject-block">
        {/* SUBJECT CHECKBOX */}
        <label className="subject-item">
          <input
            type="checkbox"
            checked={state.enabled}
            onChange={() => toggleSubject(subject)}
          />
          <span>{subject}</span>
        </label>

        {state.enabled && (
          <div className="subject-options">

            {/* SELECT TOPICS */}
            <button
              className="select-topics-btn"
              onClick={() => openTopicModal(subject)}
            >
              Select Topics
            </button>

            {/* NUMBER OF QUESTIONS */}
            <select
              className="question-count-select"
              value={state.topicCount}
              onChange={(e) =>
                setSubjectsState((prev) => ({
                  ...prev,
                  [subject]: {
                    ...prev[subject],
                    topicCount: Number(e.target.value),
                  },
                }))
              }
            >
              {[5, 10, 15, 20, 30].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            {/* INCLUDE THEORY */}
            <label className="theory-toggle">
              <input
                type="checkbox"
                checked={state.includeTheory}
                onChange={(e) =>
                  setSubjectsState((prev) => ({
                    ...prev,
                    [subject]: {
                      ...prev[subject],
                      includeTheory: e.target.checked,
                    },
                  }))
                }
              />
              <span>Include Theory</span>
            </label>

            {/* SELECTED TOPICS */}
            {state.selectedTopics.length > 0 && (
              <div className="selected-topics">
                {state.selectedTopics.join(", ")}
              </div>
            )}
          </div>
        )}
      </div>
    );
  })}
</div>


<button
  className="start-test-btn"
  onClick={() => {
    const enabledSubjects = Object.fromEntries(
      Object.entries(subjectsState).filter(
        ([_, value]) => value.enabled
      )
    );

    localStorage.setItem(
      "examConfig",
      JSON.stringify({ subjects: enabledSubjects })
    );

    navigate("/start-test");
  }}
>
  Start Test
</button>


  </section>
</main>
 <TopicModal
        open={showModal}
        onClose={() => setShowModal(false)}
        subject={selectedSubject}
topics={subjectTopics[selectedSubject] || []}

        onSubmit={handleSubmitTopics}
      />

    </div>
  );
};

export default Topic;
