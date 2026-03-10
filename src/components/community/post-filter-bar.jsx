import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

/**
 * PostFilterBar 컴포넌트 - 게시물 유형 필터 탭
 *
 * Props:
 * @param {string[]} items - 필터 항목 배열 [Required]
 * @param {string} activeItem - 현재 선택된 필터 [Required]
 * @param {function} onSelect - 필터 선택 시 호출 함수 [Required]
 *
 * Example usage:
 * <PostFilterBar items={['전체', '후기', '질문']} activeItem='전체' onSelect={setFilter} />
 */
function PostFilterBar({ items, activeItem, onSelect }) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        flexWrap: 'wrap',
        pb: 1,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      { items.map((item) => {
        const isActive = item === activeItem;
        return (
          <Chip
            key={ item }
            label={ item }
            onClick={() => onSelect(item)}
            sx={{
              bgcolor: isActive ? 'rgba(176, 38, 255, 0.2)' : 'rgba(255,255,255,0.05)',
              color: isActive ? 'primary.main' : 'text.secondary',
              border: isActive ? '1px solid rgba(176, 38, 255, 0.5)' : '1px solid rgba(255,255,255,0.08)',
              fontWeight: isActive ? 700 : 400,
              '&:hover': {
                bgcolor: 'rgba(176, 38, 255, 0.12)',
                color: 'primary.main',
              },
            }}
          />
        );
      }) }
    </Box>
  );
}

export default PostFilterBar;
