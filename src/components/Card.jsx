import React from 'react'
import {FaArrowUp} from 'react-icons/fa'

const Card = ({ image, avatar, author, likes, title, index }) => {
  return (
    <div
      className='mb-2 p-2 rounded flex '
      style={{ border: '1px solid rgba(255, 255, 255, 0.12)' }}
    >
      <div className='flex w-1/3 items-center mr-24'>
        <span className='text-[#666666] p-3'>{index + 1}</span>
        <div className='w-1/3 h-10 mr-2 '>
          <img
            src={image}
            alt={title}
            className='h-full w-full object-cover rounded'
          />
        </div>
        <p className='text-[#ffffff] font-thin'>{title}</p>
      </div>
      <div className='flex items-center gap-2'>
        <img
          className='rounded-full'
          width={'24px'}
          height={'24px'}
          src={avatar}
          alt={author}
        />
        <span className='text-[#DBFD51] font-thin'>{author}</span>
      </div>
      <div className='flex items-center ml-auto'>
        <span className='text-[#ffffff] font-sans'>{likes}</span>
        <FaArrowUp className='text-[#9bff00] font-thin' />
      </div>
    </div>
  )
}

export default Card
