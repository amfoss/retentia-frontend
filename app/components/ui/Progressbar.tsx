type ProgressBarProps = {
  answered: number;
  total: number;
  className?: string;
};

export default function ProgressBar({
  answered,
  total,
  className = "",
}: ProgressBarProps) {

  const progress = total > 0 ? (answered / total) * 100 : 0;

  return (
    <div className={`w-full ${className}`}>

      
      <div className="flex justify-between text-xl mb-1 text-text/70">
        <span>{answered} / {total} answered</span>
      </div>

     
      <div className="w-full h-4 rounded-full bg-text overflow-hidden">

        <div
          className="h-full rounded-full bg-[#22C55E] transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />

      </div>

    </div>
  );
}