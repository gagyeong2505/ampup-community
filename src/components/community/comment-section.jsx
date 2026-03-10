import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import CommentIcon from '@mui/icons-material/Comment';

/** 목업 댓글 데이터 */
const MOCK_COMMENTS = [
  {
    id: 1,
    author: { nickname: '베이스킬러', profileInitial: '베' },
    content: '저도 이 공연 갔는데 진짜 최고였어요! 위잉위잉 떼창 구간에서 소름...',
    createdAt: '2025-11-16 23:00',
    likeCount: 12,
    replies: [
      {
        id: 11,
        parentId: 1,
        author: { nickname: '기타리스트김', profileInitial: '기' },
        mentionedNickname: '베이스킬러',
        content: '@베이스킬러 맞아요!! 그 순간 진짜 울었어요 ㅠㅠ',
        createdAt: '2025-11-16 23:15',
        likeCount: 5,
      },
    ],
  },
  {
    id: 2,
    author: { nickname: '드럼러버', profileInitial: '드' },
    content: '혁오 라이브는 스튜디오보다 훨씬 좋다고 들었는데 역시 직접 가봐야겠네요. 다음 공연 정보 나오면 공유 부탁드려요!',
    createdAt: '2025-11-17 08:30',
    likeCount: 8,
    replies: [],
  },
];

/**
 * CommentSection 컴포넌트 - 댓글 목록 + 작성 폼
 *
 * Props:
 * @param {string|number} postId - 게시물 ID [Required]
 *
 * Example usage:
 * <CommentSection postId={1} />
 */
function CommentSection({ postId }) {
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [replyTarget, setReplyTarget] = useState(null); // { commentId, nickname }
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      author: { nickname: '나', profileInitial: '나' },
      content: newComment,
      createdAt: '방금 전',
      likeCount: 0,
      replies: [],
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId) => {
    if (!replyText.trim()) return;
    const reply = {
      id: Date.now(),
      parentId,
      author: { nickname: '나', profileInitial: '나' },
      mentionedNickname: replyTarget?.nickname || null,
      content: replyTarget?.nickname ? `@${replyTarget.nickname} ${replyText}` : replyText,
      createdAt: '방금 전',
      likeCount: 0,
    };
    setComments((prev) =>
      prev.map((c) => c.id === parentId ? { ...c, replies: [...c.replies, reply] } : c)
    );
    setReplyTarget(null);
    setReplyText('');
  };

  const handleLikeComment = (commentId) => {
    setComments((prev) =>
      prev.map((c) => c.id === commentId ? { ...c, likeCount: c.likeCount + 1 } : c)
    );
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <CommentIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
        <Typography variant='h6' sx={{ fontWeight: 700, fontSize: '1rem' }}>
          댓글 { comments.reduce((acc, c) => acc + 1 + c.replies.length, 0) }
        </Typography>
      </Box>

      {/* 댓글 작성 폼 */}
      <Box sx={{ display: 'flex', gap: 1.5, mb: 4 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(176, 38, 255, 0.3)', fontSize: '0.8rem', flexShrink: 0 }}>
          나
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            multiline
            minRows={2}
            placeholder='공연 어떠셨나요? 자유롭게 댓글을 남겨보세요.'
            value={ newComment }
            onChange={(e) => setNewComment(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#1A1A1F',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(176, 38, 255, 0.3)' },
                '&.Mui-focused fieldset': { borderColor: 'primary.main' },
              },
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              variant='contained'
              size='small'
              onClick={ handleSubmitComment }
              disabled={ !newComment.trim() }
              sx={{ px: 2.5 }}
            >
              등록
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 댓글 목록 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        { comments.map((comment, index) => (
          <Box key={ comment.id }>
            { index > 0 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 1.5 }} /> }

            {/* 댓글 아이템 */}
            <CommentItem
              comment={ comment }
              onLike={() => handleLikeComment(comment.id)}
              onReply={() => setReplyTarget({ commentId: comment.id, nickname: comment.author.nickname })}
            />

            {/* 대댓글 */}
            { comment.replies.map((reply) => (
              <Box key={ reply.id } sx={{ ml: { xs: 4, md: 6 }, mt: 1 }}>
                <CommentItem comment={ reply } isReply />
              </Box>
            )) }

            {/* 대댓글 입력 폼 */}
            { replyTarget?.commentId === comment.id && (
              <Box sx={{ ml: { xs: 4, md: 6 }, mt: 1.5, display: 'flex', gap: 1 }}>
                <Avatar sx={{ width: 28, height: 28, bgcolor: 'rgba(176, 38, 255, 0.3)', fontSize: '0.7rem', flexShrink: 0 }}>나</Avatar>
                <Box sx={{ flex: 1 }}>
                  <TextField
                    fullWidth
                    size='small'
                    placeholder={`@${replyTarget.nickname}에게 답글`}
                    value={ replyText }
                    onChange={(e) => setReplyText(e.target.value)}
                    autoFocus
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#1A1A1F',
                        fontSize: '0.875rem',
                        '& fieldset': { borderColor: 'rgba(176, 38, 255, 0.3)' },
                        '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', mt: 0.5 }}>
                    <Button size='small' onClick={() => setReplyTarget(null)} sx={{ color: 'text.secondary' }}>취소</Button>
                    <Button size='small' variant='contained' onClick={() => handleSubmitReply(comment.id)} disabled={ !replyText.trim() }>등록</Button>
                  </Box>
                </Box>
              </Box>
            ) }
          </Box>
        )) }
      </Box>
    </Box>
  );
}

/**
 * CommentItem 컴포넌트 - 개별 댓글/대댓글 UI
 *
 * Props:
 * @param {object} comment - 댓글 데이터 [Required]
 * @param {function} onLike - 좋아요 핸들러 [Optional]
 * @param {function} onReply - 답글 핸들러 [Optional]
 * @param {boolean} isReply - 대댓글 여부 [Optional, 기본값: false]
 */
function CommentItem({ comment, onLike, onReply, isReply = false }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
    if (onLike) onLike();
  };

  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <Avatar
        sx={{
          width: isReply ? 28 : 36,
          height: isReply ? 28 : 36,
          bgcolor: 'rgba(176, 38, 255, 0.25)',
          fontSize: isReply ? '0.7rem' : '0.8rem',
          flexShrink: 0,
        }}
      >
        { comment.author.profileInitial }
      </Avatar>

      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant='caption' sx={{ fontWeight: 700, color: 'text.primary' }}>
            { comment.author.nickname }
          </Typography>
          <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.3)' }}>
            { comment.createdAt }
          </Typography>
        </Box>

        <Typography variant='body2' sx={{ color: 'text.primary', lineHeight: 1.6, mb: 0.8 }}>
          { comment.mentionedNickname && (
            <Box component='span' sx={{ color: 'primary.main', fontWeight: 700, mr: 0.5 }}>
              @{ comment.mentionedNickname }
            </Box>
          ) }
          { comment.mentionedNickname
            ? comment.content.replace(`@${comment.mentionedNickname} `, '')
            : comment.content
          }
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
            <IconButton size='small' onClick={ handleLike } sx={{ p: 0.3 }}>
              { liked
                ? <FavoriteIcon sx={{ fontSize: '0.85rem', color: 'primary.main' }} />
                : <FavoriteBorderIcon sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)' }} />
              }
            </IconButton>
            <Typography variant='caption' sx={{ color: 'rgba(255,255,255,0.3)' }}>
              { comment.likeCount + (liked ? 1 : 0) }
            </Typography>
          </Box>

          { !isReply && onReply && (
            <Button
              size='small'
              startIcon={<ReplyIcon sx={{ fontSize: '0.85rem !important' }} />}
              onClick={ onReply }
              sx={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '0.75rem',
                p: 0.3,
                minWidth: 'auto',
                '&:hover': { color: 'primary.main' },
              }}
            >
              답글
            </Button>
          ) }
        </Box>
      </Box>
    </Box>
  );
}

export default CommentSection;
