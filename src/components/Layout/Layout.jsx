import { NavLink, Outlet } from "react-router-dom"
import { SideHeader, Wrapper } from "./Layout.styled"

export const Layout = () => {

    return (
        <Wrapper>
            <SideHeader>
                <h2>PostBook</h2>
                <ul>
                    <li>
                        <NavLink>Home</NavLink>
                    </li>
                    <li>
                        <NavLink>Search</NavLink>
                    </li>
                    <li>
                        <NavLink>Profile</NavLink>
                    </li>
                </ul>
                <button type="button">Make a post</button>
            </SideHeader>
            <Outlet />
            <aside>
                <form action="get">
                    <input type="text" name="search" id="search" placeholder="Search" />
                </form>
                <div>
                    <h2>Follow koch bratan</h2>
                </div>
            </aside>
        </Wrapper>
    )
}