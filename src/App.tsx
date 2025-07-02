import { useEffect, useState } from 'react';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

import { useAuthenticator } from '@aws-amplify/ui-react';

const client = generateClient<Schema>();

function deleteTodo(id: string) {
  client.models.Todo.delete({ id });
}

function App() {
  const [todos, setTodos] = useState<Array<Schema['Todo']['type']>>([]);
  const { signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    console.log('testsss');
    client.models.Todo.create({ content: window.prompt('Todo content') });
  }

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold text-emerald-700 mb-3">My TODOS!</h1>
      <button
        className="bg-emerald-700 text-white p-2 rounded-md w-full my-3"
        onClick={createTodo}
      >
        + new
      </button>
      <ul>
        {todos.map((todo) => (
          <li
            className="border-amber-400 border-1 p-3 my-5 rounded-md"
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}
          >
            {todo.content}
          </li>
        ))}
      </ul>
      <button
        className="bg-red-700 text-white p-2 rounded-md w-full  my-3"
        onClick={signOut}
      >
        Sign out
      </button>
    </main>
  );
}

export default App;
