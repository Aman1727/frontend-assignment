import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home'
import ContestDetails from './components/ContestDetails'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Home/>} />
          <Route path = "/contests/:id" element = {<ContestDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
