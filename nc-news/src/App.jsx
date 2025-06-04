import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SingleArticle from "./pages/SingleArticle";
import Topics from "./pages/Topics";
import TopicArticles from "./pages/TopicArticles";

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:article_id" element={<SingleArticle />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/topics/:topic" element={<TopicArticles />} />
        <Route
          path="/about"
          element={
            <div className="p-4 text-center">
              About Page (To be implemented)
            </div>
          }
        />
        <Route
          path="/author-of-the-year"
          element={
            <div className="p-4 text-center">
              Author of the Year Page (To be implemented)
            </div>
          }
        />
        <Route
          path="*"
          element={
            <div className="p-4 text-center text-red-500">
              404: Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
