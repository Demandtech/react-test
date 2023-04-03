import React, { useEffect, useState } from 'react'
import { FaUser, FaChevronDown } from 'react-icons/fa'
import Card from '../components/Card'
import { cardData } from '../utils/utils'
import { AuthContext } from '../authContext'
import MkdSDK from '../utils/MkdSDK'
import { useNavigate } from 'react-router'

const AdminDashboardPage = () => {
  const { dispatch, state } = React.useContext(AuthContext)
  const [videos, setVideos] = useState([])
  const [num_pages, setNum_Pages] = useState(null)
  const [pageCount, setPage] = useState(1)
  const navigate = useNavigate()
  const [cardDatas, setCardData] = useState(cardData)
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

  const handleNextPage = () => {
    if (pageCount < num_pages) {
      setPage(pageCount + 1)
    }
  }

  const handlePrevPage = () => {
    if (pageCount > 1) {
      setPage(pageCount - 1)
    }
  }

  const handleCardMove = (dragIndex, hoverIndex) => {
    const draggedCard = cardDatas[dragIndex]
    setCardData((prevData) => {
      const newData = [...prevData]
      newData.splice(dragIndex, 1)
      newData.splice(hoverIndex, 0, draggedCard)
      return newData
    })
  }

  useEffect(() => {
    const sdk = new MkdSDK()
    const payload = {
      payload: {},
      page: pageCount,
      limit: 10,
    }
    const fetchVideo = async () => {
      try {
        const data = await sdk.callRestAPI(payload, 'PAGINATE')
        setNum_Pages(data.num_pages)
        setVideos(data.list)
      } catch (err) {
        console.log(err)
      }
    }
    fetchVideo()
  }, [pageCount])

  return (
    <div className='container bg-black p-10  min-h-screen font-sans bg-[#111111]'>
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
            {cardDatas.map((data, index) => {
              return <Card handleCardMove={handleCardMove} key={index} index={index} {...data} />
            })}
          </div>
        </div>

        <div className='my-5'>
          <div className='flex gap-1 mb-10'>
            {videos.map((video, index) => {
              return (
                <div
                  key={index}
                  className='border-2 border-[#9bff00] flex-1 h-28'
                >
                  <img
                    className='object-cover h-full w-full'
                    src={video.photo}
                    alt={video.username}
                  />
                </div>
              )
            })}
          </div>
          <div className='btns flex justify-between'>
            <button onClick={handlePrevPage} className='text-white btn-primary'>
              Prev
            </button>
            <button onClick={handleNextPage} className='text-white btn-primary'>
              Next
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboardPage
