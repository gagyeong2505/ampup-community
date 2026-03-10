import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import PostFilterBar from '../components/community/post-filter-bar.jsx';
import PostCard from '../components/community/post-card.jsx';
import { usePosts } from '../context/posts-context.jsx';

const FILTER_ITEMS = ['전체', '후기', '질문', '일반'];

/**
 * PostListPage 컴포넌트 - 게시물 목록 페이지
 * PostsContext에서 posts를 읽어 목록을 즉시 반영
 *
 * Props: 없음
 */
function PostListPage() {
  const navigate = useNavigate();
  const { posts } = usePosts();
  const [activeFilter, setActiveFilter] = useState('전체');

  const filteredPosts = activeFilter === '전체'
    ? posts
    : posts.filter((post) => post.postType === activeFilter);

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
