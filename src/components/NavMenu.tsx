import { HouseIcon, LogIn, Plus, Settings, UsersRoundIcon } from 'lucide-react'
import Link from 'next/link'
import Cookies from 'js-cookie'


export function NavMenu() {

  function handleLogout() {
    // Do something when the user clicks on the logout button.
    Cookies.remove('token');  
    Cookies.remove('userId');
  }

  return (
    <nav className="w-full  ">
      <ul className="flex w-full justify-between px-5 items-center gap-4">
        <li className="hover:text-purple-500 hover:scale-x-90">
          <Link className="flex items-center gap-1" href="/dashboard">
            <HouseIcon />
            <span className="hidden sm:block text-sm">DashBoard</span>
          </Link>
        </li>
      
        <li
          className="rounded-full  border bg-purple-500 p-2 scale-125 sm:scale-100
          sm:hover:text-purple-500 hover:scale-150
         sm:rounded-none sm:border-none sm:bg-transparent sm:p-0"
        >
          <Link className="flex flex-row items-center gap-1" href="/usertask">
            <Plus />
            <span className="hidden sm:block text-sm">Criar Tarefa</span>
          </Link>
        </li>
     
         <li className="hover:text-purple-500 hover:scale-x-90">
          <Link onClick={handleLogout}
          className="flex items-center gap-1" href="/login">
            <LogIn />
            <span className="hidden sm:block text-sm">Sair</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
