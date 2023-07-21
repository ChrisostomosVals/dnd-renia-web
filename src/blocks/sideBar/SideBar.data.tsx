import React, { FC, Fragment, ReactNode } from 'react'
import * as FaIcons from 'react-icons/fa' 
import { GiBodySwapping } from "react-icons/gi";
import GameMasterFilter from '../../components/Filters/GameMasterFilter';
type ItemLink = {
    title: string;
    path: string;
    icon: ReactNode;
    Filter: FC<{children: ReactNode}>;
}
export const SidebarData:ItemLink[] = [
    {
        title: 'Home',
        path: '/',
        icon: <FaIcons.FaHome />,
        Filter: Fragment
    },
    {
        title: 'Characters',
        path: '/characters',
        icon: <GiBodySwapping />,
        Filter: Fragment
    },
    {
        title: 'New Character',
        path: '/new-character',
        icon: <FaIcons.FaPlusSquare />,
        Filter: GameMasterFilter
    }
]
