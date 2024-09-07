import React from 'react'
import MainLayout from './layouts/MainLayout'
import Maintainence from './pages/Maintainence'
import HomePage from './pages/HomePage'
import JoinRoom from './pages/JoinRoom'
import Room from './pages/Room'
import CreateRoom from './pages/CreateRoom'
import TeacherPortalRoom from './pages/TeacherPortalRoom'
import TeacherPortalRouter from './pages/TeacherPortalRouter'
import Configure from './pages/Configure'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'


function App() {

  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join-room" element={<JoinRoom rooms={[]}/>} />
        <Route path="/room/:roomCode" element={<Room />} />
        <Route path="/teacher-portal" element={<TeacherPortalRouter />} />
        <Route path="/configure" element={<Configure />} />
        <Route path="*" element={<Maintainence />} />
      </Route>
      // <Route path="/" element={<MainLayout />}>
      //   <Route index element={<HomePage />} /> 
      //   <Route path="/leaderboard/daily/:date" element={<LeaderBoard />} />
      //   <Route path="/pv/:id" element={<ProfileViewer />} />
      //   <Route path="/pv" element={<ProfileSearcher />} />
      //   <Route path="/leaderboard/clans" element={<ClanLeaderBoard />} />
      //   <Route path="/leaderboard/player" element={<PlayerLeaderBoard />} />
      //   <Route path="*" element={<NotFoundPage />} />
      // </Route>
    )
  )

  return (
    <RouterProvider router={route} />
  )
}

export default App