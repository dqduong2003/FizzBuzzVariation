import axios from "axios";
import { Game } from "../types/Game";
import { Session } from "../types/Session";
import { CreateGameRequest } from "../types/CreateGameRequest";

// Base API URL
const API_URL = "//localhost:5000/api"; 

export const GameService = {
    // Fetch all games
    getAllGames: async (): Promise<Game[]> => {
      try {
        const response = await axios.get<Game[]>(`${API_URL}/Games`); // Explicitly define the return type
        return response.data; // Return the list of games as Game[]
      } catch (error) {
        console.error("Error fetching games:", error);
        throw error;
      }
    },
    // Fetch a game by ID
    getGameById: async (gameId: number): Promise<Game> => {
      try {
        const response = await axios.get<Game>(`${API_URL}/Games/${gameId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching game by ID:", error);
        throw error;
      }
    },
      // Create a new game
    createGame: async (gameData: CreateGameRequest): Promise<Game> => {
      try {
        const response = await axios.post<Game>(`${API_URL}/Games`, gameData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error creating game:", error);
        throw error;
      }
    },
  };

  export const SessionService = {
    getAllSessions: async (): Promise<Session[]> => {
      const response = await axios.get<Session[]>(`${API_URL}/Session`);
      return response.data;
    },
    getActiveSessionById: async (sessionId: number): Promise<Session> => {
      const response = await axios.get<Session>(`${API_URL}/Session/active-session/${sessionId}`);
      return response.data;
    },
    startSession: async (data: { gameId: number; duration: number }) => {
      const response = await axios.post(`${API_URL}/Session/start-session/${data.gameId}`, data);
      return response.data; // { sessionId, randomNumber }
    },
    submitAnswer: async (data: { sessionId: number; randomNumber: number; answer: string }) => {
      const response = await axios.put(`${API_URL}/Session/submit`, data);
      return response.data; // { correct: boolean }
    },
    generateRandomNumber: async (sessionId: number) => {
      const response = await axios.get(`${API_URL}/Session/generate-random/${sessionId}`);
      return response.data;
    },
    cancelSessionById: async (sessionId: number): Promise<boolean> => {
      try {
        const response = await axios.get<boolean>(`${API_URL}/Session/cancel/${sessionId}`);
        return response.data;
      } catch (error) {
        console.error("Failed to cancel session:", error);
        return false; // Return false in case of an error
      }
    },
  };