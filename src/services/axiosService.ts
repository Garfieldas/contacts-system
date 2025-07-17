import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    let errorMessage = '';

    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = 'Failed to authorize. Please log in again.';
      } else if (error.response.status === 404) {
        errorMessage = 'Resource not found.';
      } else if (error.response.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (error.response.status === 400) {
        errorMessage = error.response.data?.message || 'Bad request. Please check your input.';
      } else {
        errorMessage = `Error: ${error.response.status} - ${error.response.statusText || 'Something went wrong.'}`;
      }
    } else if (error.request) {
      errorMessage = 'Network error. Please check your internet connection.';
    } else {
      errorMessage = error.message;
    }
    
    return Promise.reject(errorMessage);
  }
);
