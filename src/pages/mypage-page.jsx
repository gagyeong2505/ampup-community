import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { loadUser, clearUser } from '../hooks/use-auth.jsx';
import { usePosts } from '../context/posts-context.jsx';

/**
 * MypagePage 컴포넌트 - 마이페이지
 * 현재 로그인한 사용자의 정보(localStorage)를 출력
 *
 * Props: 없음
 */
function MypagePage() {
  const navigate = useNavigate();
  const { posts } = usePosts();

  // 현재 로그인 사용자 로드 (localStorage 기반)
  const user = loadUser();

  // 로그인 정보 없으면 로그인 페이지로
  if (!user) {
    navigate('/login');
    return null;
  }

  // 현재 사용자가 작성한 게시물 수
  const myPostCount = posts.filter((p) => p.author.nickname === user.nickname).length;

  const infoItems = [
    {
      icon: <EmailIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />,
      label: '이메일',
      value: user.email,
    },
    {
      icon: <PersonIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />,
      label: '닉네임',
      value: user.nickname,
    },
    {
      icon: <CalendarTodayIcon sx={{ fontSize: '1rem', color: '#00C9FF' }} />,
      label: '가입일',
      value: user.joinedAt,
    },
  ];

  const handleLogout = () => {
    clearUser(); // 현재 사용자 상태 초기화
    navigate('/login');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth='sm'>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/posts')}
          sx={{ mb: 3, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
        >
          돌아가기
        </Button>

        {/* 프로필 카드 */}
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            bgcolor: '#1A1A1F',
            border: '1px solid rgba(176, 38, 255, 0.2)',
            boxShadow: '0 0 30px rgba(176, 38, 255, 0.06)',
            mb: 3,
          }}
        >
          {/* 아바타 + 닉네임 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
            <Avatar
              sx={{
                width: 72,
                height: 72,
                fontSize: '1.8rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, rgba(176,38,255,0.4), rgba(255,0,204,0.3))',
                border: '2px solid rgba(176, 38, 255, 0.5)',
              }}
            >
              { user.nickname[0].toUpperCase() }
            </Avatar>
            <Box>
              <Typography variant='h5' sx={{ fontWeight: 700 }}>
                { user.nickname }
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary', mt: 0.3 }}>
                AmpUp 멤버
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 3 }} />

          {/* 정보 목록 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            { infoItems.map((item) => (
              <Box key={ item.label } sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                { item.icon }
                <Box>
                  <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.2 }}>
                    { item.label }
                  </Typography>
                  <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                    { item.value }
                  </Typography>
                </Box>
              </Box>
            )) }
          </Box>
        </Box>

        {/* 활동 통계 */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: '#1A1A1F',
            border: '1px solid rgba(176, 38, 255, 0.15)',
            display: 'flex',
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <MusicNoteIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
              <Typography variant='h5' sx={{ fontWeight: 800, color: 'primary.main' }}>
                { myPostCount }
              </Typography>
            </Box>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>작성한 후기</Typography>
          </Box>
          <Divider orientation='vertical' flexItem sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
              <FavoriteIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />
              <Typography variant='h5' sx={{ fontWeight: 800, color: 'secondary.main' }}>
                { posts.filter((p) => p.author.nickname === user.nickname).reduce((acc, p) => acc + p.likeCount, 0) }
              </Typography>
            </Box>
            <Typography variant='caption' sx={{ color: 'text.secondary' }}>받은 좋아요</Typography>
          </Box>
        </Box>

        {/* 로그아웃 */}
        <Button
          fullWidth
          variant='outlined'
          onClick={ handleLogout }
          sx={{
            mt: 3,
            borderColor: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.4)',
            '&:hover': { borderColor: 'error.main', color: 'error.main', bgcolor: 'rgba(211,47,47,0.05)' },
          }}
        >
          로그아웃
        </Button>
      </Container>
    </Box>
  );
}

export default MypagePage;
