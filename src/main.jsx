import React from 'react'
import { AuthContext } from './authContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import SnackBar from './components/SnackBar'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminLoginPage from './pages/AdminLoginPage'
import NotFoundPage from './pages/NotFoundPage'

function renderRoutes(role) {
  switch (role) {
    case 'admin':
      return (
        <Routes>
          <Route
            path='/admin/dashboard'
            element={<AdminDashboardPage />}
          ></Route>
        </Routes>
      )
      break
    default:
      return (
        <Routes>
          <Route exact path='/' element={<AdminLoginPage />}></Route>
          <Route path='*' exact element={<NotFoundPage />}></Route>
        </Routes>
      )
      break
  }
}

function Main() {
  const { state } = React.useContext(AuthContext)
  
  return (
    <div className='h-full font-sans'>
      <div className='flex w-full'>
        <div className='w-full'>
          <div className='page-wrapper w-full '>
            {!state.isAuthenticated
              ? renderRoutes('none')
              : renderRoutes(state.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  )
}

export default Main

{
  /* <div className='page-wrapper w-full py-10 px-5 bg-[#111111]'>
            {!state.isAuthenticated
              ? (renderRoutes('none'))
              : (renderRoutes(state.role))}
          </div> */
}

// {
//   !state.isAuthenticated ? (
//     <Routes>
//       <Route path='/*' element={<Navigate to='/' replace />}></Route>
//     </Routes>
//   ) : (
//     <>
//       {renderRoutes(state.role)}
//       <Routes>
//         <Route path='/*' element={<Navigate to='/admin/dashboard' replace />} />
//       </Routes>
//     </>
//   )
// }