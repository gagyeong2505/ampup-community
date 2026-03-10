import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import { saveUser } from '../hooks/use-auth.jsx';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: 'rgba(255,255,255,0.04)',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(176, 38, 255, 0.3)' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& .MuiInputLabel-root': { color: 'text.secondary' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
};

/**
 * LoginPage 컴포넌트 - 로그인 페이지
 *
 * Props: 없음
 */
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /**
   * 로그인 처리 - 현재 사용자 정보를 localStorage에 저장 후 메인 진입
   * @todo 실제 API 인증 연동 시 교체
   */
  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    const user = {
      email: email.trim(),
      nickname: email.split('@')[0],
      joinedAt: new Date().toISOString().split('T')[0],
    };
    saveUser(user);
    navigate('/posts');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(176, 38, 255, 0.12) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(255, 0, 204, 0.08) 0%, transparent 40%),
          #111111
        `,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          mx: 2,
          bgcolor: '#1A1A1F',
          border: '1px solid rgba(176, 38, 255, 0.25)',
          boxShadow: '0 0 40px rgba(176, 38, 255, 0.1)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {/* 로고 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(176, 38, 255, 0.3), rgba(176, 38, 255, 0.05))',
                border: '2px solid rgba(176, 38, 255, 0.4)',
                mb: 2,
              }}
            >
              <GraphicEqIcon sx={{ fontSize: '2rem', color: 'primary.main' }} />
            </Box>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #B026FF, #FF00CC)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 0.5,
              }}
            >
              AmpUp
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
              밴드 공연을 사랑하는 사람들의 공간
            </Typography>
          </Box>

          {/* 이메일 / 비밀번호 입력 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
            <TextField
              fullWidth
              label='이메일'
              type='email'
              placeholder='example@email.com'
              value={ email }
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              onKeyDown={ handleKeyDown }
              sx={ textFieldSx }
            />
            <TextField
              fullWidth
              label='비밀번호'
              type='password'
              placeholder='비밀번호를 입력해주세요'
              value={ password }
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              onKeyDown={ handleKeyDown }
              sx={ textFieldSx }
            />
            { error && (
              <Typography variant='caption' sx={{ color: 'error.main' }}>
                { error }
              </Typography>
            ) }
          </Box>

          {/* 로그인 버튼 */}
          <Button
            fullWidth
            variant='contained'
            onClick={ handleLogin }
            sx={{ py: 1.3, fontSize: '1rem', fontWeight: 700, mb: 2 }}
          >
            로그인
          </Button>

          <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.08)' }}>
            <Typography variant='caption' sx={{ color: 'text.secondary', px: 1 }}>또는</Typography>
          </Divider>

          {/* 둘러보기 */}
          <Button
            fullWidth
            variant='outlined'
            onClick={ handleLogin }
            sx={{
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'text.secondary',
              mb: 2,
              '&:hover': {
                borderColor: 'rgba(176, 38, 255, 0.4)',
                color: 'primary.main',
                bgcolor: 'rgba(176, 38, 255, 0.05)',
              },
            }}
          >
            둘러보기 (비로그인)
          </Button>

          {/* 회원가입 안내 */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.35)' }}>
              아직 계정이 없으신가요?
            </Typography>
            <Button
              size='small'
              onClick={() => navigate('/signup')}
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '0.8rem',
                p: 0,
                minWidth: 'auto',
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
              }}
            >
              회원가입
            </Button>
          </Box>

          <Typography
            variant='caption'
            sx={{ display: 'block', textAlign: 'center', mt: 3, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6 }}
          >
            로그인 시 서비스 이용약관 및<br />개인정보처리방침에 동의하게 됩니다.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
