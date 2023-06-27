<template>
  <div class="container">
    <nav >
      <v-list  style="background-color: transparent; color: #fff" nav @click:select="handleSelect">
        <v-list-item
          v-for="(item, i) of menus"
          rounded="xl"
          :title="item.title"
          :value="item.value"
        />
      </v-list>
    </nav>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router'

const menus = [
  { title: '吃什么', value: '/eat' },
  { title: '食物类别', value: '/food-type' },
  { title: '食物', value: '/food' }
]
const router = useRouter()
const handleSelect = (item: any) => {
  router.push(item.id)
}
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;

}

.container nav, .container main {
  height: 100%;
}

.container nav {
  width: 256px;
  background-image: url(https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg);
  background-size: cover;
  background-position: 50% 50%;
}

.container main {
  flex-grow: 1;
}
</style>
