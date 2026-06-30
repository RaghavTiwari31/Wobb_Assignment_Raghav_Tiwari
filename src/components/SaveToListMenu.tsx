import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/store/useStore';

interface SaveToListMenuProps {
  username: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export function SaveToListMenu({ username, onOpenChange }: SaveToListMenuProps) {
  const { customLists, createList, toggleProfileInList } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleMenu(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
    }
  };

  // Check if profile is in ANY list
  const isSavedAnywhere = customLists.some(list => list.profiles.includes(username));

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-1.5 border hover:shadow-sm active:scale-95 ${
          isSavedAnywhere 
            ? 'bg-gray-900 text-white border-gray-900' 
            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu(!isOpen);
        }}
      >
        {isSavedAnywhere ? '✓ Saved' : '+ Add to List'}
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-3 bg-gray-50 border-b border-gray-200 font-semibold text-sm text-gray-700">
            Save to List
          </div>
          
          <div className="max-h-48 overflow-y-auto p-2">
            {customLists.map((list) => {
              const isSaved = list.profiles.includes(username);
              return (
                <label 
                  key={list.id} 
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={isSaved}
                    onChange={() => toggleProfileInList(list.id, username)}
                  />
                  <span className="text-sm font-medium text-gray-700 truncate flex-1">{list.name}</span>
                </label>
              );
            })}
          </div>

          <div className="p-3 border-t border-gray-200 bg-gray-50 shrink-0">
            <form onSubmit={handleCreateList} className="flex gap-2">
              <input
                type="text"
                placeholder="New list name..."
                className="flex-1 min-w-0 text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-blue-500"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!newListName.trim()}
                className="px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded disabled:opacity-50 hover:bg-gray-800 transition-colors shrink-0"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
