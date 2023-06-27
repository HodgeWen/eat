<template>
  <div class="u-table">
    <div class="tools">
      <slot name="tools" />
    </div>
    <v-table fixed-header style="height: calc(100% - 100px)">
      <thead>
        <tr>
          <th v-for="column of columns" :key="column.key">{{ column.name }}</th>
          <th v-if="$slots.action" style="width: 200px; text-align: center">
            操作
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in internalData" :key="item.name">
          <td v-for="column of columns" :key="column.key">
            {{ item[column.key] }}
          </td>

          <td v-if="$slots.action" style="width: 200px; text-align: center;">
            <slot name="action" v-bind="{ row: item, index }" />
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="pagination.page"
      :length="length"
      style="height: 58px"
      rounded="circle"
    ></v-pagination>
  </div>
</template>

<script lang="ts" setup>
import { http } from '@/request'
import { title } from 'process'
import { computed } from 'vue'
import { reactive } from 'vue'
import { shallowRef } from 'vue'

const props = defineProps<{
  columns: Array<{
    name: string
    key: string
  }>
  api: string
  query?: Record<string, any>
}>()

const internalData = shallowRef<any[]>([])

const pagination = reactive({
  page: 1,
  size: 20
})

const total = shallowRef(0)

const length = computed(() => {
  return Math.ceil(total.value / pagination.size)
})

const getData = async () => {
  if (!props.api) return
  const { data } = await http.get<{
    data: {
      result: any[]
      total: number
    }
  }>(props.api, {
    params: {
      ...pagination,
      ...(props.query || {})
    }
  })
  internalData.value = data.data.result
  total.value = data.data.total
}

getData()

defineExpose({
  getData
})
</script>

<style scoped>
.u-table {
  height: 100%;
  padding: 8px;
}

.tools {
  display: flex;
  align-items: center;
  height: 42px;
}
</style>
