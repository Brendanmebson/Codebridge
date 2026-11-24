// Real CodeBridge photos, grouped by what they show. Use these instead of stock images.
import presidentPortrait from '../assets/members/president.jpg';
import treasurerPortrait from '../assets/members/Treasurer.jpg';
import presidentAtDesk from '../assets/img1.jpg';
import poultryFarm from '../assets/poultry/poultry-farm.jpg';
import poultryVideo1 from '../assets/poultry/poultry-farm-1.mp4';
import poultryVideo2 from '../assets/poultry/poultry-farm-2.mp4';
import poultryVideo3 from '../assets/poultry/poultry-farm-3.mp4';
import poultryVideo4 from '../assets/poultry/poultry-farm-4.mp4';
import poultryVideo5 from '../assets/poultry/poultry-farm-5.mp4';
import membersGroupOfFive from '../assets/life@codebridge/PHOTO-2026-08-29-19-41-31.jpg';
import membersLaughing from '../assets/life@codebridge/PHOTO-2026-08-29-19-42-06.jpg';
import memberOnPhone from '../assets/life@codebridge/PHOTO-2026-08-29-19-42-28.jpg';
import membersOnSofa from '../assets/life@codebridge/PHOTO-2026-08-29-19-42-56.jpg';
import twoMembers from '../assets/life@codebridge/PHOTO-2026-08-29-19-43-28.jpg';
import memberSeated from '../assets/life@codebridge/PHOTO-2026-08-29-19-43-55.jpg';
import outingLunch from '../assets/life@codebridge/PHOTO-2026-08-29-19-44-27.jpg';
import outingMemberSeated from '../assets/life@codebridge/PHOTO-2026-08-29-19-45-03.jpg';
import outingMemberMeal from '../assets/life@codebridge/PHOTO-2026-08-29-19-45-03_1.jpg';
import membersFullGroup from '../assets/life@codebridge/PHOTO-2026-08-29-19-45-04.jpg';
import outingTable from '../assets/life@codebridge/PHOTO-2026-08-29-19-45-04_1.jpg';

const businessPhoto = (file: string) =>
  new URL(`../assets/business/BusinessPicture/${file}`, import.meta.url).href;

export const photos = {
  presidentPortrait,
  treasurerPortrait,
  presidentAtDesk,
  poultryFarm,
  membersGroupOfFive,
  membersLaughing,
  memberOnPhone,
  membersOnSofa,
  twoMembers,
  memberSeated,
  outingLunch,
  outingMemberSeated,
  outingMemberMeal,
  membersFullGroup,
  outingTable,
  tailoringBusiness: businessPhoto('Ememowo Needle BP1.jpg'),
  fabricBusiness: businessPhoto('Oladoja Alaso BP1.jpeg'),
  eventsBusiness: businessPhoto('Braniac Academy BP1.jpeg'),
  awardCeremony: businessPhoto('EdimaBenEkpo BP.jpg'),
};

// Clips from a member's poultry farm.
export const poultryVideos = [poultryVideo1, poultryVideo2, poultryVideo3, poultryVideo4, poultryVideo5];

// Faces for the small "join our members" avatar stacks (same set the Home page uses).
export const memberAvatars = [presidentPortrait, treasurerPortrait, twoMembers, memberOnPhone];
