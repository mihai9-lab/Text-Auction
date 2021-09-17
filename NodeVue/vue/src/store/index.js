import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from '../router';

Vue.use(Vuex);

const apiUrl = 'http://localhost:3000/api';
const parseError = err => {
    console.log(err.response.status);
    if (err?.response?.status === 401) {
        router.push('/');
    }
    if (err?.response?.data) {
        throw new Error(err.response.data[0]);
    } else {
        throw new Error('Something went wrong');
    }
};
export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token') || '',
        auctions: [],
        latestBoughtAuctions: [],
        tokenCount: 0,
        userAuctions: [],
        profileAuctions: []
    },
    mutations: {
        addToken: (state, msg) => {
            localStorage.setItem('token', msg);
            state.token = msg;
        },
        setAuctions: (state, msg) => {
            state.auctions = msg;
        },
        setTokens: (state, msg) => {
            state.tokenCount = msg;
        },
        setLatestBought: (state, msg) => {
            state.latestBoughtAuctions = msg;
        },
        setUserAuctions: (state, msg) => {
            state.userAuctions = msg;
        },
        setProfileAuctions: (state, msg) => {
            state.profileAuctions = msg;
        },
        logout: state => {
            state.token = '';
            localStorage.setItem('token', '');
        }
    },
    actions: {
        loginUser: ({ commit }, form) => {
            return axios
                .post(`${apiUrl}/public/login`, form)
                .then(resp => {
                    commit('addToken', resp.data.token);
                })
                .catch(parseError);
        },
        registerUser: (_, form) => {
            return axios.post(`${apiUrl}/public/register`, form).catch(parseError);
        },
        allAuctions: ({ commit, state }) => {
            axios
                .get(`${apiUrl}/auth/auctions`, {
                    headers: {
                        Auth: state.token
                    }
                })
                .then(resp => {
                    commit('setAuctions', resp.data.auctions);
                });
        },
        latestBought: ({ commit, state }) => {
            axios
                .get(`${apiUrl}/auth/auctions/latest`, {
                    headers: {
                        Auth: state.token
                    }
                })
                .then(resp => {
                    commit('setLatestBought', resp.data.auctions);
                });
        },
        getTokenCount: ({ commit, state }) => {
            axios
                .get(`${apiUrl}/auth/user/tokens`, {
                    headers: {
                        Auth: state.token
                    }
                })
                .then(resp => {
                    commit('setTokens', resp.data.tokens);
                })
                .catch(parseError);
        },
        buyAuction: ({ state }, id) => {
            return axios
                .post(
                    `${apiUrl}/auth/auctions/buy`,
                    { id },
                    {
                        headers: {
                            Auth: state.token
                        }
                    }
                )
                .then(() => {
                    return true;
                })
                .catch(parseError);
        },
        auctionReact: ({ state }, data) => {
            return axios
                .put(`${apiUrl}/auth/auctions/react`, data, {
                    headers: {
                        Auth: state.token
                    }
                })
                .then(() => {
                    return true;
                })
                .catch(parseError);
        },
        userAuctions: ({ commit, state }, id) => {
            axios
                .get(`${apiUrl}/auth/auctions/user?id=${id}`, {
                    headers: {
                        Auth: state.token
                    }
                })
                .then(resp => {
                    commit('setUserAuctions', resp.data.auctions);
                })
                .catch(parseError);
        },
        profileAuctions: ({ commit, state }) => {
            axios
                .get(`${apiUrl}/auth/user/profile`, {
                    headers: {
                        Auth: state.token
                    }
                })
                .then(resp => {
                    commit('setProfileAuctions', resp.data.auctions);
                })
                .catch(parseError);
        },
        logoutUser: ({ commit }) => {
            commit('logout');
        }
    }
});
