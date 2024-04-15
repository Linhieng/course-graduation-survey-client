<template>
    <div class="container">
        <header>
            <Header />
        </header>
        <main>
            <Form />
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
</template>

<script lang="ts" setup>
import Form from './components/Form.vue'
import Footer from '@/components/footer/index.vue'
import Header from './components/LoginHeader.vue'
</script>

<style scoped lang="scss">
.container {
    max-width: 600px;
    margin: auto;

    padding: 30px;
}
</style>
