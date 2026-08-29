import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import AppDev from './pages/AppDev';
import DigitalMark from './pages/DigitalMark';
import SystemDesign from './pages/SystemDesign';
import AI from './pages/AiAutomation';
import DataScience from './pages/DataScience';
import GraphicDesign from './pages/Graphics';

import Works from './pages/Works';
import Workdetail from './pages/projects/Workdetail';

import News from './pages/News';
import NewsDetail from './pages/news/Newsdetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        {/* <Theme/> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='contact-us' element={<ContactUs />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:slug' element={<NewsDetail />} />
          <Route path='/works' element={<Works />} />
          <Route path="/works/:slug" element={<Workdetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/digital-marketing" element={<DigitalMark />} />
          <Route path ='/services/application-development' element={<AppDev />} />
          <Route path="/services/app-development" element={<AppDev />} />
          <Route path="/services/system-design" element={<SystemDesign />} />
          <Route path="/services/ai-&-automation" element={<AI />} />
          <Route path="/services/data-science" element={<DataScience />} />
          <Route path="/services/graphic-design" element={<GraphicDesign />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;