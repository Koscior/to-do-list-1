import React, { useState } from 'react';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${todo.completed ? 'bg-gray-50' : 'bg-white'} border border-gray-200 hover:border-gray-300 group`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-200"
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />
      
      {isEditing ? (
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            autoFocus
          />
          <button
            onClick={handleEdit}
            className="p-1 text-green-500 hover:text-green-600"
            aria-label="Save edit"
          >
            <Check size={18} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-red-500 hover:text-red-600"
            aria-label="Cancel edit"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <>
          <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
            {todo.text}
          </span>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
              aria-label="Edit task"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}