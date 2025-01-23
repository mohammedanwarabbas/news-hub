import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import NewsFeed from './components/News/NewsFeed';
import About from './components/About/About';
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import './styles/global.css';

const App: React.FC = () => {
  return (
    <Router>
      <>
      <Helmet>
        <title>News Hub</title> {/* Default title */}
      </Helmet>
    <Header/>
    <Routes>
        <Route path="/" element={<NewsFeed/>} />
        <Route path="/home" element={<NewsFeed/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<Navigate to='/home' />} />
      </Routes>
      <Footer/>
      </>
    </Router>
  );
};

export default App;
