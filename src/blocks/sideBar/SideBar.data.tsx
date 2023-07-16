import React from 'react'
import * as FaIcons from 'react-icons/fa' 
import { GiBodySwapping } from "react-icons/gi";
export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <FaIcons.FaHome />
    },
    {
        title: 'Characters',
        path: '/characters',
        icon: <GiBodySwapping />
    },
]
