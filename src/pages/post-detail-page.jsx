import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ConcertInfoBox from '../components/community/concert-info-box.jsx';
import SetlistBox from '../components/community/setlist-box.jsx';
import CommentSection from '../components/community/comment-section.jsx';

/** 목업 데이터 */
const MOCK_POST = {
  id: 1,
  postType: '후기',
  title: '혁오 20주년 앙코르 공연 - 평생 잊지 못할 밤',
  content: `드디어 갔다. 3년 기다린 혁오 공연. 서울 올림픽공원 체조경기장이 꽉 찼고, "위잉위잉"에서 온 관객이 떼창할 때 눈물이 났다.

오혁의 목소리는 라이브에서 더 진하다. 스튜디오 버전보다 훨씬 감성이 폭발했고, 특히 "tomboy" 파트에서 조명이 보라색으로 바뀌던 그 순간은 진짜 소름이었다.

공연장 음향도 완벽했고, 앞뒤 관객 다들 매너 있었음. 중간에 오혁이 "오늘 날씨 진짜 공연하기 좋다"고 했을 때 모두가 함성. 앙코르 2번 받았는데 그것도 모자랄 정도.

다음 공연도 무조건 간다.`,
  artistName: '혁오',
  venueName: '올림픽공원 체조경기장',
  concertDate: '2025-11-15',
  rating: 5,
  viewCount: 1240,
  likeCount: 87,
  author: { nickname: '기타리스트김', profileInitial: '기', bio: '밴드 공연 500회 이상 관람. 혁오 덕후.' },
  createdAt: '2025-11-16 22:30',
  setlist: [
    { order: 1, title: 'Childhood' },
    { order: 2, title: '공드리' },
    { order: 3, title: 'tomboy' },
    { order: 4, title: '위잉위잉' },
    { order: 5, title: 'Gondry' },
    { order: 6, title: 'OHAYO MY NIGHT' },
    { order: 7, title: '가기싫어' },
    { order: 8, title: 'Boy' },
  ],
};

/**
 * PostDetailPage 컴포넌트 - 게시물 상세 페이지
 *
 * Props: 없음 (useParams로 postId 획득)
 */
function PostDetailPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(MOCK_POST.likeCount);
  const [isFollowing, setIsFollowing] = useState(false);

  const post = MOCK_POST; // 추후 postId로 fetch

  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => isLiked ? prev - 1 : prev + 1);
  };

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth='md'>
        {/* 뒤로가기 */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/posts')}
          sx={{ mb: 3, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
        >
          목록으로
        </Button>

        {/* 게시물 헤더 */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Chip
              label={ post.postType }
              size='small'
              sx={{
                bgcolor: 'rgba(176, 38, 255, 0.15)',
                color: 'primary.main',
                border: '1px solid rgba(176, 38, 255, 0.3)',
                fontSize: '0.75rem',
              }}
            />
            { post.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                { Array.from({ length: post.rating }).map((_, i) => (
                  <StarIcon key={ i } sx={{ fontSize: '0.9rem', color: '#FFB800' }} />
                )) }
              </Box>
            ) }
          </Box>

          <Typography
            variant='h4'
            sx={{ fontWeight: 700, fontSize: { xs: '1.4rem', md: '1.8rem' }, lineHeight: 1.4, mb: 2 }}
          >
            { post.title }
          </Typography>

          {/* 작성자 정보 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: 'rgba(176, 38, 255, 0.3)', fontSize: '1rem' }}>
                { post.author.profileInitial }
              </Avatar>
              <Box>
                <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                  { post.author.nickname }
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                  { post.createdAt } · 조회 { post.viewCount }
                </Typography>
              </Box>
            </Box>

            {/* 팔로우 버튼 */}
            <Button
              variant={ isFollowing ? 'outlined' : 'contained' }
              size='small'
              startIcon={ isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon /> }
              onClick={ handleFollowToggle }
              sx={{
                minWidth: 100,
                ...(isFollowing && {
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: 'text.secondary',
                  '&:hover': { borderColor: 'error.main', color: 'error.main' },
                }),
              }}
            >
              { isFollowing ? '팔로잉' : '팔로우' }
            </Button>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 3 }} />

        {/* 공연 정보 박스 */}
        { post.artistName && (
          <ConcertInfoBox
            artistName={ post.artistName }
            venueName={ post.venueName }
            concertDate={ post.concertDate }
          />
        ) }

        {/* 본문 */}
        <Typography
          variant='body1'
          sx={{
            color: 'text.primary',
            lineHeight: 1.9,
            fontSize: '1rem',
            whiteSpace: 'pre-line',
            mb: 4,
          }}
        >
          { post.content }
        </Typography>

        {/* 세트리스트 */}
        { post.setlist && post.setlist.length > 0 && (
          <SetlistBox setlist={ post.setlist } />
        ) }

        {/* 좋아요 버튼 */}
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
            <IconButton
              onClick={ handleLikeToggle }
              sx={{
                width: 56,
                height: 56,
                border: `2px solid ${isLiked ? 'rgba(176, 38, 255, 0.6)' : 'rgba(255,255,255,0.1)'}`,
                bgcolor: isLiked ? 'rgba(176, 38, 255, 0.12)' : 'transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(176, 38, 255, 0.15)',
                  border: '2px solid rgba(176, 38, 255, 0.5)',
                },
              }}
            >
              { isLiked
                ? <FavoriteIcon sx={{ color: 'primary.main', fontSize: '1.5rem' }} />
                : <FavoriteBorderIcon sx={{ color: 'text.secondary', fontSize: '1.5rem' }} />
              }
            </IconButton>
            <Typography variant='caption' sx={{ color: isLiked ? 'primary.main' : 'text.secondary', fontWeight: 600 }}>
              { likeCount }
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 4 }} />

        {/* 댓글 섹션 */}
        <CommentSection postId={ postId } />
      </Container>
    </Box>
  );
}

export default PostDetailPage;
