import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('API URL:', API_URL); // Debug log

export interface QuestionResponse {
  answer: string;
  sources: string[];
  error?: string;
}

export const askQuestion = async (question: string): Promise<QuestionResponse> => {
  try {
    console.log('Sending question to API:', question); // Debug log
    const response = await axios.post<QuestionResponse>(`${API_URL}/ask`, {
      question,
    });
    console.log('API response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('API error:', error); // Debug log
    if (axios.isAxiosError(error) && error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Failed to get answer. Please try again.');
  }
}; 