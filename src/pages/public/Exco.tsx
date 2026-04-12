import React from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  useTheme,
  Stack,
  IconButton,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

const Exco: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;

  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 50%, ${palette.secondary.dark} 100%)`;

  const excoMembers = [
    {
      name: 'Adebayo Okafor',
      role: 'Chairman',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'A visionary leader with over 15 years of experience in cooperative financial management and community development. Adebayo has been instrumental in steering Codebridge towards sustainable growth.',
      linkedin: '#',
      twitter: '#',
      email: 'adebayo@codebridge.coop',
    },
    {
      name: 'Ngozi Eze',
      role: 'Secretary',
      img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80',
      bio: 'Expert in cooperative governance and member relations. Ngozi ensures that our administrative processes are transparent and that every member\'s voice is heard.',
      linkedin: '#',
      twitter: '#',
      email: 'ngozi@codebridge.coop',
    },
    {
      name: 'Chidi Amadi',
      role: 'Treasurer',
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
      bio: 'A certified accountant with a precision-focused approach to managing cooperative funds. Chidi oversees our financial health and ensures accountability in every transaction.',
      linkedin: '#',
      twitter: '#',
      email: 'chidi@codebridge.coop',
    },
    {
      name: 'Fatima Bello',
      role: 'Loan Officer',
      img: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=400&q=80',
      bio: 'Specialist in credit assessment and financial literacy. Fatima is dedicated to ensuring fair and fast loan approvals for all our members.',
      linkedin: '#',
      twitter: '#',
      email: 'fatima@codebridge.coop',
    },
    {
        name: 'Oluwaseun Balogun',
        role: 'Public Relations Officer',
        img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        bio: 'A communications expert passionate about community building. Seun manages our external relations and ensures that our members stay informed about all activities.',
        linkedin: '#',
        twitter: '#',
        email: 'seun@codebridge.coop',
      },
      {
        name: 'Amaka Okoro',
        role: 'Welfare Officer',
        img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
        bio: 'Dedicated to the well-being of all members. Amaka oversees our welfare programs and emergency support systems, ensuring no member is left behind.',
        linkedin: '#',
        twitter: '#',
        email: 'amaka@codebridge.coop',
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
            Our Management Team
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
            Meet the dedicated individuals steering Codebridge towards excellence and community empowerment.
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

      {/* Team Grid */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4
        }}>
          {excoMembers.map((member, index) => (
            <Box key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: `${(shape.borderRadius as number) * 2}px`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 20px 40px ${palette.primary.main}20`,
                  },
                  border: `1px solid ${palette.divider}`,
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="350"
                    image={member.img}
                    alt={member.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '50%',
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 3,
                      color: '#fff',
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                      {member.role}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {member.bio}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" color="primary" href={member.linkedin}>
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton size="small" color="primary" href={member.twitter}>
                      <TwitterIcon />
                    </IconButton>
                    <IconButton size="small" color="primary" href={`mailto:${member.email}`}>
                      <EmailIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Join the team / CTA */}
      <Box sx={{ background: palette.background.default, py: 10 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ mb: 3 }}>
            Dedicated to Your Growth
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Our leadership team is committed to ensuring that Codebridge remains a trusted partner for all our members. 
            We are here to support your financial journey.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Exco;
