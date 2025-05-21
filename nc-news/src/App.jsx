import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SingleArticle from "./pages/SingleArticle";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
