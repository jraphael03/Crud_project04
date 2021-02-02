import React, { useState } from "react";
import axios from "axios";

function Sidebar() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios.get("http://localhost:5000/questions").then((response) => {
      setQuestions(response.data);
    });
  };

  return (
    <ul>
      <li>
        <h2>Categories</h2>
      </li>
      <li className="li-item1">
        <button> Football </button>
      </li>
      <li className="li-item2">
        <button> Basketball </button>
      </li>
      <li className="li-item3">
        <button> Baseball </button>
      </li>
      <li className="li-item4">
        <button> MMA </button>
      </li>
      <li className="li-item5">
        <button
          onClick={() => getQuestions }
          //onClick={setShowQuestions(!showQuestions)}            //leave this onclick and try to place the one above inside the h3
        >
          All Categories
        </button>

        {questions.map((val, key) => {
          return (
            <div>
              <h3>
                Question: {showQuestions ? val.question : `${val.question}`}
              </h3>
            </div>
          );
        })}
      </li>
    </ul>
  );
}

export default Sidebar;
