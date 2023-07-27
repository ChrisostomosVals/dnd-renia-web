import { FC, Fragment, ReactNode } from 'react'
import * as FaIcons from 'react-icons/fa' 
import { GiBodySwapping, GiBookCover } from "react-icons/gi";
import GameMasterFilter from '../../components/Filters/GameMasterFilter';
import { Paths } from '../../routes/paths';
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
        path: Paths.Characters,
        icon: <GiBodySwapping />,
        Filter: Fragment
    },
    {
        title: 'Chapters',
        path: Paths.Chapters,
        icon: <GiBookCover />,
        Filter: Fragment
    },
    {
        title: 'Map',
        path: Paths.Map,
        icon: <FaIcons.FaMap />,
        Filter: Fragment
    },
    {
        title: 'Users',
        path: Paths.Users,
        icon: <FaIcons.FaUsers />,
        Filter: GameMasterFilter
    },
]
