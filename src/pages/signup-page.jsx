import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

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
 * SignupPage 컴포넌트 - 회원가입 페이지
 *
 * Props: 없음
 */
function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  /** @todo 실제 회원가입 API 연동 시 교체 */
  const handleSubmit = () => {
    // 회원가입 성공 후 자동 로그인 금지 → 로그인 화면으로 이동
    navigate('/login');
  };

  const isDisabled =
    !form.email.trim() ||
    !form.nickname.trim() ||
    !form.password.trim() ||
    form.password !== form.passwordConfirm;

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: `
          radial-gradient(ellipse at 80% 50%, rgba(176, 38, 255, 0.1) 0%, transparent 50%),
          #111111
        `,
        py: 4,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 440,
          mx: 2,
          bgcolor: '#1A1A1F',
          border: '1px solid rgba(176, 38, 255, 0.25)',
          boxShadow: '0 0 40px rgba(176, 38, 255, 0.08)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          {/* 헤더 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <IconButton
              onClick={() => navigate('/login')}
              sx={{ mr: 1, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <GraphicEqIcon sx={{ color: 'primary.main', fontSize: '1.4rem' }} />
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #B026FF, #FF00CC)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                AmpUp
              </Typography>
            </Box>
          </Box>

          <Typography variant='h5' sx={{ fontWeight: 700, mb: 0.5 }}>회원가입</Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary', mb: 3 }}>
            공연 후기를 나눌 계정을 만들어보세요.
          </Typography>

          {/* 입력 폼 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label='이메일'
              type='email'
              placeholder='example@email.com'
              value={ form.email }
              onChange={ handleChange('email') }
              sx={ textFieldSx }
            />
            <TextField
              fullWidth
              label='닉네임'
              placeholder='공연장에서 불릴 이름'
              value={ form.nickname }
              onChange={ handleChange('nickname') }
              sx={ textFieldSx }
            />
            <TextField
              fullWidth
              label='비밀번호'
              type='password'
              placeholder='8자 이상 입력해주세요'
              value={ form.password }
              onChange={ handleChange('password') }
              sx={ textFieldSx }
            />
            <TextField
              fullWidth
              label='비밀번호 확인'
              type='password'
              placeholder='비밀번호를 다시 입력해주세요'
              value={ form.passwordConfirm }
              onChange={ handleChange('passwordConfirm') }
              error={ form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm }
              helperText={
                form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm
                  ? '비밀번호가 일치하지 않습니다.'
                  : ''
              }
              sx={ textFieldSx }
            />
          </Box>

          <Button
            fullWidth
            variant='contained'
            onClick={ handleSubmit }
            disabled={ isDisabled }
            sx={{ mt: 3, py: 1.3, fontSize: '1rem', fontWeight: 700 }}
          >
            가입하기
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2.5 }}>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.35)' }}>
              이미 계정이 있으신가요?
            </Typography>
            <Button
              size='small'
              onClick={() => navigate('/login')}
              sx={{
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '0.8rem',
                p: 0,
                minWidth: 'auto',
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
              }}
            >
              로그인
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignupPage;
