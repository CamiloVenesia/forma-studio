import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ArrowLinkProps {
  to: string;
  children: ReactNode;
  variant?: 'dark' | 'light' | 'outline' | 'text';
  className?: string;
}

export function ArrowLink({ to, children, variant = 'dark', className = '' }: ArrowLinkProps) {
  return (
    <Link className={`arrow-link arrow-link--${variant} ${className}`} to={to}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.8} />
    </Link>
  );
}
