<script lang="ts">
  import type { Snippet } from "svelte";
  import {createState, ScottState} from './state.svelte'

  let { 
    name, 
    // children,
    // secondChild,
    // fake_name = null,
  }: {
    name: string;
    // children: Snippet;
    // secondChild: Snippet;
    // fake_name?: string | null;//optional variable
    } = $props();

  const myState = createState();
  const myStateTwo = new ScottState();
</script>

<div>
  <h1>{name ?  name : "User"}'s Form</h1>
  <button onclick={myState.up}>{myState.value}</button>
  <button onclick={() => myStateTwo.up()}>{myStateTwo.value}</button>

  <!-- {@render children()}

  <h3>{@render secondChild('Christina')}</h3> -->
</div>


<!-- <h1>Hello {name}</h1>
<h2>{name.replaceAll("t", "X")}</h2> -->

<!-- {fake_name} -->


<style>
  div {
    background: red;
  }
</style>