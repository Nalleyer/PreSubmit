<template>
<v-container>
  <v-btn @click="debug">debug</v-btn>
  <h1>{{text}}</h1>
</v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {P4} from '@/p4'

@Component({})
class HelloWorld extends Vue {

  public text: string = ''
  public mounted(): void {
    // nothing here
  }

  public debug(): void {
    const p4 = new P4()
    this.text = JSON.stringify(p4.getInfo())
  }
}

export default HelloWorld
</script>
