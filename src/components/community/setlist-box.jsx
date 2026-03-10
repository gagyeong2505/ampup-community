import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

/**
 * SetlistBox 컴포넌트 - 공연 세트리스트 표시 박스
 *
 * Props:
 * @param {Array<{order: number, title: string}>} setlist - 세트리스트 곡 목록 [Required]
 *
 * Example usage:
 * <SetlistBox setlist={[{ order: 1, title: 'Song A' }]} />
 */
function SetlistBox({ setlist }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewCount = 4;
  const hasMore = setlist.length > previewCount;

  return (
    <Box
      sx={{
        mb: 4,
        borderRadius: 2,
        bgcolor: '#1A1A1F',
        border: '1px solid rgba(176, 38, 255, 0.15)',
        overflow: 'hidden',
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          bgcolor: 'rgba(176, 38, 255, 0.08)',
          borderBottom: '1px solid rgba(176, 38, 255, 0.12)',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <MusicNoteIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />
        <Typography variant='body2' sx={{ fontWeight: 700, color: 'primary.main' }}>
          세트리스트
        </Typography>
        <Typography variant='caption' sx={{ color: 'text.secondary', ml: 0.5 }}>
          { setlist.length }곡
        </Typography>
      </Box>

      {/* 곡 목록 */}
      <Box sx={{ px: 2.5, pt: 1.5, pb: hasMore ? 0 : 1.5 }}>
        { setlist.slice(0, previewCount).map((song) => (
          <SetlistItem key={ song.order } order={ song.order } title={ song.title } />
        )) }

        { hasMore && (
          <Collapse in={ isExpanded }>
            { setlist.slice(previewCount).map((song) => (
              <SetlistItem key={ song.order } order={ song.order } title={ song.title } />
            )) }
          </Collapse>
        ) }
      </Box>

      {/* 더보기 버튼 */}
      { hasMore && (
        <Button
          fullWidth
          size='small'
          endIcon={ isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
          onClick={() => setIsExpanded((prev) => !prev)}
          sx={{
            color: 'text.secondary',
            fontSize: '0.8rem',
            py: 1,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 0,
            '&:hover': { color: 'primary.main', bgcolor: 'rgba(176, 38, 255, 0.05)' },
          }}
        >
          { isExpanded ? '접기' : `${setlist.length - previewCount}곡 더 보기` }
        </Button>
      ) }
    </Box>
  );
}

/**
 * SetlistItem 컴포넌트 - 세트리스트 개별 곡 행
 *
 * Props:
 * @param {number} order - 곡 순서 [Required]
 * @param {string} title - 곡 제목 [Required]
 */
function SetlistItem({ order, title }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 0.8,
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Typography
        variant='caption'
        sx={{
          color: 'primary.main',
          fontWeight: 700,
          minWidth: 20,
          textAlign: 'right',
          opacity: 0.7,
        }}
      >
        { order }
      </Typography>
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        { title }
      </Typography>
    </Box>
  );
}

export default SetlistBox;
