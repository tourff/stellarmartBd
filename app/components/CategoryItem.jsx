"use client";

import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { useCategories } from "../context/CategoryContext";

const CategoryItem = ({ category, level = 0 }) => {
  const { toggleCategory, expandedCategories } = useCategories();
  const isExpanded = expandedCategories[category._id];
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;
  const paddingLeft = `${level * 20 + 16}px`;

  return (
    <>
      <div 
        className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
        onClick={() => hasSubcategories && toggleCategory(category._id)}
      >
        <Link 
          href={`/category/${category.slug}`}
          className={`block p-4 text-gray-800 font-medium flex items-center justify-between cursor-pointer pr-4 select-none ${
            level > 0 ? 'text-sm pl-0' : 'font-semibold'
          }`}
        >
          <span style={{ paddingLeft }} className="truncate flex-1">
            {category.name}
          </span>
          {hasSubcategories && (
            <span className="flex-shrink-0 ml-2">
              {isExpanded ? <Minus size={20} className="text-blue-600" /> : <Plus size={20} className="text-blue-600" />}
            </span>
          )}
        </Link>
      </div>
      {hasSubcategories && isExpanded && (
        <div>
          {category.subcategories.map((subCategory) => (
            <CategoryItem 
              key={subCategory._id}
              category={subCategory}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryItem;

