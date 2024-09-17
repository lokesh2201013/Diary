import { Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import Diary from './page/Diary';
import About from './page/About';
import Contact from './page/Contact';
import Add from "./page/Add"
function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/diary/:id' element={<Diary/>}></Route>
      <Route path="/about" element={<About />} />
      <Route path="/add" element={<Add />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>   
  );
}

export default App;
