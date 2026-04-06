// components/Marquee.tsx
const Marquee = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className={`relative flex overflow-hidden whitespace-nowrap ${className}`}>
      <span className="animate-marquee">{text}</span>
      <span className="animate-marquee2 absolute top-0">{text}</span>
    </div>
  );
};

export default Marquee;
