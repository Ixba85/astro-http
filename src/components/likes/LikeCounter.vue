

<template>
  <div v-if="isLoading">Loading...</div>

  <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>

  <button v-else @click="likePost">
      Likes
      <span>{{ likeCount }}</span>
  </button>

</template>


<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';
import { actions } from 'astro:actions';

interface Props {
    postId: string;
}
const props = defineProps<Props>();

const likeCount = ref(0);
const likeclicks = ref(0);
const isLoading = ref(true);
// Add this lifecycle hook
onMounted(async () => {
  await getCurrentLikes();
});

watch (likeCount, debounce( () => {
  fetch(`/api/likes/${props.postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ likes: likeclicks.value }),
  });
  likeclicks.value = 0;

}, 500));


const likePost = async() => {
  likeCount.value++;
  

  const {data, error} = await actions.getGreeting({
    age: 39,
    name: 'Jordi',
    isActive: true,
  })

  if (error) {
    return alert ('Error liking post')
  };

  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  });
};

const getCurrentLikes = async () => {
  try {
    const resp = await fetch(`/api/likes/${props.postId}`);
    if (!resp.ok) throw new Error('Failed to fetch likes');
    const data = await resp.json();
    likeCount.value = data.likes;
  } catch (error) {
    console.error('Error fetching likes:', error);
  } finally {
    isLoading.value = false;
  }
};

</script>


<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background-color: #4a3f9a;
}
</style>