import type { ReactNode } from 'react';
interface Props {
  number: string;
  children: ReactNode;
}
export function SectionLabel({ number, children }: Props) {
  return (
    <span className="section-label">
      <span>{number}</span> {children}
    </span>
  );
}
