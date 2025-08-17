import { Route, Routes } from 'react-router-dom';
import FloatingShape from './components/FloatingShape.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/Login.jsx';
import EmailVerificationPage from './pages/EmailVerificationPage.jsx';
import Home from './pages/Home.jsx';
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center relative overflow-hidden">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left="10%" delay={0}></FloatingShape>
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left="80%" delay={5}></FloatingShape>
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left="-10%" delay={2}></FloatingShape>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<SignupPage/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/verify-email' element={<EmailVerificationPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App
