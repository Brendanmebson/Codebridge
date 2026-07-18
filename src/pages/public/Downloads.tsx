import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';

const downloadItems = [
  {
    title: 'Membership Form',
    description: 'Download the application form for new and prospective members.',
    href: '/docs/membership-form.txt',
  },
  {
    title: 'Loan Application Form',
    description: 'Download the standard form for requesting a cooperative loan.',
    href: '/docs/loan-application-form.txt',
  },
  {
    title: 'Cooperative Profile',
    description: 'Overview of the cooperative, its mission, and member value proposition.',
    href: '/docs/cooperative-profile.txt',
  },
];

const Downloads: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;
  const br = shape.borderRadius as number;

  return (
    <Box sx={{ background: palette.background.paper, minHeight: '100vh' }}>
      <Box
        sx={{
          background: `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 55%, ${palette.secondary.dark} 100%)`,
          py: { xs: 8, md: 12 },
          color: '#fff',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 700, mb: 1.5 }}>
            Downloads & Forms
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 760, color: 'rgba(255,255,255,0.82)' }}>
            Access the latest cooperative documents, application forms, and reference materials in one place.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack direction="column" spacing={3}>
          {downloadItems.map((item) => (
            <Card
              key={item.title}
              sx={{
                borderRadius: `${br * 2}px`,
                border: `1px solid ${palette.divider}`,
                overflow: 'hidden',
              }}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: `${br}px`,
                      background: `${palette.primary.main}14`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.title.includes('Loan') ? <ArticleOutlinedIcon /> : <DescriptionOutlinedIcon />}
                  </Box>

                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: palette.text.secondary }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  href={item.href}
                  download
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{ textTransform: 'none', borderRadius: '999px' }}
                >
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Downloads;
