<template>
    <div class="register">
        <b-container>
            <h1>Register</h1>
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
                    <b-form-group label-for="input-name">
                        <b-form-input
                            id="input-name"
                            v-model="form.name"
                            type="text"
                            required
                            placeholder="Name"
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
                    <b-form-group label-for="input-confirmationPassword">
                        <b-form-input
                            id="input-confirmationPassword"
                            v-model="form.confirmationPassword"
                            type="password"
                            required
                            placeholder="Confirm password"
                        ></b-form-input>
                    </b-form-group>
                    <b-button type="submit" class="my-btn cust-btn" variant="dark">Register</b-button>
                    <div style="color: red">{{ error }}</div>
                </b-form>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'register',
    components: {},
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
                confirmationPassword: ''
            },
            error: ''
        };
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            this.$store
                .dispatch('registerUser', this.form)
                .then(() => {
                    this.$router.push('/login');
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