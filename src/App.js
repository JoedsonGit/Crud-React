import './App.css';
import Home from './components/Home';
import Sobre from './components/Sobre';
import Cliente from './components/Cliente';
import {BrowserRouter, Routes, Link, Route} from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <h1>Crud React</h1>
    <BrowserRouter>
      <Nav variant="tabs">
        <Nav.Link as={Link} to="/">Pagina incial</Nav.Link>
        <Nav.Link as={Link} to="/clientes">cadastro Cliente</Nav.Link>
        <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
      </Nav>
      <Routes>
        <Route path="/" index element={<Home/>}></Route>
        <Route path="/clientes" element={<Cliente/>}></Route>
        <Route path="/sobre" element={<Sobre/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
