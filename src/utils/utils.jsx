import image1  from '../assets/images/image1.png'
import avatar1 from '../assets/images/avatar1.png'
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getNonNullValue = (value) => {
  if (value != "") {
    return value;
  } else {
    return undefined;
  }
};

export const cardData = [
  {
    title: 'Rune raises $100,000 for marketing through NFT butterflies sale',
    author: 'ninjanft',
    likes: '254',
    image: image1,
    avatar: avatar1,
  },
  {
    title: 'Rune raises $100,000 for marketing through NFT butterflies sale',
    author: 'deniscrypto',
    likes: '203',
    image: image1,
    avatar: avatar1,
  },
  {
    title: 'Rune raises $100,000 for marketing through NFT butterflies sale',
    author: 'meta_world98',
    likes: '134',
    image: image1,
    avatar: avatar1,
  },
  {
    title: 'Rune raises $100,000 for marketing through NFT butterflies sale',
    author: 'kingdom43world',
    likes: '99',
    image: image1,
    avatar: avatar1,
  },
  {
    title: 'Rune raises $100,000 for marketing through NFT butterflies sale',
    author: 'sjkj3987423kjbdfsf',
    likes: '88',
    image: image1,
    avatar: avatar1,
  },
]