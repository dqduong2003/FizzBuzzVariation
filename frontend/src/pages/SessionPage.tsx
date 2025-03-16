import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { SessionService } from "../api/api";
import './SessionPage.css';

const SessionPage = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // To navigate to another page after stopping the session

  const handleStopSession = async () => {
    try {
      await SessionService.cancelSessionById(Number(sessionId));
      navigate("/"); // Redirect the user to the home page or any other page after stopping
    } catch (error) {
      console.error("Failed to end session:", error);
      // alert("Could not stop the session. Please try again.");
    }
  };

  const handleCancelSession = async () => {
    const isCancelled = await SessionService.cancelSessionById(Number(sessionId));
    if (isCancelled) {
      navigate("/games"); // Redirect to the games page after successful cancellation
    } else {
      alert("Failed to cancel the session. Please try again.");
    }
  };
  
  useEffect(() => {
    const fetchRandomNumber = async () => {
      try {
        console.log("Session ID:", sessionId);
        const randomNum = await SessionService.generateRandomNumber(Number(sessionId));
        console.log("Random Number Response:", randomNum);
        setRandomNumber(randomNum);
      } catch (error) {
        console.error("Failed to fetch random number:", error);
        alert("Could not fetch a random number. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomNumber();
  }, [sessionId]);

  useEffect(() => {
    const fetchSessionDetails = async () => {
        try {
            const session = await SessionService.getActiveSessionById(Number(sessionId));
            console.log("Session Details:", session);
            const startTime = new Date(session.startTime).getTime();
            const endTime = startTime + session.duration * 1000;
            console.log(startTime, endTime);
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const timeLeft = endTime - now;

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    alert("Time's up!");
                    
                    handleStopSession(); // Stop the session when the time is up
                    return;
                } else {
                    setRemainingTime(Math.floor(timeLeft / 1000));
                }
            }, 1000);

            return () => clearInterval(interval);
        } catch (error) {
            console.error("Failed to fetch session details:", error);
            alert("Could not load session details. Please try again.");
        }
    };

    fetchSessionDetails();
    }, [sessionId, navigate]);

    if (remainingTime === null) {
        return <p>Loading session...</p>;
    }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await SessionService.submitAnswer({
        sessionId: Number(sessionId),
        randomNumber: randomNumber!,
        answer: userInput,
      });

      setScore({ correct: result.correctAnswers, incorrect: result.incorrectAnswers });

      // Fetch a new random number
      const newRandomNumber = await SessionService.generateRandomNumber(Number(sessionId));
      setRandomNumber(newRandomNumber);
      // Reset user input
      setUserInput("");
    } catch (error) {
      console.error("Failed to submit answer:", error);
      alert("Submission failed. Please try again.");
    }
  };


  if (loading) {
    return <p>Loading session...</p>;
  }

  return (
    <div className="body">
      <NavBar />
      <div className="sessionContainer">
        <div className="remainingTime">Remaining Time: {remainingTime} seconds</div>
        <div className="scoreBox">
          <p className="correct">Correct Answers: {score.correct}</p>
          <p className="incorrect">Incorrect Answers: {score.incorrect}</p>
        </div>
        <div className="randomNumber">{randomNumber}</div>
        <div className="inputContainer">
          <form onSubmit={handleSubmit}>
            <label>
              Your Answer:
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.trim())}
              />
            </label>
            <button type="submit">Submit</button>
          </form>
          <button
            onClick={handleStopSession}
            style={{
              marginTop: "20px",
              color: "white",
              backgroundColor: "red",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Stop
          </button>
          <button
            onClick={handleCancelSession}
            style={{
              marginTop: "20px",
              color: "white",
              backgroundColor: "gray",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
