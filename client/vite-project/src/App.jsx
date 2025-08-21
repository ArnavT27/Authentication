import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import FloatingShape from './components/FloatingShape.jsx';
import { Loader } from 'lucide-react';

// Lazy load components
const SignupPage = lazy(() => import('./pages/SignupPage.jsx'));
const LoginPage = lazy(() => import('./pages/Login.jsx'));
const EmailVerificationPage = lazy(() => import('./pages/EmailVerificationPage.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage.jsx'));
const ChangePasswordPage = lazy(() => import('./pages/ChangePasswordPage.jsx'));
const WelcomeHome = lazy(() => import('./pages/WelcomeHome.jsx'));



function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center relative overflow-hidden">
      <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left="10%" delay={0}></FloatingShape>
      <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left="80%" delay={5}></FloatingShape>
      <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left="-10%" delay={2}></FloatingShape>
      
      <Suspense fallback={<Loader className='animate-spin flex justify-center items-center text-white size-[30px]' />}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/verify-email' element={<EmailVerificationPage/>}></Route>
          <Route path='/forgot-password' element={<ForgotPasswordPage/>}></Route>
          <Route path='/forgot-password/:token' element={<ChangePasswordPage/>}></Route>
          <Route path='/home' element={<WelcomeHome/>}></Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App;