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
  Stack,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TagIcon from '@mui/icons-material/Tag';

const Gallery: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;

  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 50%, ${palette.secondary.dark} 100%)`;

  const galleryItems = [
    {
      title: 'Annual General Meeting 2025',
      date: 'March 15, 2025',
      category: 'Event',
      img: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=600&q=80',
      description: 'A look back at our most successful AGM yet, with over 800 members in attendance. important resolutions were passed for the coming year.',
    },
    {
      title: 'Member Business Workshop',
      date: 'February 10, 2025',
      category: 'Workshop',
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
      description: 'Empowering our members with financial literacy and business management skills. A day of learning and networking.',
    },
    {
      title: 'New Office Inauguration',
      date: 'January 5, 2025',
      category: 'Milestone',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
      description: 'Celebrating the opening of our new headquarters. A modern space designed to serve our growing community better.',
    },
    {
      title: 'Cooperative Sports Day',
      date: 'December 20, 2024',
      category: 'Social',
      img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=80',
      description: 'Members and their families joined for a day of fun, games, and community bonding at the city stadium.',
    },
    {
      title: 'Loan Disbursement Ceremony',
      date: 'November 15, 2024',
      category: 'Member Support',
      img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80',
      description: 'Over 100 members received business and welfare loans to support their various endeavors.',
    },
    {
      title: 'Member Success Story: Sarah\'s Farm',
      date: 'October 28, 2024',
      category: 'Success Story',
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',
      description: 'How a small cooperative loan helped Sarah expand her poultry farm and create jobs in her community.',
    },
  ];

  return (
    <Box sx={{ overflowX: 'hidden', background: palette.background.paper }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: heroGradient,
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
            backgroundSize: '200px', opacity: 0.6,
          }} />
          {[...Array(8)].map((_, i) => (
            <Box key={i} sx={{
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
            Stay updated with our latest activities, events, and inspiring member stories.
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
            clipPath: 'ellipse(55% 100% at 50% 100%)',
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
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5, color: 'text.secondary' }}>
                    <CalendarMonthIcon sx={{ fontSize: 16 }} />
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>
                      {item.date}
                    </Typography>
                  </Stack>
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
