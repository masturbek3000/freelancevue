<template>
    <nav class="navbar">
      <h3>Freelance</h3>
      <ul class="navbar-menu">
        <li>
          <router-link to="/">Все задачи</router-link>
        </li>
        <li>
          <router-link to="/new">Создать</router-link>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  import { useRouter } from 'vue-router'; // Import useRouter from vue-router
  
  export default {
    setup() {
      const router = useRouter(); // Use useRouter to get the router instance
  
      const onCreateTask = () => {
        // Redirect to the new task creation page
        router.push({ name: 'AppNew' });
      };
  
      return {
        onCreateTask,
      };
    },
  };
  </script>
  