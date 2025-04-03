<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import viteLogo from '/vite.svg'
  import Counter from './lib/Counter.svelte'
  import Header from './routes/Header.svelte'
  import { fly } from 'svelte/transition';
  import type { Dictionary } from '@reduxjs/toolkit';

  let name = $state('Scott');

  let status: 'OPEN' | 'CLOSED' = $state('OPEN')

  let full_name = $derived(name + " " + "Rada")

  function toggle() {
    status = status === 'OPEN' ? 'CLOSED' : 'OPEN'
  }

  interface FormStateType {
    answers: { [key: string]: string };
    step: number
    error: string
  }

  let formState:FormStateType = $state({
    answers: {},
    step: 0,
    error: '',
  });

  $inspect(formState.step); 

  const QUESTIONS = [
    {
      question: "What is your name?",
      id: "name",
      type: "text",
    },
    {
      question: "What is your birthday?",
      id: "birthday",
      type: "date",
    },
    {
      question: "What is your favorite color?",
      id: "color",
      type: "color",
    },
  ]

  function nextStep(id: string) {
    if (formState.answers[id]) {
      formState.step += 1;
      formState.error = "";
    } else {
      formState.error = "Please fill out the form input."
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          // Success callback: position.coords.latitude and position.coords.longitude
          console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
        },
        function(error) {
          // Error callback: Handle errors
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 10000, // Timeout after 10 seconds
          maximumAge: 0 // Don't use cached location
        }
      );
    } else {
      // Geolocation not supported
      console.log("Geolocation is not supported by this browser.");
    }
  }

  // will run onMount
  // $effect(() => {
  //   console.log('on mounted');
  //   return () => {
  //     // when unmounted or destroyed
  //     // before the effect reruns
  //     console.log('on unmounted')
  //   }
  // })

  // $effect(() => {
  //   // this will re-run when formState.step has changed
  //   console.log('formState', formState.step);
  //   // DON'T CREATE STATE BASED OFF OTHER STATE, IN EFFECT
  //   // USE $derived
  //   return () => {
  //     console.log('before formState reruns', formState.step)
  //   }
  // })
</script>

<Header name={formState.answers.name} />

<!-- <Header name={formState.name}>
  <p>Hello</p>
  {#snippet secondChild(name)}
    <p>Second Child {name}</p>
  {/snippet}
</Header> -->

<main>
  <button onclick={getLocation}>Get Location</button>

  {#if formState.step >= QUESTIONS.length}
    <p>Thank you!</p>
  {:else}
    <p>Step: {formState.step + 1}</p>
  {/if}

  <!-- {#each QUESTIONS as question (question.id)} -->
  {#each QUESTIONS as question, index (question.id)}
    {#if formState.step === index}
      <div in:fly={{ x: 200, duration: 200, opacity: 0, delay: 200}} 
        out:fly={{ x: -200, duration: 200, opacity: 0}}>
        {@render formStep(question)}
      </div>
    {/if}
  {/each}

  <!-- {#if formState.step === 0}
    <div>
      <label for="name">Your Name</label>
      <input type="text" id="name" bind:value={formState.name}>
    </div>
    <button onclick={() => {
      if (formState.name !== '') {
        formState.step += 1;
      } else {
        formState.error = "Your name is empty. Please write your name.";
      }
    }}>Next</button>
  {:else if formState.step === 1}
    <div>
      <label for="bday">Your Birthday</label>
      <input type="date" id="bday" bind:value={formState.birthday}>
    </div>
    <button onclick={() => {
      if (formState.birthday !== '') {
        formState.step += 1;
        formState.error = '';
      } else {
        formState.error = "Your birthday is empty. Please write your birthday.";
      }
    }}>Next</button>
  {/if} -->

  {#if formState.error}
    <p class="error">{formState.error}</p>
  {/if}

  <!-- <Header {name} fake_name="Wes"/>

  <h2>{full_name}</h2>

  <input type="text" bind:value={name} />

  <p>The store is now {status}</p>

  <button onclick={toggle}>Toggle Status</button> -->

  <!-- <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p> -->
</main>

{JSON.stringify(formState)}

{#snippet formStep({ question, id, type }: {
  type: string;
  id: string;
  question: string;
})}
  <article>
    <div>
      <label for={id}>{question}</label>
      <input {type} {id} bind:value={formState.answers[id]}>
    </div>
    <button onclick={() => nextStep(id)}>Next</button>
  </article>
{/snippet}


<style>
  /* :global(div) {
    background: blue;
  } */

  .error {
    color: red;
  }

  /* .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  } */
</style>
