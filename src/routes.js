import { lazy } from 'react';
import Library from './pages/Library';

const Home = lazy(() => import('./pages/Home'));
const Forum = lazy(() => import('./pages/Forum/index'));
const Chat = lazy(() => import('./pages/Chat'));
const Book = lazy(() => import('./pages/Book'));

const Login = lazy(() => import('./pages/Auth/Login'));
const SignUp = lazy(() => import('./pages/Auth/SignUp'));

const Profile = lazy(() => import('./pages/Profile/index'));
const AddBook = lazy(() => import('./pages/AddBook'));
const ForumDetails = lazy(() => import('./pages/FormDetails'));

export const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/forum', name: 'Forum', Component: Forum },
  { path: '/category/:name', name: 'Chat', Component: Library },
  { path: '/book/:id', name: 'Book', Component: Book },
];

export const authRoute = [
  { path: '/signup', name: 'SignUp', Component: SignUp },
  { path: '/login', name: 'Login', Component: Login },
];

export const privateRoute = [
  { path: '/profile/:id', name: 'Profile', Component: Profile },
  // { path: '/profile/me', name: 'Profile', Component: Profile },
  { path: '/add-book', name: 'AddBook', Component: AddBook },
  { path: '/forum/:threadId', name: 'Thread Detail', Component: ForumDetails },
  { path: '/chat', name: 'Chat', Component: Chat },
  { path: '/chat/:userId', name: 'Chat', Component: Chat },
];
