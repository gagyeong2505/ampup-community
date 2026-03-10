import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/**
 * SocialLoginButtons 컴포넌트 - 소셜 로그인 버튼 목록
 *
 * Props:
 * @param {function} onLogin - 로그인 성공 시 호출 콜백 [Optional]
 *
 * Example usage:
 * <SocialLoginButtons onLogin={() => navigate('/posts')} />
 */
function SocialLoginButtons({ onLogin }) {
  /** @todo 실제 OAuth 연동 시 각 핸들러 구현 */
  const providers = [
    {
      id: 'google',
      label: 'Google로 계속하기',
      bgcolor: '#FFFFFF',
      color: '#3C4043',
      hoverBg: '#F5F5F5',
      icon: (
        <svg width='18' height='18' viewBox='0 0 18 18'>
          <path fill='#4285F4' d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z' />
          <path fill='#34A853' d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2.04a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z' />
          <path fill='#FBBC05' d='M4.5 10.48A4.8 4.8 0 0 1 4.5 7.5V5.43H1.83a8 8 0 0 0 0 7.12z' />
          <path fill='#EA4335' d='M8.98 3.58c1.32 0 2.5.45 3.44 1.35l2.54-2.54A8 8 0 0 0 1.83 5.43L4.5 7.5a4.77 4.77 0 0 1 4.48-3.92z' />
        </svg>
      ),
    },
    {
      id: 'kakao',
      label: '카카오로 계속하기',
      bgcolor: '#FEE500',
      color: '#3C1E1E',
      hoverBg: '#F5DC00',
      icon: (
        <svg width='18' height='18' viewBox='0 0 18 18' fill='#3C1E1E'>
          <path d='M9 1.5C4.86 1.5 1.5 4.09 1.5 7.28c0 2.01 1.3 3.78 3.28 4.79l-.84 3.1c-.07.28.23.5.47.34l3.62-2.4c.31.04.63.06.97.06 4.14 0 7.5-2.59 7.5-5.78C16.5 4.09 13.14 1.5 9 1.5z' />
        </svg>
      ),
    },
    {
      id: 'naver',
      label: '네이버로 계속하기',
      bgcolor: '#03C75A',
      color: '#FFFFFF',
      hoverBg: '#02B350',
      icon: (
        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', lineHeight: 1 }}>N</Typography>
      ),
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      { providers.map((provider) => (
        <Button
          key={ provider.id }
          fullWidth
          onClick={() => { if (onLogin) onLogin(); }}
          sx={{
            bgcolor: provider.bgcolor,
            color: provider.color,
            fontWeight: 600,
            fontSize: '0.95rem',
            py: 1.3,
            gap: 1.5,
            justifyContent: 'center',
            '&:hover': {
              bgcolor: provider.hoverBg,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: 18 }}>
            { provider.icon }
          </Box>
          { provider.label }
        </Button>
      )) }
    </Box>
  );
}

export default SocialLoginButtons;
