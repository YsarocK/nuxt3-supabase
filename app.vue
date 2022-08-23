<template>
  <div class="layout">
    <div class="layout__container">
      <Submit/>
      <List/>
    </div>
  </div>
</template>

<style lang="scss" src="./assets/styles/main.scss"></style>

<style lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  display: flex;

  &__container {
    margin: auto;
  }
}
</style>