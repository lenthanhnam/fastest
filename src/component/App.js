import {Routes, Route} from 'react-router-dom';
import '../App.css';
import { Header } from './Header';
import { MainContainer } from './MainContainer';
import CreateProduct from './CreateProduct';
import Register from './Register';
import Login from './Login';
// import DSmon from './DSmon';

function App() {
  return (
    <div className='w-full h-auto flex flex-col bg-primary'>
      <Header/>
      <main className='mt-16 md:mt-18 py-4 px-14 w-full'>        
        <Routes>
          <Route path='/' element={<MainContainer />}></Route>
          <Route path='/createItem' element={<CreateProduct />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        {/* <DSmon /> */}
      </main>
    </div>
  );
}

export default App;
