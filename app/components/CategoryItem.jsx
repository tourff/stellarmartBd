"use client";

import Link from "next/link";
import { Plus, Minus } from "lucide-react";
import { useCategories } from "../context/CategoryContext";

const CategoryItem = ({ category, level = 0 }) => {
  const { toggleCategory, expandedCategories } = useCategories();
  const isExpanded = expandedCategories[category._id];
  const hasSubcategories = category.subcategories && category.subcategories.length > 0;
  const paddingLeft = `${level * 28 + 12}px`;

  return (
    <>
      <div 
        className={`menu-item border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors ${isExpanded ? 'bg-blue-50 border-blue-200' : ''}`}
        onClick={() => hasSubcategories && toggleCategory(category._id)}
      >
        <div className="menu-label block p-4 text-gray-800 font-medium flex items-center justify-between cursor-pointer pr-4 select-none transition-all group"
          style={{ paddingLeft }}
        >
          <Link 
            href={`/category/${category.slug}`}
            className={`truncate flex-1 group-hover:text-blue-700 ${level === 0 ? 'font-semibold text-lg' : 'text-base'} ${isExpanded ? 'font-bold text-blue-700' : ''}`}
          >
            {category.name}
          </Link>
          {hasSubcategories && (
            <span className="icon-toggle flex-shrink-0 ml-3 p-1 rounded-full group-hover:bg-blue-100 transition-all">
              {isExpanded ? <Minus size={18} className={`text-blue-600 ${isExpanded ? 'rotate-0' : ''}`} /> : <Plus size={18} className={`text-blue-600 hover:rotate-45 transition-transform`} />}
            </span>
          )}
        </div>
      </div>
      {hasSubcategories && isExpanded && (
        <div className="sub-menu overflow-hidden">
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

