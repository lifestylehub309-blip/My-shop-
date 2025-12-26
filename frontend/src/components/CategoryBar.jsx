import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriesAPI } from '../services/api';
import { 
  Smartphone, Shirt, Home, Tv, BookOpen, 
  Gamepad2, Sparkles, Dumbbell 
} from 'lucide-react';

const iconMap = {
  Smartphone, Shirt, Home, Tv, BookOpen,
  Gamepad2, Sparkles, Dumbbell
};

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoriesAPI.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto py-4 scrollbar-hide">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="flex flex-col items-center gap-2 min-w-fit group transition-transform hover:scale-105"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:shadow-md transition-shadow">
                  {IconComponent && <IconComponent className="h-8 w-8 text-[#2874f0]" />}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#2874f0] text-center">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
