import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Honey from './components/Honey/Honey';
import Saffron from './components/saffron/Saffron';
import Massage from './components/massage/Massage';
import Cooking from './components/cooking/Cooking';
import ShILAGIT from './components/Shilagit/ShILAGIT';
import HerbalTea from './components/HerbalTea/HerbalTea';
import DesiGhee from './components/DesiGhee/DesiGhee';
import Acharr from './components/Achaar/Acharr';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/honey" element={<Honey/>} />
        <Route path="/saffron" element={<Saffron/>} />
        <Route path="/massage-oils" element={<Massage/>} />
        <Route path="/cooking-oils" element={<Cooking/>} />
        <Route path="/slagit" element={<ShILAGIT/>} />
        <Route path="/herbal-tea" element={<HerbalTea/>} />
        <Route path="/desi-ghee" element={<DesiGhee/>} />
        <Route path="/achhar" element={<Acharr/>} />
      </Routes>
    </Router>
  );
}

export default App;
