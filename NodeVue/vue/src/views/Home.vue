<template>
    <b-container class="home-wrapper">
        <h1 class="title">Latest</h1>
        <HomeText
            class="home-text-helper"
            name="Jhon Jhon"
            text="texty texty textytexty textytexty texty texty texty textytextytexty texty texty textytexty texty "
        />
        <HomeText
            class="home-text-helper"
            name="Jhon Jhon"
            text="texty texty textytexty textytexty texty texty texty textytextytexty texty texty textytexty texty "
        />
    </b-container>
</template>
<script>
import HomeText from '@/components/HomeText';
export default {
    name: 'Home',
    components: {
        HomeText
    }
};
</script>
<style scoped>
.home-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.home-text-helper{
    width:60%
}
/* .title */
</style>