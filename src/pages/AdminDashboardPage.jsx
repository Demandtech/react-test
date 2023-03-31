import React, { useEffect, useState } from 'react'
import { FaUser, FaChevronDown } from 'react-icons/fa'
import Card from '../components/Card'
import { cardData } from '../utils/utils'
import { AuthContext } from '../authContext'
import MkdSDK from '../utils/MkdSDK'
import { useNavigate } from 'react-router'

const AdminDashboardPage = () => {
  const { dispatch , state} = React.useContext(AuthContext)
  const navigate = useNavigate()
  const now = new Date()
  const date = now.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const time = now.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

   const handleLogout = () => {
     dispatch({ type: 'LOGOUT' })
     navigate('/')
   }
  
  return (
    <div className='container bg-black px-10 min-h-screen font-sans'>
      <header className=' mb-[4rem] flex items-center justify-between'>
        <div className='logo'>
          <h3 className='text-5xl font-black text-white'>APP</h3>
        </div>

        <div>
          <button
            onClick={handleLogout}
            className='py-2 px-4 rounded-3xl flex items-center bg-[#9BFF00]'
          >
            <FaUser className='mr-1' />
            Logout
          </button>
        </div>
      </header>
      <main>
        <div className='font-thin mb-5 justify-between  flex text-[#ffffff]'>
          <p className='text-[#ffffff] text-4xl font-thin'>
            Today’s leaderboard
          </p>
          <div className='flex items-center gap-2 '>
            <span>{date}</span> &#x2022;
            <span className='font-thin bg-[#9bff00] text-[#000000] px-1 rounded'>
              Submissions OPEN
            </span>
            &#x2022; <span className='font-thin'>{time}</span>
          </div>
        </div>
        <div>
          <div className='text-[#666666] flex  mb-2'>
            <p className='w-1/3 mr-24'># Title</p>
            <p className='pl-3'>Author</p>
            <p className='flex items-center gap-1 ml-auto'>
              Most Liked <FaChevronDown />
            </p>
          </div>
          <div>
            {cardData.map((data, index) => {
              return <Card key={index} index={index} {...data} />
            })}
          </div>
        </div>

        {/* <div className='pagination flex'>
          {video.map((data, index) => {
            return (
              <div key={index}>
                <img src={data.photo} alt='' />
                <p className='text-white'>{data.title}</p>
              </div>
            )
          })}
        </div>
        <button className='text-white' onClick={() => paginate()}>
          Next
        </button> */}
      </main>
    </div>
  )
}

export default AdminDashboardPage
