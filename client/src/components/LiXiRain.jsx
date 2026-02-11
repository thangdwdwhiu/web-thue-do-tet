import { memo, useMemo } from "react";

const LiXiRain = ({ onClose }) => { 
  const items = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + "%",
      animationDuration: Math.random() * 3 + 2 + "s",
      animationDelay: Math.random() * 5 + "s",
      fontSize: Math.random() * 20 + 20 + "px",
      content: ["🧧", "💰", "🌸", "✨"][Math.floor(Math.random() * 4)]
    }));
  }, []);

  return (
    <div className="lixi-overlay" onClick={onClose}>
      {items.map(item => (
        <div
          key={item.id}
          className="falling-item"
          style={{
            left: item.left,
            animationDuration: item.animationDuration,
            animationDelay: item.animationDelay,
            fontSize: item.fontSize
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default LiXiRain