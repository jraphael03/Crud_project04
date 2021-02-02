import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";


function Questions () {

    const [question, setQuestion] = useState('');


    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");

    const data = [
        {value: 1, label: "Football"},
        {value: 2, label: "Basketball"},
        {value: 3, label: "Baseball"},
        {value: 4, label: "MMA"}
    ];

    const [qid, setQid] = useState("");
    const [cid, setCid] = useState(null);

    const handleChange = obj => {
        setCid(obj)
    }

    // GET DATA FROM BACKEND
    const getQuestions = () => {
        axios.get("http://localhost:5000/questions").then((response) => {
            setQuestions(response.data)
        });
    }

    // POST DATA TO BACKEND
    const addQuestion = () => {
        axios.post("http://localhost:5000/create", {
            question: question,
            cid: cid,
          })
          .then(() => {
            setQuestions([...questions, { question: question }]);
            console.log("success");
          });
    }


    //UPDATE DATA FROM BACKEND
    const updateQuestions = (qid) => {
        axios.put("http://localhost:5000/update", {question: newQuestion, qid: qid}.then(
            (response) => {
                setQuestions(questions.map((val) =>{
                    return val.qid == qid
                      ? { qid: val.qid, question: val.question } : val;         //is the user the same as the id we changed if so display new objects, else is isn't the user just pass val
                }))
            }
        ))
    }


    //DELETE DATA FROM THE BACKEND
    const deleteQuestion = (id) => {
        axios.delete(`http://localhost:5000/delete/${qid}`).then((response) => {
            setQuestion(questions.filter((val) => {
                return val.qid !== qid;
            }))
        })
    }


    useEffect(() => {
        getQuestions();
    }, [questions]);

    return (
      <>
        <div>
          {questions.map((val, key) => {
            return (
              <div>
                <div>
                  <h3>Question: {val.question}</h3>
                  <input type="text" placeholder="See something wrong with this question?" onChange={(event) => {
                      setNewQuestion(event.target.value);
                  }} />
                  <button onClick={() => {updateQuestions(val.qid)}} >Update Question</button>
                  <button onClick={() => {deleteQuestion(val.id)}}>Delete</button>
                </div>
              </div>
            );
          })}
          <form className="inputCard" action="">
            <div>
              <label className="labelCard" htmlFor="">
                Question:
              </label>
              <input
                type="text"
                placeholder="Insert a Question"
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              />
              <div>
                <Select 
                value={cid} 
                options={data}
                onChange={handleChange} />
                <br/>
                <b>Selected Value:</b>
                <pre>{JSON.stringify(cid, null, 2)}</pre>
              </div>
              <div>
                <button onClick={addQuestion}>Add Question</button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
}

export default Questions;