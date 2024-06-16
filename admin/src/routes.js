import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Admin
const Categorys = React.lazy(() => import('./views/admin/Cat'))
const Feedbacks = React.lazy(() => import('./views/admin/Feed'))
const Language = React.lazy(() => import('./views/admin/Lan'))
const Users = React.lazy(() => import('./views/admin/User'))
const Videos = React.lazy(() => import('./views/admin/Video'))




const routes = [
  { path: '/home', exact: true, name: 'Dashboard',element: Dashboard },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/category', name: 'Category', element: Categorys },
  { path: '/feedback', name: 'Feedback', element: Feedbacks },
  { path: '/language', name: 'Language', element: Language },
  { path: '/user', name: 'User', element: Users },
  { path: '/video', name: 'Video', element: Videos },
];

export default routes
