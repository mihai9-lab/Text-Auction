<template>
    <header class="header-global">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-container>
                <b-navbar-brand to="/home">Text Auction</b-navbar-brand>
                <b-navbar-toggle target="nav-collapse"> </b-navbar-toggle>
                <b-collapse id="nav-collapse" is-nav>
                    <b-navbar-nav>
                        <b-nav-item to="/home">Home</b-nav-item>
                        <b-nav-item to="/auction">Auction</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto">
                        <b-nav-text>Tokens: {{ tokenCount }}</b-nav-text>
                        <b-nav-item-dropdown right>
                            <template #button-content>
                                <em>User</em>
                            </template>
                            <b-dropdown-item href="/profile">Profile</b-dropdown-item>
                            <b-dropdown-item @click="logout">Logout</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>
    </header>
</template>
<script>
import { mapState } from 'vuex';
export default {
    components: {},
    mounted() {
        this.$store.dispatch('getTokenCount');
    },
    computed: {
        ...mapState(['tokenCount'])
    },
    methods: {
        logout() {
            this.$store.dispatch('logoutUser');
            window.location.href = '/';
        }
    }
};
</script>
<style>
</style>
