<template>
    <div v-if="task" class="card">
      <!-- Display task details -->
      <h2>{{ task.title }}</h2>
      <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
      <p><strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}</p>
      <p><strong>Описание</strong>: {{ task.description }}</p>
      <div>
        <!-- Button to take task in progress -->
        <button class="btn" @click="takeInProgress">Взять в работу</button>
        <!-- Button to mark task as done -->
        <button class="btn primary" @click="markDone">Завершить</button>
        <!-- Button to cancel task -->
        <button class="btn danger" @click="cancelTask">Отменить</button>
      </div>
    </div>
    <h3 class="text-white center" v-else>
      Задачи с id = <strong>{{ $route.params.id }}</strong> нет.
    </h3>
  </template>
  
  <script>
  import { ref, onMounted, getCurrentInstance, } from "vue";
  import { useRouter } from "vue-router";
  import AppStatus from "@/components/AppStatus.vue";
  
  export default {
    components: {
      AppStatus,
    },
    setup() {
      const router = useRouter();
      const taskId = router.currentRoute.value.params.id;
      const task = ref(null);
  
      onMounted(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          const tasks = JSON.parse(storedTasks);
          const foundTask = tasks.find((task) => task.id === parseInt(taskId));
          if (foundTask) {
            task.value = foundTask;
          }
        }
      });
  
      const takeInProgress = () => {
        if (task.value.status === "active") {
          task.value.status = "pending";
          updateLocalStorage(task.value);
          handleTaskStatusChange("active");
        }
      };
      const markDone = () => {
        if (task.value.status === "active") {
          task.value.status = "done";
          updateLocalStorage(task.value);
          handleTaskStatusChange("done");
        }
      };
  
      const cancelTask = () => {
        if (task.value.status === "active") {
          task.value.status = "cancelled";
          updateLocalStorage(task.value);
          handleTaskStatusChange("cancelled");
        }
      };
  
      const updateLocalStorage = (updatedTask) => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = storedTasks.map((t) =>
          t.id === updatedTask.id ? updatedTask : t
        );
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      };
  
      const handleTaskStatusChange = (newStatus) => {
        const instance = getCurrentInstance();
        if (instance) {
          instance.appContext.config.globalProperties.$emit("taskStatusChanged", task.value.id, newStatus);
        }
      };
      
     
      
      
      return {
        task,
        takeInProgress,
        markDone,
        cancelTask,
      };
    },
  };
  </script>
  