<template>
  <div class="list">
    <div :class="['list__item', todo.ended && 'ended' ]" v-for="todo in tasks" :key="todo.id">
      <label @click="updateTask(todo)">
        <div>
          <p v-if="todo.ended">X</p>
        </div>
      </label>
      <div class="list__item__content">
        <h3>{{ todo.title }}</h3>
        <p>{{ todo.content }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.list {
  width: 100%;
  max-width: 80rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 200px;
  overflow-y: scroll;

  &__item {
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: #eee;
    display: flex;
    align-items: center;
    gap: 3rem;

    &.ended {
      h3 {
        text-decoration:line-through
      }
    }

    label {
      width: 2rem;
      height: 2rem;
      cursor: pointer;

      div {
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 100%;
        display: flex;

        p {
          margin: auto;
        }
      }
    }

    &__content {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      h3 {
        font-size: 1.5rem;
        font-weight: 600;
      }

      p {
        font-size: 1.2rem;
      }
    }
  }
}
</style>

<script setup lang="ts">
import type { RealtimeSubscription } from '@supabase/supabase-js'

const client = useSupabaseClient()
let subscription: RealtimeSubscription;

const { data: tasks, refresh: refreshTasks } = await useAsyncData('tasks', async () => {
  const { data } = await client.from('tasks').select()
  return data.sort(function(a, b) { 
    return a.id - b.id  ||  a.name.localeCompare(b.name);
  });
})

onMounted(() => {
  subscription = client.from('tasks').on('*', () => {
    refreshTasks()
    console.log('changed')
  }).subscribe()
})

onUnmounted(() => {
  client.removeSubscription(subscription)
})

const updateTask = async (todo) => {
 const { data, error } = await client.from('tasks').update({ ended: !todo.ended }).match({ title: todo.title })
} 
</script>