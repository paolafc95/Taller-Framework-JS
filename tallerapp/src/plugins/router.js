import Home from '../components/Home';
import User from "../components/User";
import Users from "../components/Users";
import Campus from "../components/Campus";
import Campuses from "../components/Campuses";
import NotFound from "../components/NotFound";

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/user',
        component: User,
    },
    {
        path: '/users',
        component: Users,
    },
    {
        path: '/campus',
        component: Campus,
    },
    {
        path: '/campuses',
        component: Campuses,
    },
    {
        path: '**',
        component: NotFound,
    },
]

export default routes;