// App: app-factory
// File: src/components/ui/Card.tsx
// Version: 1.0.0
// Turns: 13
// Author: AI Coding Agent (Claude Opus 4.5)
// Date: 2026-03-29T00:26:14Z
// Description: Card component for feature display

import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  href?: string;
  className?: string;
}

export function Card({ title, description, href, className = '' }: CardProps) {
  const content = (
    <>
      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
        {title}
        {href && <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>}
      </h2>
      <p className="mt-2 text-gray-600">{description}</p>
    </>
  );

  const cardClasses = `group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-sky-300 hover:shadow-md ${className}`;

  if (href) {
    return (
      <Link href={href} className={cardClasses}>
        {content}
      </Link>
    );
  }

  return <div className={cardClasses}>{content}</div>;
}
