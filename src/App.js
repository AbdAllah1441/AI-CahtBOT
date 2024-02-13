import { useState } from 'react';
import './App.scss';

function App() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [answers, setAnswers] = useState([]);

    const { GoogleGenerativeAI } = require("@google/generative-ai");

    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI("AIzaSyCk7b-QIFovr6nrUyLoSjbfZmyDMZXnHx0");
    
    async function run() {
        if (message !== "") {
            // For text-only input, use the gemini-pro model
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            
            const prompt = message
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            setAnswers([...answers, text]);
            setMessages([...messages, message]);
            setMessage("");
        }
    }

    return (
        <div className="App">
            <form onSubmit={(e) => {e.preventDefault(); run()}} autoComplete='off' className='bot'>
                <h1>AI ChatBot !</h1>
                <div className="query">
                    <input  onChange={(e) => { setMessage(e.target.value)}}  value={message}
                    name='message' className='message' placeholder="Your Message Here ... " />
                    <svg className={`submit_btn ${message === "" ? "" : " light"}`} onClick={run}
                    fill="#041622" height="64px" width="64px" version="1.1" id="Layer_1" 
                    xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
                    viewBox="-158.7 -158.7 829.33 829.33" xmlSpace="preserve" stroke="#041622" strokeWidth="51.193">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#041622" strokeWidth="4.09544"></g>
                        <g id="SVGRepo_iconCarrier">
                            <g>
                                <g>
                                    <path d="M476.738,
                                    280.436c-4.16-4.16-10.88-4.16-15.04,0l-195.2,195.2V10.996c0-5.333-3.84-10.133-9.067-10.88 c-6.613-0.96-12.267,
                                    4.16-12.267,10.56v464.96l-195.093-195.2c-4.267-4.053-10.987-3.947-15.04,0.213 c-3.947,4.16-3.947,10.667,
                                    0,14.827L248.365,508.81c4.16,4.16,10.88,4.16,15.04,0l213.333-213.333 C480.898,291.423,480.898,284.596,
                                    476.738,280.436z"></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="response">
                    <div className='gemeni'>Ask me about anything you want.</div>
                    {answers.map((a,index) =>     
                        <div className='d_response'>
                            <div className='me'>{messages[index]}</div>
                            <div className='gemeni'>{a}</div>
                        </div>                   
                    )}
                    {message !== "" && (<div className="me">{message}</div>)}
                </div>
            </form>
        </div>
    );
}

export default App;
