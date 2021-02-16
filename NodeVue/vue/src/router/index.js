import Vue from 'vue';
import VueRouter from 'vue-router';
import Landing from '../views/Landing';
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import Header from '../components/Header';
import AuthHeader from '../components/AuthHeader';
import Auction from '../views/Auction';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'landing',
        components: {
            default: Landing,
            header: Header
        }
    },
    {
        path: '/login',
        name: 'login',
        components: {
            default: Login,
            header: Header
        }
    },
    {
        path: '/register',
        name: 'register',
        components: {
            default: Register,
            header: Header
        }
    },
    {
        path: '/home',
        name: 'home',
        components: {
            default: Home,
            header: AuthHeader
        }
    },
    {
        path: '/auction',
        name: 'auction',
        components: {
            default: Auction,
            header: AuthHeader
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    routes: routes
});
export default router;
