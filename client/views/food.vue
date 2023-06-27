<template>
  <UTable :columns="columns" api="/food/page" ref="tableRef">
    <template #tools>
      <v-btn color="primary" @click="handleAdd">新增</v-btn>
    </template>

    <template #action="{ row }">
      <v-btn variant="text" @click="handleEdit(row)">编辑</v-btn>
      <v-btn variant="text" @click="handleDelete(row.id)">删除</v-btn>
    </template>
  </UTable>

  <v-dialog v-model="visible" width="1024">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field label="名称" v-model="formData.name" />
        <v-select
          label="类别"
          :items="items"
          item-value="id"
          item-title="name"
          v-model="formData.foodTypeId"
        />
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="submit" :loading="loading">发送</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { http } from '@/request'
import { reactive } from 'vue'
import { shallowRef } from 'vue'
import { UTable } from '@/components/index'
import { obj } from 'cat-kit'
import { watch } from 'vue'

const initial = {
  name: '',
  id: '',
  foodTypeName: '',
  foodTypeId: ''
}

const formData = reactive({
  ...initial
})

const visible = shallowRef(false)
const title = shallowRef('')
const loading = shallowRef(false)
const columns = [
  { name: '名称', key: 'name' },
  { name: '食物类别', key: 'foodType' }
]

const items = shallowRef<any[]>([])
const getItems = async () => {
  const { data } = await http.get('/food/type')

  items.value = data
}

getItems()

watch(visible, v => {
  if (!v) {
    obj(formData).extend(initial)
  }
})

const tableRef = shallowRef<InstanceType<typeof UTable>>()

const handleAdd = () => {
  visible.value = true
  title.value = '新增'
}

const handleEdit = (row: any) => {
  obj(formData).extend(row)
  visible.value = true
  title.value = '编辑'
}

const handleDelete = async (id: number) => {
  await http.delete(`/food/${id}`)
  tableRef.value?.getData()
}

const submit = async () => {
  loading.value = true
  const body = obj(formData).omit(['id'])
  if (title.value === '新增') {
    await http.post('/food', body).catch(() => {
      loading.value = false
    })
  } else {
    await http.put(`/food/${formData.id}`, body).catch(() => {
      loading.value = false
    })
  }

  loading.value = false
  visible.value = false
  tableRef.value?.getData()
}
</script>
