import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {FaArrowUp} from 'react-icons/fa'
import {v4 as uuidv4} from 'uuid'



const Card = ({handleCardMove, image, avatar, author, likes, title, index }) => {
  const id = uuidv4()
  const ref = useRef(null)
  const [{isDragging}, drag] = useDrag({
    type:'CARD',
    item:{id, index},
    collect: monitor => ({
      isDragging: !! monitor.isDragging()
    })
  })

  

  const [, drop] = useDrop({
    accept:'CARD',
    hover(item, monitor){
      const dragIndex = item.index
      const hoverIndex = index
      if(dragIndex === hoverIndex){
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top)/ 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY){
        return
      }
      if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY){
        return
      }
      handleCardMove(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })
  drag(drop(ref))
  return (
    <div
      ref={ref}
      className='mb-2 p-2 rounded flex '
      style={{ border: '1px solid rgba(255, 255, 255, 0.12)',opacity: isDragging ? 0.5 : 1}}
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
