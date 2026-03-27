import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import About from './pages/About.jsx';
import SonioxTranscriber from './pages/soniox-transcriber.jsx';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 80px)' }}> {/* Adjust based on footer height */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/transcriber" element={<SonioxTranscriber />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
