import './App.css';
import Form from './components/Form';
import {Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Form/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/Main' element={<Main/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
