<template>
    <div>
      <template v-if="activeTasks.length > 0">
        <h3 class="text-white">Всего активных задач: {{ activeTasks.length }}</h3>
        <div v-for="task in activeTasks" :key="task.id" class="card">
          <h2 class="card-title">
            {{ task.title }} <AppStatus :type="task.status" />
          </h2>
          <p>
            <strong
              ><small>{{ task.date }}</small></strong
            >
          </p>
  
          <!-- Display task status -->
          <button class="btn primary" @click="viewTask(task.id)">
            Посмотреть
          </button>
        </div>
      </template>
      <h1 class="text-white center" v-else>Задач пока нет</h1>
    </div>
  </template>
<script>


   import { ref, onMounted, computed } from "vue";
   import { useRouter } from "vue-router";
   import AppStatus from "@/components/AppStatus.vue";
   
   export default {
     components: {
       AppStatus,
     },
     setup() {
       const router = useRouter();
       const tasks = ref([]);
   
       onMounted(() => {
         const storedTasks = localStorage.getItem("tasks");
         if (storedTasks) {
           tasks.value = JSON.parse(storedTasks);
         }
       });
   
       const activeTasks = computed(() =>
         tasks.value.filter(
           (task) => task.status !== "Завершено" && task.status !== "Отменен"
         )
       );
   
       const viewTask = (taskId) => {
         router.push({ name: "AppTask", params: { id: taskId } });
       };
   
       const handleTaskStatusChange = (taskId, newStatus) => {
         const taskIndex = tasks.value.findIndex((task) => task.id === taskId);
         if (taskIndex !== -1) {
           tasks.value[taskIndex].status = newStatus;
           localStorage.setItem("tasks", JSON.stringify(tasks.value));
         }
       };
   
       return {
         activeTasks,
         viewTask,
         handleTaskStatusChange,
       };
     },
   };
</script>