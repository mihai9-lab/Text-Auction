<template>
    <div id="app" class="">
        <router-view name="header"> </router-view>
        <router-view class="header-spacer"> </router-view>
    </div>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}
#app {
    height: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: whitesmoke;

}
.header-spacer{
    margin-top: 30px;
}
</style>
