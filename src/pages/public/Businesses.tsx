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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';

const Businesses: React.FC = () => {
  const theme = useTheme();
  const { palette, shape } = theme;

  const heroGradient = `linear-gradient(150deg, ${palette.primary.dark} 0%, ${palette.primary.main} 50%, ${palette.secondary.dark} 100%)`;

  const [openBiz, setOpenBiz] = React.useState<any>(null);

  const businesses = [
    {
      name: 'Esther Chigbogu',
      businessName: 'Starlet Tutors',
      description:
        'We are a company of experienced, passionate and dedicated teachers of diverse subjects, ranging from English Language, Mathematics and Sciences.',
      impact: 'Code bridge has helped us stay committed to a realistic target saving plan.',
      websiteOrSocial: 'Starlettutors@gmail.com',
      profileImage: new URL('../../assets/business/ProfilePicture/Starlet Tutors PP.jpg', import.meta.url).href,
      images: [new URL('../../assets/business/BusinessPicture/Starlet Tutors BP.png', import.meta.url).href],
    },
    {
      name: 'Emem Owo',
      businessName: "Ememowo's Needle",
      description:
        "I'm Emem Owo! I run Ememowo's Needle in IBESIKPO. I've been sewing for 4 years and I LOVE making outfits that fit you perfectly and make you feel good. Let's create something beautiful together 💕",
      impact: 'Coatbridge stood by me when I needed phone badly for my business',
      websiteOrSocial: 'Both',
      profileImage: new URL('../../assets/business/ProfilePicture/Ememowo Needle PP.jpg', import.meta.url).href,
      images: [
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP1.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP2.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP3.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP4.png', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP5.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP6.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP7.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP8.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP9.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Ememowo Needle BP10.jpg', import.meta.url).href,
      ],
    },
    {
      name: 'Favour Onaji',
      businessName: 'Brainiac Academy',
      description:
        'Brainiac Academy helps students build confidence and master core subjects through personalized tutoring and enrichment programs. Our expert educators tailor instruction to each learner\'s pace and goals — turning academic struggles into strengths and curiosity into lifelong learning.',
      impact: 'Codebridge has been instrumental to my business. It has encouraged me to invest and this has in turn helped my business growth.',
      websiteOrSocial: 'https://vt.tiktok.com/ZS4HoAqon/',
      profileImage: new URL('../../assets/business/ProfilePicture/Braniac Academy PP.jpeg', import.meta.url).href,
      images: [
        new URL('../../assets/business/BusinessPicture/Braniac Academy BP1.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Braniac Academy BP2.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Braniac Academy BP3.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Braniac Academy BP4.jpeg', import.meta.url).href,
      ],
    },
    {
      name: 'Enyita Jacob',
      businessName: 'Royalsec Ltd',
      description: 'Royalsec company',
      impact: 'Codebridge cooperative has been awesome and a family to stay',
      websiteOrSocial: 'Jacobenyita@gmail.com',
      profileImage: new URL('../../assets/business/ProfilePicture/Royalsec Ltd PP.jpg', import.meta.url).href,
      images: [],
    },
    {
      name: 'Chukwuekezie Uche Michael',
      businessName: 'Fruitylife Enterprise',
      description: 'Beverages firm',
      impact: 'At least I don’t think about the money I have kept in codebridge and I receive good dividends',
      websiteOrSocial: 'https://www.tiktok.com/@uche74445?_r=1&_t=ZS-98fHrVp2FFg',
      profileImage: new URL('../../assets/business/ProfilePicture/Fruitylife PP.jpeg', import.meta.url).href,
      images: [new URL('../../assets/business/BusinessPicture/Fruity BP.jpeg', import.meta.url).href],
    },
    {
      name: 'HELEN STEPHEN EMMANUEL',
      businessName: 'NIL',
      description: 'NIL',
      impact: 'NIL',
      websiteOrSocial: 'NIL',
      profileImage: new URL('../../assets/business/ProfilePicture/Helen Stephen PP.jpg', import.meta.url).href,
      images: [],
    },
    {
      name: 'Lola Abidemi Owoola',
      businessName: 'Oladoja Alaso Ebi',
      description: 'Home of Fabrics. African Prints and Lace Materials',
      impact: 'Codebridge has been impacted my business by releasing loans anytime the need arises and members patronage.',
      websiteOrSocial: 'Social Media Pages',
      profileImage: new URL('../../assets/business/ProfilePicture/Oladoja Alaso PP.jpeg', import.meta.url).href,
      images: [
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP1.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP2.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP3.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP4.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP5.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP6.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP7.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP8.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP9.jpeg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Oladoja Alaso BP10.png', import.meta.url).href,
      ],
    },
    {
      name: 'Esther Adelaja',
      businessName: 'Debangelz',
      description: 'Nil',
      impact: 'Nil',
      websiteOrSocial: 'Nil',
      profileImage: new URL('../../assets/business/ProfilePicture/Debangelz PP.png', import.meta.url).href,
      images: [new URL('../../assets/business/BusinessPicture/Debanglez BP.jpeg', import.meta.url).href],
    },
    {
      name: 'Akan Usung',
      businessName: 'Akel & Chil Naturopathic Services',
      description:
        'Akel & Chil Naturopathic Services (in affiliation with Kedi Healthcare International), is a health and wellness company, using herbal medicine for the eradication of health challenges such as diabetes, hypertension, ulcers, prostate, etc.\n\nWe carry out a complete bio scan, to determine your health status, to enable us apply the right herbal medication; after body detoxification.\n\nOur Blood Circulation Massager (BCM; otherwise called, Home Doctor), clears arterial bad fat and blockage; ensuring proper blood flow and thereby eliminating various health issues.',
      impact: 'In great partnership',
      websiteOrSocial: 'In progress',
      profileImage: new URL('../../assets/business/ProfilePicture/Akel & Chil Naturopathic Services PP.png', import.meta.url).href,
      images: [
        new URL('../../assets/business/BusinessPicture/Akel & Chil Naturopathic Services BP1.mp4', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/Akel & Chil Naturopathic Services BP2.mp4', import.meta.url).href,
      ],
    },
    {
      name: 'Edima Ben Ekpo',
      businessName: 'EdimaBenEkpo Limited',
      description:
        'EdimaBenEkpo Limited is a professional consulting firm providing governance advisory, public policy support, strategic communications, and cybersecurity risk control services across Africa.\n\nWe partner with governments, financial institutions, and organisations to manage risk, strengthen compliance, and support effective decision-making. Our work is grounded in global best practices and informed by local context, enabling practical and sustainable outcomes for our clients.\n\nAt EdimaBenEkpo, we are committed to responsibility, excellence, empowerment, and integrity in every engagement.',
      impact: 'It has helped in terms of financial savings, stability and accountability.',
      websiteOrSocial: 'https://edimabenekpo.ng/',
      profileImage: new URL('../../assets/business/ProfilePicture/EdimaBenEkpo Limited PP.jpg', import.meta.url).href,
      images: [new URL('../../assets/business/BusinessPicture/EdimaBenEkpo BP.jpg', import.meta.url).href],
    },
    {
      name: 'Amasua David Essien',
      businessName: 'TechGrid Limited',
      description:
        'TechGrid Limited is not just another Information Technology company – we are your strategic partner in navigating the ever-changing digital landscape. With a commitment to excellence and a passion for innovation, we empower organizations and individuals to thrive in a digital-first world.',
      impact: 'Provision of loans for projects when required.',
      websiteOrSocial: 'https://www.techgridng.com',
      profileImage: new URL('../../assets/business/ProfilePicture/TechGrid Limited PP.png', import.meta.url).href,
      images: [
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP1.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP2.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP3.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP4.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP5.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP6.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP7.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP8.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP9.jpg', import.meta.url).href,
        new URL('../../assets/business/BusinessPicture/TechGrid Limited BP10.png', import.meta.url).href,
      ],
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
                  image={biz.images?.[0] || biz.img}
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

                    {/* Short bio with Read more if long */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {biz.description.length > 140 ? `${biz.description.substring(0, 140).trim()}...` : biz.description}
                    </Typography>
                    {biz.description.length > 140 && (
                      <Button
                        size="small"
                        onClick={() => setOpenBiz(biz)}
                        sx={{ textTransform: 'none', fontWeight: 700 }}
                      >
                        Read more
                      </Button>
                    )}

                    <Divider sx={{ mb: 2 }} />

                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar src={biz.profileImage || biz.ownerImg} sx={{ width: 32, height: 32 }} />
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

      {/* Modal for full business details */}
      <Dialog
        open={Boolean(openBiz)}
        onClose={() => setOpenBiz(null)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="business-dialog-title"
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="business-dialog-title">
          {openBiz?.businessName || openBiz?.name}
          <IconButton
            aria-label="close"
            onClick={() => setOpenBiz(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {openBiz?.profileImage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box component="img" src={openBiz.profileImage} sx={{ width: 96, height: 96, borderRadius: '50%' }} />
            </Box>
          )}
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
            Owner: {openBiz?.name}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mb: 2 }}>
            {openBiz?.description}
          </Typography>

          {openBiz?.impact && !/^(nil|in progress)$/i.test(openBiz.impact) && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Impact
              </Typography>
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {openBiz.impact}
              </Typography>
            </Box>
          )}

          {openBiz?.websiteOrSocial && !/^(nil|in progress)$/i.test(openBiz.websiteOrSocial) && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                Website / Social
              </Typography>
              <Typography variant="body2">
                {openBiz.websiteOrSocial}
              </Typography>
            </Box>
          )}

          {openBiz?.images && openBiz.images.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Gallery
              </Typography>
              <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', pb: 1 }}>
                {openBiz.images.map((src: string, i: number) => (
                  <Box key={i} component={src.endsWith('.mp4') ? 'video' : 'img'} src={src} controls={src.endsWith('.mp4')}
                    sx={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 1 }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBiz(null)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
            component={Link}
            to="/business-submission"
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
