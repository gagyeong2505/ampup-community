import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../context/posts-context.jsx';
import { loadUser } from '../hooks/use-auth.jsx';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const textFieldSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#1A1A1F',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
    '&:hover fieldset': { borderColor: 'rgba(176, 38, 255, 0.3)' },
    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
  },
  '& .MuiInputLabel-root': { color: 'text.secondary' },
  '& .MuiInputLabel-root.Mui-focused': { color: 'primary.main' },
};

/**
 * PostWritePage 컴포넌트 - 게시물 작성 페이지
 *
 * Props: 없음
 */
function PostWritePage() {
  const navigate = useNavigate();
  const { addPost } = usePosts();
  const currentUser = loadUser();

  const [form, setForm] = useState({
    postType: '후기',
    title: '',
    content: '',
    artistName: '',
    venueName: '',
    concertDate: '',
    rating: 0,
  });
  const [setlist, setSetlist] = useState([{ id: 1, title: '' }]);

  const isReviewType = form.postType === '후기';

  const handleFormChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAddSong = () => {
    setSetlist((prev) => [...prev, { id: Date.now(), title: '' }]);
  };

  const handleSongChange = (id, value) => {
    setSetlist((prev) => prev.map((s) => s.id === id ? { ...s, title: value } : s));
  };

  const handleRemoveSong = (id) => {
    if (setlist.length <= 1) return;
    setSetlist((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = () => {
    const author = currentUser
      ? { nickname: currentUser.nickname, profileInitial: currentUser.nickname[0].toUpperCase() }
      : { nickname: '익명', profileInitial: '익' };

    addPost({
      postType: form.postType,
      title: form.title,
      content: form.content,
      artistName: form.artistName || null,
      venueName: form.venueName || null,
      concertDate: form.concertDate || null,
      rating: form.rating || null,
      author,
      setlist: setlist.filter((s) => s.title.trim()),
    });
    navigate('/posts');
  };

  const isSubmitDisabled = !form.title.trim() || !form.content.trim();

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: { xs: 3, md: 5 } }}>
      <Container maxWidth='md'>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/posts')}
          sx={{ mb: 3, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
        >
          목록으로
        </Button>

        <Typography variant='h5' sx={{ fontWeight: 700, mb: 4 }}>후기 작성</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* 게시물 유형 */}
          <FormControl fullWidth>
            <InputLabel>게시물 유형</InputLabel>
            <Select
              value={ form.postType }
              label='게시물 유형'
              onChange={ handleFormChange('postType') }
              sx={{
                bgcolor: '#1A1A1F',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(176, 38, 255, 0.3)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
              }}
            >
              <MenuItem value='후기'>공연 후기</MenuItem>
              <MenuItem value='질문'>질문</MenuItem>
              <MenuItem value='일반'>일반</MenuItem>
            </Select>
          </FormControl>

          {/* 제목 */}
          <TextField
            fullWidth
            label='제목'
            placeholder='제목을 입력해주세요'
            value={ form.title }
            onChange={ handleFormChange('title') }
            sx={ textFieldSx }
          />

          {/* 공연 후기 전용 필드 */}
          { isReviewType && (
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                bgcolor: 'rgba(176, 38, 255, 0.04)',
                border: '1px solid rgba(176, 38, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 700, color: 'primary.main' }}>
                공연 정보
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <TextField
                  label='아티스트 이름'
                  placeholder='예) 혁오'
                  value={ form.artistName }
                  onChange={ handleFormChange('artistName') }
                  sx={{ ...textFieldSx, flex: 1, minWidth: 180 }}
                />
                <TextField
                  label='공연 장소'
                  placeholder='예) 올림픽공원 체조경기장'
                  value={ form.venueName }
                  onChange={ handleFormChange('venueName') }
                  sx={{ ...textFieldSx, flex: 1, minWidth: 180 }}
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  type='date'
                  label='공연 날짜'
                  value={ form.concertDate }
                  onChange={ handleFormChange('concertDate') }
                  InputLabelProps={{ shrink: true }}
                  sx={{ ...textFieldSx, flex: 1, minWidth: 180 }}
                />
                <Box>
                  <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>별점</Typography>
                  <Rating
                    value={ form.rating }
                    onChange={(_, val) => setForm((prev) => ({ ...prev, rating: val }))}
                    sx={{ '& .MuiRating-iconFilled': { color: '#FFB800' } }}
                  />
                </Box>
              </Box>
            </Box>
          ) }

          {/* 본문 */}
          <TextField
            fullWidth
            multiline
            minRows={8}
            label='내용'
            placeholder='공연 후기를 자유롭게 작성해주세요.'
            value={ form.content }
            onChange={ handleFormChange('content') }
            sx={ textFieldSx }
          />

          {/* 세트리스트 (후기 타입만) */}
          { isReviewType && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MusicNoteIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
                  <Typography variant='body2' sx={{ fontWeight: 700 }}>세트리스트</Typography>
                  <Typography variant='caption' sx={{ color: 'text.secondary' }}>(선택)</Typography>
                </Box>
                <Button
                  size='small'
                  startIcon={<AddIcon />}
                  onClick={ handleAddSong }
                  sx={{ color: 'primary.main' }}
                >
                  곡 추가
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                { setlist.map((song, index) => (
                  <Box key={ song.id } sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DragIndicatorIcon sx={{ fontSize: '1rem', color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
                    <Typography
                      variant='caption'
                      sx={{ color: 'primary.main', minWidth: 20, textAlign: 'right', fontWeight: 700, opacity: 0.7 }}
                    >
                      { index + 1 }
                    </Typography>
                    <TextField
                      fullWidth
                      size='small'
                      placeholder={`${index + 1}번째 곡 제목`}
                      value={ song.title }
                      onChange={(e) => handleSongChange(song.id, e.target.value)}
                      sx={ textFieldSx }
                    />
                    <IconButton
                      size='small'
                      onClick={() => handleRemoveSong(song.id)}
                      disabled={ setlist.length <= 1 }
                      sx={{ color: 'rgba(255,255,255,0.2)', '&:hover': { color: 'error.main' } }}
                    >
                      <DeleteIcon fontSize='small' />
                    </IconButton>
                  </Box>
                )) }
              </Box>
            </Box>
          ) }

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)' }} />

          {/* 제출 버튼 */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant='outlined'
              onClick={() => navigate('/posts')}
              sx={{ borderColor: 'rgba(255,255,255,0.15)', color: 'text.secondary' }}
            >
              취소
            </Button>
            <Button
              variant='contained'
              onClick={ handleSubmit }
              disabled={ isSubmitDisabled }
              sx={{ px: 4 }}
            >
              작성 완료
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default PostWritePage;
