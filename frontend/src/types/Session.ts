export interface Session {
    sessionId : number;
    gameId : number;
    startTime : Date;
    duration : number;
    correctAnswers : number;
    incorrectAnswers : number;
}