<template>
  <div class="submit">
    <div class="submit__container">
      <form>
        <input type="text" name="" placeholder="Titre" ref="title">
        <textarea name="" id="" cols="30" rows="10" placeholder="Description" ref="content"></textarea>
        <div class="submit__button" @click="newTask()">Nouvelle tâche</div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue"

const client = useSupabaseClient()
const title: Ref = ref('')
const content: Ref = ref('')

const newTask = async () => {
  const { data, error } = await client
  .from('tasks')
  .insert([{ title: title.value.value, content: content.value.value }])
}
</script>

<style lang="scss">
.submit {
  margin-bottom: 5rem;

  &__container {
    form {
      display: flex;
      gap: 1rem;
      flex-direction: column;

      input, textarea, button {
        border: 2px solid #eee;
        border-radius: 3px;
        padding: 1rem;
      }
    }
  }

  &__button {
    border: 2px solid #eee;
    border-radius: 3px;
    padding: 1rem;
    background-color: #eee;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    font-weight: 600;
    cursor: pointer;
  }
}
</style>