import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
  cilUser,
  cilList,
  cilTranslate,
  cilMediaPlay,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  // {
  //   component: CNavTitle,
  //   name: 'Theme',
  // },
  {
    component: CNavItem,
    name: 'User Data',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component:CNavItem ,
    name: 'category data',
    to: '/category',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component:CNavItem ,
    name: 'Language',
    to: '/language',
    icon: <CIcon icon={cilTranslate} customClassName="nav-icon" />,
  },
  {
    component:CNavItem ,
    name: 'Feedback',
    to: '/feedback',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
  {
    component:CNavItem ,
    name: 'Video data',
    to: '/video',
    icon: <CIcon icon={cilMediaPlay} customClassName="nav-icon" />,
  },
]

export default _nav
