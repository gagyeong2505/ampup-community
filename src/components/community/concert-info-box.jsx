import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MicIcon from '@mui/icons-material/Mic';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

/**
 * ConcertInfoBox 컴포넌트 - 공연 정보 박스 (아티스트, 장소, 날짜)
 *
 * Props:
 * @param {string} artistName - 아티스트 이름 [Required]
 * @param {string} venueName - 공연 장소 [Optional]
 * @param {string} concertDate - 공연 날짜 [Optional]
 *
 * Example usage:
 * <ConcertInfoBox artistName='혁오' venueName='올림픽공원' concertDate='2025-11-15' />
 */
function ConcertInfoBox({ artistName, venueName, concertDate }) {
  const infoItems = [
    { icon: <MicIcon sx={{ fontSize: '1rem', color: 'primary.main' }} />, label: '아티스트', value: artistName },
    ...(venueName ? [{ icon: <LocationOnIcon sx={{ fontSize: '1rem', color: 'secondary.main' }} />, label: '공연 장소', value: venueName }] : []),
    ...(concertDate ? [{ icon: <CalendarTodayIcon sx={{ fontSize: '1rem', color: '#00C9FF' }} />, label: '공연 날짜', value: concertDate }] : []),
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 2.5 },
        mb: 3,
        borderRadius: 2,
        bgcolor: 'rgba(176, 38, 255, 0.06)',
        border: '1px solid rgba(176, 38, 255, 0.2)',
        boxShadow: 'inset 0 0 20px rgba(176, 38, 255, 0.04)',
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 2, md: 3 } }}>
        { infoItems.map((item) => (
          <Box key={ item.label } sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            { item.icon }
            <Box>
              <Typography variant='caption' sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.2 }}>
                { item.label }
              </Typography>
              <Typography variant='body2' sx={{ fontWeight: 700, color: 'text.primary' }}>
                { item.value }
              </Typography>
            </Box>
          </Box>
        )) }
      </Box>
    </Box>
  );
}

export default ConcertInfoBox;
