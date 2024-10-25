export interface Task {
    id?: string,
    title: string;
    description: string;
    priority: string; // e.g., 'low', 'medium', 'high'
    state: string;    // e.g., 'pending', 'in-progress', 'completed'
    image?: string;   // URL to the image, optional
  }
  