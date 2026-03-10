import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import SocialLoginButtons from '../components/community/social-login-buttons.jsx';

/**
 * LoginPage 컴포넌트 - 로그인 페이지
 *
 * Props: 없음
 */
function LoginPage() {
  const navigate = useNavigate();

  /** @todo 실제 소셜 로그인 연동 시 교체 */
  const handleGuestLogin = () => {
    navigate('/posts');
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
          {/* 로고 영역 */}
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

          {/* 소셜 로그인 버튼 */}
          <SocialLoginButtons />

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.08)' }}>
            <Typography variant='caption' sx={{ color: 'text.secondary', px: 1 }}>또는</Typography>
          </Divider>

          {/* 게스트 입장 (임시) */}
          <Button
            fullWidth
            variant='outlined'
            onClick={ handleGuestLogin }
            sx={{
              borderColor: 'rgba(255,255,255,0.15)',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'rgba(176, 38, 255, 0.4)',
                color: 'primary.main',
                bgcolor: 'rgba(176, 38, 255, 0.05)',
              },
            }}
          >
            둘러보기
          </Button>

          <Typography
            variant='caption'
            sx={{ display: 'block', textAlign: 'center', mt: 3, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}
          >
            로그인 시 서비스 이용약관 및<br />개인정보처리방침에 동의하게 됩니다.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
