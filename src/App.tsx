

import Home from './pages/Home';
import { Routes,Route } from 'react-router-dom';
import SecondPage from './pages/SecondPage';




function App() {
  

  return (
    <Routes>
      <Route element={<Home/>} path='/'/>
      <Route element={<SecondPage/>} path='/secondPage'/>

      
    </Routes>
  );
}

export default App;
