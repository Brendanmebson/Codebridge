import presidentPhoto from '../assets/members/president.jpg';
import vicePhoto from '../assets/members/Vice President.jpg';
import treasurerPhoto from '../assets/members/Treasurer.jpg';
import secretaryPhoto from '../assets/members/SecretaryManager.jpg';

export type ExcoMember = {
  name: string;
  role: string;
  slug: string;
  img: string;
  shortBio: string;
  bio: string;
  linkedin: string;
  twitter: string;
  email: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const excoMembers: ExcoMember[] = [
  {
    name: 'Edima Ben Ekpo',
    role: 'President',
    slug: slugify('Edima Ben Ekpo'),
    img: presidentPhoto,
    shortBio: 'Edima Ben Ekpo is an experienced risk management and governance leader with over 30 years in banking, auditing, and consulting. He retired from UBA Plc as Deputy General Manager, Group Operational Risk Management and now leads EdimaBenEkpo Limited.',
    bio: `Edima Ben Ekpo, who holds a master’s degree (MBA) in Banking and Finance from Enugu State University, is a Fellow of the Institute of Chartered Accountants of Nigeria (FCA), a professional member of the Institute of Operational Risk (PIOR) London, a Certified Information and Systems Auditor (CISA), a Certified Risk Manager (CRM), a Fellow Association of Investment Advisers and Portfolio Managers (FAIAPM), and a Fellow Chartered Risk Management Institution of Nigeria (FCRM).

With over 30 years of experience in risk management, auditing and control, banking operations, and consulting, Edima has served in various committees and led special projects including Operational Risk management implementation, Business Continuity Management, policies and governance document development and reviews, product programme development and reviews, and ISO certification standards. He was a member of the CBN/NIBSS BVN Risk Management Sub-committee and an alternate member of the Central Bank of Nigeria Chief Risk Officers’ Forum. Edima retired from UBA Plc in April 2018 as a Deputy General Manager, Group Operational Risk Management after spending over 19 years with the bank.

He has attended courses in Environmental and Social Management Systems for Financial Institutions facilitated by AfDB and IFC, and has participated in international conferences on risk management and compliance in the USA, London, and the Netherlands. Edima facilitates trainings in Risk Management and the Basel II Accord, Compliance Management, Internal Control Management, Product Management, ISO 31000 Risk Management, and Internal Auditing Standards, and he moderates professional examinations for the Chartered Risk Management Institute of Nigeria (CRMI).

Edima is a Director at Qazique Limited, a technology consulting and GRC solutions firm, and consults for Bloom Bank Africa across Liberia, Sierra Leone, and the Gambia on governance and policy development. He is also the CEO of EdimaBenEkpo Limited, a Risk, Governance, Compliance & Sustainability consulting firm in Lagos, and the Chief Promoter of ETH10k.io, a multivendor marketplace.`,
    linkedin: '#',
    twitter: '#',
    email: 'edima@codebridge.coop',
  },
  {
    name: 'Lola Owoola',
    role: 'Vice President',
    slug: slugify('Lola Owoola'),
    img: vicePhoto,
    shortBio: 'Vice President supporting strategic initiatives and member engagement across the cooperative.',
    bio: 'Lola Owoola serves as Vice President, supporting strategic initiatives and member engagement across the cooperative.',
    linkedin: '#',
    twitter: '#',
    email: 'lola@codebridge.coop',
  },
  {
    name: 'Ime Isang',
    role: 'Secretary / Manager',
    slug: slugify('Ime Isang'),
    img: secretaryPhoto,
    shortBio: 'Secretary and manager focused on governance and transparent administrative processes.',
    bio: 'Expert in cooperative governance and member relations. Ime ensures that our administrative processes are transparent and that every member\'s voice is heard.',
    linkedin: '#',
    twitter: '#',
    email: 'ime@codebridge.coop',
  },
  {
    name: 'Emmanuel Jackson Ebuk',
    role: 'Treasurer',
    slug: slugify('Emmanuel Jackson Ebuk'),
    img: treasurerPhoto,
    shortBio: 'Treasurer, entrepreneur and risk management specialist with military and banking experience.',
    bio: `Emmanuel Jackson Ebuk is the Treasurer of Codebridge Cooperative Society and the founder of Landmarkglobal Express, a business development and strategy firm. A retired officer of the Nigerian Army and a counter-insurgency and terrorism expert, Emmanuel combines military discipline with extensive experience in business development and financial risk management.

He is a serial entrepreneur passionate about youth empowerment and financial freedom. Emmanuel has worked extensively in the Nigerian banking and financial services sector, rising to the position of Assistant General Manager and Chief Risk Officer at a major financial institution in Nigeria.

His academic qualifications include a Bachelor’s degree in Electronics Engineering from the Nigerian Defence Academy, an MBA in International Business Management, an MSc in Corporate Governance from Leeds Beckett University, UK, and a PhD in Security and Intelligence. He also holds several international certifications in Risk Management and Information Systems Controls.

Emmanuel is a sought-after conference speaker and trainer, presenting on topics including risk management, information systems control, counter-terrorism, business development, and agriculture. He is a spirit-filled and led Christian, happily married, and enjoys chess, golfing, travelling, and tennis.`,
    linkedin: '#',
    twitter: '#',
    email: 'ebuk@codebridge.coop',
  },
];

export const getExcoMember = (slug: string | undefined) =>
  excoMembers.find((member) => member.slug === slug);

export default excoMembers;
