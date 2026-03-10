import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';

/**
 * AppHeader 컴포넌트 - 사이트 공통 상단 네비게이션 바
 *
 * Props: 없음 (추후 user 정보 props 추가 예정)
 */
function AppHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const navItems = [
    { label: '공연 후기', path: '/posts' },
  ];

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        bgcolor: 'rgba(17, 17, 17, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(176, 38, 255, 0.2)',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
        {/* 로고 */}
        <Box
          onClick={() => navigate('/posts')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            mr: 4,
          }}
        >
          <GraphicEqIcon sx={{ color: 'primary.main', fontSize: '1.8rem' }} />
          <Typography
            variant='h6'
            sx={{
              fontWeight: 800,
              fontSize: '1.4rem',
              background: 'linear-gradient(135deg, #B026FF, #FF00CC)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}
          >
            AmpUp
          </Typography>
        </Box>

        {/* 네비게이션 */}
        <Box sx={{ display: 'flex', gap: 0.5, flexGrow: 1 }}>
          { navItems.map((item) => (
            <Button
              key={ item.path }
              onClick={() => navigate(item.path)}
              sx={{
                color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                fontWeight: isActive(item.path) ? 700 : 400,
                fontSize: '0.95rem',
                px: 2,
                '&:hover': { color: 'primary.main', bgcolor: 'rgba(176, 38, 255, 0.08)' },
              }}
            >
              { item.label }
            </Button>
          )) }
        </Box>

        {/* 글쓰기 버튼 */}
        <Button
          variant='contained'
          size='small'
          onClick={() => navigate('/posts/write')}
          sx={{ mr: 2, px: 2.5 }}
        >
          후기 작성
        </Button>

        {/* 프로필 아이콘 */}
        <Tooltip title='내 프로필'>
          <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: 'rgba(176, 38, 255, 0.3)',
                border: '2px solid rgba(176, 38, 255, 0.5)',
                fontSize: '0.9rem',
              }}
            >
              U
            </Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={ anchorEl }
          open={ Boolean(anchorEl) }
          onClose={ handleMenuClose }
          PaperProps={{
            sx: {
              bgcolor: '#1A1A1F',
              border: '1px solid rgba(176, 38, 255, 0.2)',
              mt: 1,
            },
          }}
        >
          <MenuItem onClick={() => { handleMenuClose(); navigate('/mypage'); }} sx={{ fontSize: '0.9rem' }}>마이페이지</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }} sx={{ fontSize: '0.9rem', color: 'error.main' }}>로그아웃</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
