import Link from 'next/link'
import React from 'react'
import { CiLogout } from 'react-icons/ci'
import { SidebarItems } from './'
import { IoBasketOutline, IoCalendar, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPerson } from 'react-icons/io5'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { LogoutButton } from '..'
const menuItems = [
  {
    icon:<IoCalendarOutline size={30}/>,
    title:'Dashboard',
    path:'/dashboard',
  },
  {
    icon:<IoCheckboxOutline size={30}/>,
    title:'Rest TODOS',
    path:'/dashboard/rest-todos',
  },
  {
    icon:<IoListOutline size={30}/>,
    title:'Server Actions',
    path:'/dashboard/server-todos',
  },
  {
    icon:<IoCodeWorkingOutline size={30}/>,
    title:'Cookies',
    path:'/dashboard/cookies',
  },
  {
    icon:<IoBasketOutline size={30}/>,
    title:'Productos',
    path:'/dashboard/products',
  },
  {
    icon:<IoPerson size={30}/>,
    title:'Profile',
    path:'/dashboard/profile',
  },
]
export const Sidebard = async () => {
  const session = await getServerSession(authOptions)
 
  const userName = session?.user?.name ?? 'no name'
  // const userName = session?.user?.name as string : 'no name'
 
  const avatarUrl = (session?.user?.image)
  ? session?.user?.image
  : "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
  const userRoles = session?.user?.roles ?? ['client']
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
    <div>
      <div className="-mx-6 px-6 py-4">
        {/* TODO: Next/Link hacia dashboard */}
        <Link href="#" title="home">
          {/* Next/Image */}
          <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32" alt="tailus logo"/>
        </Link>
      </div>

      <div className="mt-8 text-center">
        {/* Next/Image */}
        <img src={avatarUrl} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"/>
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
          <span className="hidden text-gray-400 lg:block">{userRoles.join(',')}</span>
      </div>

      <ul className="space-y-2 tracking-wide mt-8">
        {/* TODO: src/components <SidebarItem /> */}
        {
          menuItems.map((item)=>
            <SidebarItems 
              title={item.title}
              icon={item.icon}
              path={item.path}
            />
          )
        }

 
      </ul>
    </div>

    <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton/>
    </div>
  </aside>
  )
}
