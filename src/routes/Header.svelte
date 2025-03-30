<script lang="ts">
  let { 
    name, 
    fake_name = null,
  }: {
    name: string;
    fake_name?: string | null;//optional variable
    } = $props();
</script>


<h1>Hello {name}</h1>
<h2>{name.replaceAll("t", "X")}</h2>

{fake_name}


<style>

</style>