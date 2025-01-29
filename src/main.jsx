import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       retry: 1,
//     },
//   },
// });
const queryClient = new QueryClient({});

if (process.env.NODE_ENV === 'production'|| process.env.NODE_ENV == "development") {
  ['log', 'info', 'warn', 'error', 'debug'].forEach((method) => {
    console[method] = () => {};
  });
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ToastContainer autoClose={2000} position="bottom-right" />
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
