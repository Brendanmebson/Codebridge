import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  Stack,
  IconButton,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import excoMembers from '../../data/excoMembers';

const Exco: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;

  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 50%, ${palette.secondary.dark} 100%)`;

  const members = excoMembers;

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
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
              Executive Committee
            </Typography>
            <Typography variant="h5" sx={{ maxWidth: 720, mx: 'auto', color: 'rgba(255,255,255,0.86)' }}>
              Meet the dedicated individuals steering Codebridge towards excellence and community empowerment.
            </Typography>
          </Container>
        </Box>
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
          {members.map((member, index) => (
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
                    {shortBio}
                  </Typography>
                  <Button
                    component={Link}
                    to={`/exco/${member.slug}`}
                    size="small"
                    sx={{
                      mb: 2,
                      textTransform: 'none',
                      background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.dark})`,
                      color: '#fff',
                      boxShadow: `0 10px 24px ${palette.primary.main}2f`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${palette.primary.dark}, ${palette.primary.main})`,
                      },
                    }}
                  >
                    Read more
                  </Button>
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
          })}
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
