import { useState } from "react";

export function Tabs({ tabs }: { tabs: { key: string; label: string; content: JSX.Element }[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  const current = tabs.find(t => t.key === active) ?? tabs[0];

  return (
    <div className="p-4">
      <div className="flex gap-2 border-b">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`px-4 py-2 ${current?.key === t.key ? "border-b-2 font-semibold" : ""}`}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{current?.content}</div>
    </div>
  );
}
