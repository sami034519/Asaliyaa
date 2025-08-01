import './App.css';
import { Routes, Route, useLocation, BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Admin/Dashboard';
import Home from './components/Home/Home';
import Honey from './components/Honey/Honey';
import Saffron from './components/saffron/Saffron';
import Massage from './components/massage/Massage';
import Cooking from './components/cooking/Cooking';
import ShILAGIT from './components/Shilagit/ShILAGIT';
import HerbalTea from './components/HerbalTea/HerbalTea';
import DesiGhee from './components/DesiGhee/DesiGhee';
import Acharr from './components/Achaar/Acharr';
import CartPage from './components/Cartpage/CartPage';
import OrganicFlour from './components/OrganicFlour/OrganicFlour';
import { Provider } from 'react-redux';
import store from './components/Redux/store';
import OrganicSpices from './components/Organic Spices/OrganicSpices';
import ScrollToTop from './components/ScrollToTop'; // optional scroll handler
import ProductDetail from './components/ProductDetail/Productdetail';

function AppWrapper() {
  const location = useLocation();
  const hideLayoutRoutes = ["/admin", "/dashboard"];
  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {!hideLayout && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/honey" element={<Honey />} />
        <Route path="/saffron" element={<Saffron />} />
        <Route path="/massage-oils" element={<Massage />} />
        <Route path="/cooking-oils" element={<Cooking />} />
        <Route path="/slagit" element={<ShILAGIT />} />
        <Route path="/herbal-tea" element={<HerbalTea />} />
        <Route path="/desi-ghee" element={<DesiGhee />} />
         <Route path="/organic-flour" element={<OrganicFlour />} />
          <Route path="/organic-spices" element={<OrganicSpices />} />
        <Route path="/achhar" element={<Acharr />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product/:id" element={<ProductDetail />} />
         <Route path="/product/:id" element={<ProductDetail />} />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppWrapper />
      </Router>
    </Provider>
  );
}

export default App;
