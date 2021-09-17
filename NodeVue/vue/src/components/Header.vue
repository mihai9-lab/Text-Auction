<template>
    <header class="header-global">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-container>
                <b-navbar-brand to="/">Text Auction</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-nav-item to="/login">Login</b-nav-item>
                        <b-nav-item to="/register">Register</b-nav-item>
                    </b-nav-form>
                </b-navbar-nav>
            </b-container>
        </b-navbar>
    </header>
</template>
<script>
export default {
    components: {}
};
</script>
<style>
</style>
