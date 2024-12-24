interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export default function Card({ children, className = '' }: CardProps) {
    return (
      <div className={`bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
        {children}
      </div>
    );
  }