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
        className={`menu-item ${isExpanded ? 'open' : ''}`}
        onClick={() => hasSubcategories && toggleCategory(category._id)}
      >
        <div className="menu-label flex items-center justify-between p-4 pr-4 cursor-pointer select-none transition-all group"
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
{isExpanded ? '−' : '+'}
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

