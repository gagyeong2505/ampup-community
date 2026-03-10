import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppHeader from './components/common/app-header.jsx';
import LoginPage from './pages/login-page.jsx';
import SignupPage from './pages/signup-page.jsx';
import PostListPage from './pages/post-list-page.jsx';
import PostDetailPage from './pages/post-detail-page.jsx';
import PostWritePage from './pages/post-write-page.jsx';
import MypagePage from './pages/mypage-page.jsx';

function App() {
  return (
    <BrowserRouter basename='/ampup-community'>
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Routes>
          {/* 첫 진입 → 로그인 */}
          <Route path='/' element={<Navigate to='/login' replace />} />

          {/* 인증 페이지 (헤더 없음) */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

          {/* 메인 페이지 (헤더 있음) */}
          <Route
            path='/*'
            element={
              <>
                <AppHeader />
                <Box component='main' sx={{ pt: '64px' }}>
                  <Routes>
                    <Route path='/posts' element={<PostListPage />} />
                    <Route path='/posts/write' element={<PostWritePage />} />
                    <Route path='/posts/:postId' element={<PostDetailPage />} />
                    <Route path='/mypage' element={<MypagePage />} />
                    <Route path='*' element={<Navigate to='/posts' replace />} />
                  </Routes>
                </Box>
              </>
            }
          />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
