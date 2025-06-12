import Navbar from "./layouts/base/navbar/Navbar.tsx";
import Route from "./router.tsx";

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img src="/images/IMG_2016.JPG" alt="img" className="home-video" />
      <Navbar />
      <Route />
    </div>
  );
};

export default App;
