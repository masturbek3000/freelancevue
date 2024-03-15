<template>
    <div class="card">
      <h2>Создать новую задачу</h2>
      <form @submit="onSubmit">
        <div class="form-control">
          <label for="title">Название</label>
          <input type="text" id="title" v-model="newTaskTitle">
        </div>
  
        <div class="form-control">
          <label for="date">Дата дэдлайна</label>
          <input type="date" id="date" v-model="newTaskDate">
        </div>
  
        <div class="form-control">
          <label for="description">Описание</label>
          <textarea id="description" v-model="newTaskDescription"></textarea>
        </div>
  
        <button class="btn primary">Создать</button>
      </form>
    </div>
  </template>
 
 <script>
 import { ref } from 'vue';
 import { useRouter } from 'vue-router'; // Import useRouter from vue-router
 
 export default {
   setup() {
     const router = useRouter(); // Use useRouter to get the router instance
 
     const newTaskTitle = ref('');
     const newTaskDate = ref('');
     const newTaskDescription = ref('');
     const id = ref(0)
     const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
     if (storedTasks.length > 0) {
      id.value = Math.max(...storedTasks.map(task => task.id)) + 1;
    }
    const onSubmit = () => {
  const currentDate = new Date();
  const selectedDate = new Date(newTaskDate.value);

  const newTask = {
    title: newTaskTitle.value,
    date: newTaskDate.value,
    description: newTaskDescription.value,
    status: 'active',
    id: id.value
  };

  // If the selected date is before the current date, set status to "Отменено"
  if (selectedDate < currentDate) {
    newTask.status = 'cancelled';
  }

  // Retrieve existing tasks from localStorage or initialize an empty array
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  // Add the new task to the array
  tasks.push(newTask);
  // Save the updated tasks array back to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  id.value++;
  // Redirect to AllTasks component
  router.push({ name: 'AllTasks' });
};

 
     return {
       newTaskTitle,
       newTaskDate,
       newTaskDescription,
       onSubmit,
     };
   },
 };
 </script>
 