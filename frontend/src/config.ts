if (!process.env.REACT_APP_API_URL)
  throw new Error("REACT_APP_API_URL must be defined");
export const API_URL = process.env.REACT_APP_API_URL;
