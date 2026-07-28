import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Stack,
  IconButton,
  useTheme,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import excoMembers, { getExcoMember } from '../../data/excoMembers';

const ExcoMember: React.FC = () => {
  const theme = useTheme();
  const { palette } = theme;
  const { memberSlug } = useParams<{ memberSlug: string }>();
  const member = getExcoMember(memberSlug);

  if (!member) {
    return (
      <Box sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4">Member not found</Typography>
        <Typography variant="body1" sx={{ mt: 2, color: palette.text.secondary }}>
          Return to the Exco page and choose a valid member.
        </Typography>
        <Button component={Link} to="/exco" sx={{ mt: 3 }}>
          Back to Exco
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ overflowX: 'hidden', background: palette.background.paper, pb: 8 }}>
      <Box sx={{ background: palette.primary.main, py: { xs: 10, md: 14 }, color: '#fff' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
            {member.name}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 300, opacity: 0.9, mb: 1 }}>
            {member.role}
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 700, color: 'rgba(255,255,255,0.82)' }}>
            Learn more about our executive leadership and the experience guiding Codebridge.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -10, position: 'relative', zIndex: 2 }}>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden' }}>
          <CardMedia
            component="img"
            sx={{ width: { xs: '100%', md: '45%' }, objectFit: 'cover' }}
            image={member.img}
            alt={member.name}
          />
          <CardContent sx={{ flex: 1, p: { xs: 4, md: 6 } }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
              {member.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: palette.text.secondary, mb: 3 }}>
              {member.role}
            </Typography>
            <Typography variant="body1" sx={{ color: palette.text.primary, lineHeight: 1.8, mb: 4 }}>
              {member.bio}
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="large" color="primary" href={member.linkedin}>
                <LinkedInIcon />
              </IconButton>
              <IconButton size="large" color="primary" href={member.twitter}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="large" color="primary" href={`mailto:${member.email}`}>
                <EmailIcon />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ExcoMember;
