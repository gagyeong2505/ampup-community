import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';

/**
 * PostCard 컴포넌트 - 게시물 목록 카드 UI
 *
 * Props:
 * @param {object} post - 게시물 데이터 [Required]
 * @param {function} onClick - 카드 클릭 핸들러 [Required]
 *
 * Example usage:
 * <PostCard post={postData} onClick={() => navigate(`/posts/${post.id}`)} />
 */
function PostCard({ post, onClick }) {
  const postTypeColor = {
    '후기': { bg: 'rgba(176, 38, 255, 0.15)', color: '#B026FF', border: 'rgba(176, 38, 255, 0.3)' },
    '질문': { bg: 'rgba(255, 170, 0, 0.12)', color: '#FFAA00', border: 'rgba(255, 170, 0, 0.3)' },
    '일반': { bg: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.1)' },
  };
  const typeStyle = postTypeColor[post.postType] || postTypeColor['일반'];

  return (
    <Card
      sx={{
        bgcolor: '#1A1A1F',
        border: '1px solid rgba(176, 38, 255, 0.1)',
        transition: 'all 0.2s ease',
        '&:hover': {
          border: '1px solid rgba(176, 38, 255, 0.35)',
          boxShadow: '0 0 16px rgba(176, 38, 255, 0.1)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <CardActionArea onClick={ onClick }>
        <CardContent sx={{ p: { xs: 2, md: 2.5 } }}>
          {/* 상단: 태그 + 별점 */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Chip
              label={ post.postType }
              size='small'
              sx={{
                bgcolor: typeStyle.bg,
                color: typeStyle.color,
                border: `1px solid ${typeStyle.border}`,
                fontSize: '0.75rem',
                height: 22,
              }}
            />
            { post.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                { Array.from({ length: post.rating }).map((_, i) => (
                  <StarIcon key={ i } sx={{ fontSize: '0.85rem', color: '#FFB800' }} />
                )) }
              </Box>
            ) }
          </Box>

          {/* 제목 */}
          <Typography
            variant='h6'
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.primary',
              mb: 1,
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            { post.title }
          </Typography>

          {/* 본문 미리보기 */}
          <Typography
            variant='body2'
            sx={{
              color: 'text.secondary',
              mb: 1.5,
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            { post.content }
          </Typography>

          {/* 공연 정보 (후기 타입일 때만) */}
          { post.artistName && (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 1, md: 2 },
                mb: 1.5,
                p: 1.2,
                bgcolor: 'rgba(176, 38, 255, 0.06)',
                borderRadius: 1,
                border: '1px solid rgba(176, 38, 255, 0.12)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Typography variant='caption' sx={{ color: 'primary.main', fontWeight: 700 }}>
                  { post.artistName }
                </Typography>
              </Box>
              { post.venueName && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <LocationOnIcon sx={{ fontSize: '0.75rem', color: 'text.secondary' }} />
                  <Typography variant='caption' sx={{ color: 'text.secondary' }}>{ post.venueName }</Typography>
                </Box>
              ) }
              { post.concertDate && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                  <CalendarTodayIcon sx={{ fontSize: '0.75rem', color: 'text.secondary' }} />
                  <Typography variant='caption' sx={{ color: 'text.secondary' }}>{ post.concertDate }</Typography>
                </Box>
              ) }
            </Box>
          ) }

          {/* 하단: 작성자 + 통계 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'rgba(176, 38, 255, 0.3)' }}>
                { post.author.profileInitial }
              </Avatar>
              <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                { post.author.nickname }
              </Typography>
              <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.2)' }}>·</Typography>
              <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.3)' }}>
                { post.createdAt }
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <VisibilityIcon sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }} />
                <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.3)' }}>{ post.viewCount }</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <FavoriteIcon sx={{ fontSize: '0.8rem', color: 'rgba(176, 38, 255, 0.6)' }} />
                <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.4)' }}>{ post.likeCount }</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4 }}>
                <CommentIcon sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }} />
                <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.3)' }}>{ post.commentCount }</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default PostCard;
