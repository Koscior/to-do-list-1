import React from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoItem } from './components/TodoItem';
import { TodoFilter } from './components/TodoFilter';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    filter,
    counts,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    setFilter,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CheckSquare size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">To-Do List</h1>
          </div>
          <p className="text-gray-600">Stay organized and get things done</p>
        </header>

        <main className="bg-white rounded-xl shadow-sm p-6">
          <TodoInput onAdd={addTodo} />
          
          <TodoFilter
            filter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />

          <div className="space-y-3">
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
            
            {todos.length === 0 && (
              <p className="text-center py-8 text-gray-500">
                {filter === 'all'
                  ? "No tasks yet. Add one above!"
                  : filter === 'active'
                  ? "No active tasks"
                  : "No completed tasks"}
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;