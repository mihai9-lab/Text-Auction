<template>
    <div class="login">
        <h1>Login</h1>
        <b-container>
            <div class="wrapper">
                <b-form @submit="onSubmit">
                    <b-form-group label-for="input-email">
                        <b-form-input
                            id="input-email"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Email"
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group label-for="input-password">
                        <b-form-input
                            id="input-password"
                            v-model="form.password"
                            type="password"
                            required
                            placeholder="Password"
                        ></b-form-input>
                    </b-form-group>
                    <b-button type="submit" class="my-btn cust-btn" variant="dark">Login</b-button>
                    <div style="color: red">{{ error }}</div>
                </b-form>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'login',
    components: {},
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            error: ''
        };
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            this.$store
                .dispatch('loginUser', this.form)
                .then(() => {
                    this.$router.push('/home');
                })
                .catch((err) => {
                    this.error = err.message;
                });
        }
    }
};
</script>

<style scoped>
.wrapper {
    margin: 0% 23%;
    padding: 5% 8%;
    border: 2px solid none;
    border-radius: 15px;
    background-color: white;
}

.cust-btn {
    width: 45%;
    padding: 2% 0%;
}
</style>