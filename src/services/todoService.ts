// src/services/todoService.ts

export const addTask = async (taskData: any) => {
  try {
    const response = await fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add task: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Task added successfully:', result);
    return result;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};
