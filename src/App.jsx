import { useState } from "react";
import "./App.css"
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ResetPassword from "./pages/Auth/ResetPassword";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  const handleResetPassword = data => {
    console.log("Reset password request:", data);
  };

  const renderCurrentPage = () => {
    if (currentPage === "register") {
      return <Register />;
    }

    if (currentPage === "reset-password") {
      return <ResetPassword onResetPassword={handleResetPassword} />;
    }

    return <Login />;
  };

  return (
    <div className="app-layout">
      <Header onNavigate={setCurrentPage} />
      <main className="main-center-content">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
