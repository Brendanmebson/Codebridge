import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  Avatar,
  Stack,
  Divider,
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';

const Businesses: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;

  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 50%, ${palette.secondary.dark} 100%)`;

  const businesses = [
    {
      name: 'Okafor & Sons Construction',
      description: 'A leading construction firm specializing in residential and commercial buildings. We deliver quality and durability in every project.',
      owner: 'Adebayo Okafor',
      img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=600&q=80',
      ownerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      website: 'https://okaforsons.com',
      category: 'Construction',
    },
    {
      name: 'Eze Logistics Solutions',
      description: 'Reliable logistics and supply chain management services. We ensure your goods reach their destination safely and on time.',
      owner: 'Ngozi Eze',
      img: 'https://images.unsplash.com/photo-1586528116311-ad861a995e68?w=600&q=80',
      ownerImg: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80',
      website: '#',
      category: 'Logistics',
    },
    {
        name: 'Amadi Accounting Services',
        description: 'Comprehensive accounting and tax consultancy services for small businesses and individuals.',
        owner: 'Chidi Amadi',
        img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
        ownerImg: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
        website: '#',
        category: 'Finance',
      },
      {
        name: 'Bello Agri-Hub',
        description: 'Providing sustainable agricultural solutions and high-quality farm produce to the local community.',
        owner: 'Fatima Bello',
        img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=80',
        ownerImg: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=100&q=80',
        website: '#',
        category: 'Agriculture',
      },
      {
        name: 'Balogun Creative Agency',
        description: 'A full-service creative agency offering branding, digital marketing, and web development.',
        owner: 'Oluwaseun Balogun',
        img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80',
        ownerImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
        website: '#',
        category: 'Marketing',
      },
      {
        name: 'Okoro Healthcare Clinic',
        description: 'Providing accessible and compassionate healthcare services to families and individuals in our community.',
        owner: 'Amaka Okoro',
        img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80',
        ownerImg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
        website: '#',
        category: 'Healthcare',
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
            Member Businesses
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
            Supporting the businesses that power our community. Discover the diverse services offered by Codebridge members.
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

      {/* Directory Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 4
        }}>
          {businesses.map((biz, index) => (
            <Box key={index}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  borderRadius: `${(shape.borderRadius as number) * 2}px`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 20px 40px ${palette.secondary.main}15`,
                    transform: 'scale(1.01)',
                  },
                  border: `1px solid ${palette.divider}`,
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: '100%', sm: 240 },
                    height: { xs: 200, sm: 'auto' },
                    objectFit: 'cover',
                  }}
                  image={biz.img}
                  alt={biz.name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <CardContent sx={{ p: 3, flex: '1 0 auto' }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                        {biz.name}
                      </Typography>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '100px',
                          background: `${palette.secondary.main}10`,
                          color: palette.secondary.main,
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        {biz.category}
                      </Box>
                    </Stack>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {biz.description}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar src={biz.ownerImg} sx={{ width: 32, height: 32 }} />
                        <Box>
                          <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                            Owned by
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {biz.owner}
                          </Typography>
                        </Box>
                      </Stack>
                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<LaunchIcon sx={{ fontSize: 16 }} />}
                        href={biz.website}
                        target="_blank"
                        sx={{
                          borderRadius: '100px',
                          textTransform: 'none',
                          fontWeight: 600,
                        }}
                      >
                        Visit Website
                      </Button>
                    </Stack>
                  </CardContent>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* List Your Business */}
      <Box sx={{ background: `linear-gradient(135deg, ${palette.secondary.dark}, ${palette.secondary.main})`, color: '#fff', py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <BusinessIcon sx={{ fontSize: 60, mb: 3, opacity: 0.8 }} />
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
            Are You a Member Business?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: 300, opacity: 0.9 }}>
            Join our directory and let fellow members discover your services. Together, we grow stronger.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              background: '#fff',
              color: palette.secondary.main,
              fontWeight: 700,
              px: 6,
              py: 1.5,
              borderRadius: '100px',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Submit Your Business
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Businesses;
