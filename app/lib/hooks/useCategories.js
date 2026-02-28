'use client';

import { useState, useEffect } from 'react';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/categories/nested');
        const data = await res.json();
        
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data.categories || []);
        }
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Fetch categories error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetch('/api/categories/nested')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setCategories(data.categories || []);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch categories');
        setLoading(false);
      });
  };

  return { categories, loading, error, refetch };
}

export default useCategories;
