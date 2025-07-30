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
        errorMessage = 'Nepavyko prisijungti. Pabandykite dar kartą prisijungti.';
      } else if (error.response.status === 404) {
        errorMessage = 'Nepavyko nieko rasti';
      } else if (error.response.status === 500) {
        errorMessage = 'Serverio klaida. Prašome pabandykite dar kartą vėliau.';
      } else if (error.response.status === 400) {
        errorMessage ='Patikrinkite suvestus duomenis ir bandykite dar kartą.';
      } else {
        errorMessage = 'Atsiprašome, bet susidūrėme su problema. Prašome pabandykite dar kartą vėliau';
      }
    } else if (error.request) {
      errorMessage = 'Deja, atrodo, kad jūsų įrenginys šiuo metu neturi interneto ryšio.';
    } else {
      errorMessage = 'Atsiprašome, bet susidūrėme su problema. Prašome pabandykite dar kartą vėliau';
    }
    
    return Promise.reject(errorMessage);
  }
);
