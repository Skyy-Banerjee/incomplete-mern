export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000"; // Use HTTP for local development
  }
  return "https://your-production-url.com"; // Use HTTPS for production
};
