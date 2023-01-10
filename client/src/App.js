import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Error from './pages/Error';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/dashboard/profile';
import OtherProfile from './pages/dashboard/otherProfile';
import HomeFeed from './pages/dashboard/homeFeed';
import ExploreFeed from './pages/dashboard/exploreFeed';
import AddPost from './pages/dashboard/addPost';
import EditPost from './pages/dashboard/editPost';
import EditComment from './pages/dashboard/editComment';
import EditProfile from './pages/dashboard/editProfile';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Error />} />

          <Route path='/profile' element={<Profile />} />
          <Route path='/otherProfile/:userId' element={<OtherProfile />} />
          <Route path='/home' element={<HomeFeed />} />
          <Route path='/explore' element={<ExploreFeed />} />
          <Route path='/editProfile' element={<EditProfile />} />
          <Route path='/editPost/:postId' element={<EditPost />} />
          <Route path='/editComment/:commentId' element={<EditComment />} />
          <Route path='/createPost' element={<AddPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
