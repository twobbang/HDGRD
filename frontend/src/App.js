import './App.css';
import ButtonAppBar from './components/Appbar';
import Products from './components/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import Registration from './components/Registration';
import RegistrationSuccess from './components/RegistrationSuccess';
import Login from './components/Login';
import LoginSuccess from './components/LoginSuccess';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Category from './components/Category';
import CCTV from './components/CCTV';
import WebRTC from './components/WebRTC';
import { ThemeProvider } from '@mui/material/styles';
import { figmaTheme } from './theme/figmaTheme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={figmaTheme}>
        <AuthProvider>
          <BrowserRouter>
            <ButtonAppBar></ButtonAppBar>
            <Routes>
              <Route path='' element={<ProtectedRoute><Category></Category></ProtectedRoute>} />
              <Route path='/products' element={<ProtectedRoute><Products></Products></ProtectedRoute>} />
              <Route path='/registration' element={<Registration></Registration>} />
              <Route path='/registrationSuccess' element={<RegistrationSuccess></RegistrationSuccess>} />
              <Route path='/login' element={<Login></Login>} />
              <Route path='/loginSuccess' element={<LoginSuccess></LoginSuccess>} />
              <Route path='/product' element={ <ProtectedRoute> <Product></Product> </ProtectedRoute>} />
              <Route path='/category' element={<ProtectedRoute> <Category /> </ProtectedRoute>} />
              <Route path='/cctv' element={<ProtectedRoute> <CCTV /> </ProtectedRoute>} />
              <Route path='/webrtc' element={<ProtectedRoute> <WebRTC /> </ProtectedRoute>} />
            </Routes>
          </BrowserRouter>       
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
