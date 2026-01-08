import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SidebarProvider } from "./pages/SidebarProvider";
import { AuthProvider } from "./contexts/AuthContext"; // ✅ Import the provider

// import { AuthProvider } from "./contexts/JWTAuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SidebarProvider>
  <AuthProvider>
     <App />
  </AuthProvider>
   
      
    </SidebarProvider>
  </React.StrictMode>
);
