import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import PostFilterBar from '../components/community/post-filter-bar.jsx';
import PostCard from '../components/community/post-card.jsx';

/** 목업 데이터 */
const MOCK_POSTS = [
  {
    id: 1,
    postType: '후기',
    title: '혁오 20주년 앙코르 공연 - 평생 잊지 못할 밤',
    content: '드디어 갔다. 3년 기다린 혁오 공연. 서울 올림픽공원 체조경기장이 꽉 찼고, "위잉위잉"에서 온 관객이 떼창할 때 눈물이 났다.',
    artistName: '혁오',
    venueName: '올림픽공원 체조경기장',
    concertDate: '2025-11-15',
    rating: 5,
    viewCount: 1240,
    likeCount: 87,
    commentCount: 34,
    author: { nickname: '기타리스트김', profileInitial: '기' },
    createdAt: '2025-11-16',
    imageUrl: null,
  },
  {
    id: 2,
    postType: '후기',
    title: '실리카겔 단독 공연 - 사이키델릭의 끝판왕',
    content: '조명이 미쳤다. NO PAIN 나올 때 레이저 쇼는 진짜 공연장에서만 느낄 수 있는 경험. 세트리스트 최고였음.',
    artistName: '실리카겔',
    venueName: '예스24 라이브홀',
    concertDate: '2025-10-28',
    rating: 5,
    viewCount: 892,
    likeCount: 63,
    commentCount: 21,
    author: { nickname: '드럼러버', profileInitial: '드' },
    createdAt: '2025-10-29',
    imageUrl: null,
  },
  {
    id: 3,
    postType: '후기',
    title: '잔나비 가을 콘서트 - 추억의 감성 가득',
    content: '가을에 듣는 잔나비는 역시 다르다. 최정훈의 목소리가 라이브에서 더 빛났다. 폭죽 터질 때 대박.',
    artistName: '잔나비',
    venueName: '올림픽공원 88잔디마당',
    concertDate: '2025-10-10',
    rating: 4,
    viewCount: 756,
    likeCount: 51,
    commentCount: 18,
    author: { nickname: '베이스킬러', profileInitial: '베' },
    createdAt: '2025-10-11',
    imageUrl: null,
  },
  {
    id: 4,
    postType: '질문',
    title: '내한공연 좋은 자리 구하는 팁 있나요?',
    content: '다음 달 외국 밴드 내한 공연 티켓팅 있는데 좋은 자리 잡는 방법 공유해주실 분 있나요?',
    artistName: null,
    venueName: null,
    concertDate: null,
    rating: null,
    viewCount: 445,
    likeCount: 12,
    commentCount: 27,
    author: { nickname: '공연초보', profileInitial: '공' },
    createdAt: '2025-11-01',
    imageUrl: null,
  },
];

const FILTER_ITEMS = ['전체', '후기', '질문', '일반'];

/**
 * PostListPage 컴포넌트 - 게시물 목록 페이지
 *
 * Props: 없음
 */
function PostListPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('전체');

  const filteredPosts = activeFilter === '전체'
    ? MOCK_POSTS
    : MOCK_POSTS.filter((post) => post.postType === activeFilter);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth='lg'>
        {/* 페이지 타이틀 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography
              variant='h4'
              sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1.5rem', md: '2rem' } }}
            >
              공연 후기
            </Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary', mt: 0.5 }}>
              { filteredPosts.length }개의 게시물
            </Typography>
          </Box>
          <Button
            variant='contained'
            startIcon={<EditIcon />}
            onClick={() => navigate('/posts/write')}
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          >
            후기 작성
          </Button>
        </Box>

        {/* 필터 바 */}
        <PostFilterBar
          items={ FILTER_ITEMS }
          activeItem={ activeFilter }
          onSelect={ setActiveFilter }
        />

        {/* 게시물 카드 목록 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
          { filteredPosts.map((post) => (
            <PostCard
              key={ post.id }
              post={ post }
              onClick={() => navigate(`/posts/${post.id}`)}
            />
          )) }
        </Box>
      </Container>
    </Box>
  );
}

export default PostListPage;
