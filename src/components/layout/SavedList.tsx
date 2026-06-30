import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { List, ChevronRight } from 'lucide-react';

export function SavedList() {
  const { customLists, toggleProfileInList, deleteList, platform } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedListIds, setExpandedListIds] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const toggleExpand = (listId: string) => {
    setExpandedListIds(prev => {
      const next = new Set(prev);
      if (next.has(listId)) {
        next.delete(listId);
      } else {
        next.add(listId);
      }
      return next;
    });
  };

  const totalSavedProfiles = customLists.reduce((sum, list) => sum + list.profiles.length, 0);

  return (
    <div className="relative" ref={containerRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:shadow-md transition-shadow z-10 relative active:scale-95"
      >
        <List className="w-4 h-4 text-gray-700" />
        <span className="font-semibold text-sm text-gray-700">My List</span>
        <span className="text-gray-500 text-sm font-medium">({totalSavedProfiles})</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)", transition: { duration: 0.2 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-3 bg-gray-50 border-b border-gray-200 font-semibold flex justify-between items-center text-sm">
              <span>Saved Profiles</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900 transition-colors">
                Close
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              {customLists.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">
                  No lists created yet.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {customLists.map(list => {
                    const isExpanded = expandedListIds.has(list.id);
                    return (
                      <div key={list.id} className="p-3">
                        <div className="flex justify-between items-center">
                          <button 
                            onClick={() => toggleExpand(list.id)}
                            className="font-semibold text-gray-800 text-sm flex items-center gap-2 hover:text-blue-600 transition-colors text-left flex-1"
                          >
                            <span>
                              <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
                            </span>
                            {list.name} <span className="text-xs text-gray-500 font-normal">({list.profiles.length})</span>
                          </button>
                          <button 
                            onClick={() => deleteList(list.id)}
                            className="text-xs text-red-500 hover:text-red-700 font-medium ml-2"
                          >
                            Delete List
                          </button>
                        </div>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              {list.profiles.length === 0 ? (
                                <p className="text-xs text-gray-400 mt-2 ml-4">Empty list</p>
                              ) : (
                                <ul className="space-y-1 mt-2 ml-4">
                                  {list.profiles.map(username => (
                                    <li key={username} className="flex justify-between items-center group py-1">
                                      <Link 
                                        to={`/profile/${username}?platform=${platform}`} 
                                        className="text-blue-600 hover:underline font-medium text-xs truncate mr-2 flex-1" 
                                        onClick={() => setIsOpen(false)}
                                      >
                                        @{username}
                                      </Link>
                                      <button 
                                        onClick={() => toggleProfileInList(list.id, username)}
                                        className="text-red-400 hover:text-red-600 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        Remove
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
