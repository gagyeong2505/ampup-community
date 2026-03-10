import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import AppHeader from './components/common/app-header.jsx';
import LoginPage from './pages/login-page.jsx';
import PostListPage from './pages/post-list-page.jsx';
import PostDetailPage from './pages/post-detail-page.jsx';
import PostWritePage from './pages/post-write-page.jsx';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route
            path='/*'
            element={
              <>
                <AppHeader />
                <Box component='main' sx={{ pt: '64px' }}>
                  <Routes>
                    <Route path='/' element={<Navigate to='/posts' replace />} />
                    <Route path='/posts' element={<PostListPage />} />
                    <Route path='/posts/:postId' element={<PostDetailPage />} />
                    <Route path='/posts/write' element={<PostWritePage />} />
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
