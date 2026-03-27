'use client';
import { useEffect } from 'react';

export default function NoAutoScroll() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
