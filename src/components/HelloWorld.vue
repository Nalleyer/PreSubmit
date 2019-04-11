<template>
<v-container>
  <v-btn @click="debug">debug</v-btn>
  <h1>{{text}}</h1>
</v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  p4cmdSync,
} from '@/p4'

@Component({})
class HelloWorld extends Vue {

  public text: string = ''
  public mounted(): void {
    // nothing here
  }

  public debug(): void {
    const info = p4cmdSync('info')
    if (info) {
      this.text = info.stdout
    } else {
      this.text = 'p4 is not found'
    }
  }
}

export default HelloWorld
</script>
