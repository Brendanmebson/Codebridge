import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  Chip,
} from '@mui/material';
import { photos } from '../../data/photos';

const Gallery: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;

  const heroGradient = `linear-gradient(160deg, ${palette.primary.main} 0%, ${palette.primary.dark} 100%)`;

  const galleryItems = [
    {
      title: 'One Cooperative Family',
      category: 'Community',
      img: photos.membersFullGroup,
      description: 'CodeBridge members together in matching attire, celebrating the bond that holds our cooperative together.',
    },
    {
      title: 'Laughter Among Members',
      category: 'Community',
      img: photos.membersLaughing,
      description: 'Our members share more than savings and loans. They share friendship, support and plenty of joy.',
    },
    {
      title: 'Celebrating Together',
      category: 'Community',
      img: photos.membersGroupOfFive,
      description: 'Members marking a special occasion side by side, dressed as one.',
    },
    {
      title: 'Member Outing',
      category: 'Social',
      img: photos.outingTable,
      description: 'Members unwinding over a shared meal at one of our social get-togethers.',
    },
    {
      title: 'A Member\'s Poultry Farm',
      category: 'Member Business',
      img: photos.poultryAisle,
      description: 'A member-run poultry farm, one of the enterprises our members are building with the support of the cooperative.',
    },
    {
      title: 'Growing the Flock',
      category: 'Member Business',
      img: photos.poultryPen,
      description: 'Young birds being raised on a member\'s farm as the business expands.',
    },
  ];

  return (
    <Box sx={{ overflowX: 'hidden', background: palette.background.default }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: heroGradient, mx: { xs: 1.5, sm: 2, md: 3 }, borderRadius: { xs: '22px', md: '28px' }, 
          paddingTop: { xs: 10, md: 15 },
          paddingBottom: { xs: 10, md: 15 },
          textAlign: 'center',
          color: '#fff',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements from Home */}
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <Box sx={{
            position: 'absolute', top: '-120px', right: '-120px',
            width: { xs: 340, md: 560 }, height: { xs: 340, md: 560 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.1)',
          }} />
          <Box sx={{
            position: 'absolute', bottom: '-80px', left: '-80px',
            width: { xs: 280, md: 420 }, height: { xs: 280, md: 420 },
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            border: '1px solid rgba(255,255,255,0.07)',
          }} />
          <Box sx={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            backgroundSize: '200px', opacity: 0.6,
          }} />
          {[...Array(8)].map((_, i) => (
            <Box key={i} sx={{ display: 'none',
              position: 'absolute', width: 4, height: 4, borderRadius: '50%',
              background: 'rgba(255,255,255,0.5)',
              top: `${10 + i * 11}%`, right: `${4 + (i % 4) * 4}%`,
              animation: `pulse${i} ${3 + i * 0.4}s ease-in-out ${i * 0.25}s infinite`,
              [`@keyframes pulse${i}`]: {
                '0%,100%': { opacity: 0.2, transform: 'scale(1)' },
                '50%': { opacity: 1, transform: 'scale(1.6)' },
              },
            }} />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Gallery & News
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              fontWeight: 300,
              opacity: 0.9,
            }}
          >
            Moments from our member events, learning sessions, milestones, and community celebrations.
          </Typography>
        </Container>
        {/* Wave background */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            right: 0,
            height: 50,
            background: palette.background.paper,
            display: 'none',
          }}
        />
      </Box>

      {/* Gallery Grid */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4
        }}>
          {galleryItems.map((item, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: `${(shape.borderRadius as number) * 2}px`,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 30px ${palette.info.main}20`,
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)',
                    },
                  },
                  border: `1px solid ${palette.divider}`,
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={item.img}
                    alt={item.title}
                    sx={{
                      transition: 'transform 0.5s ease',
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      left: 16,
                      zIndex: 1,
                    }}
                  >
                    <Chip
                      label={item.category}
                      size="small"
                      sx={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        color: palette.info.dark,
                        fontWeight: 700,
                        backdropFilter: 'blur(4px)',
                      }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Newsletter / Stay Connected */}
      <Box sx={{ background: palette.background.default, py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Don't Miss an Update
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Follow us on social media or check back regularly to see what the Codebridge community is up to.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Gallery;
