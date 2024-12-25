interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export default function Card({ children, className = '' }: CardProps) {
    return (
      <div className={`p-6 rounded-lg bg-[var(--card-background)] border border-[var(--border-color)] ${className}`}>
        {children}
      </div>
    );
  }