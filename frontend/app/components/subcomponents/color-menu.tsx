interface ColorMenuProps {
  key: number;
  color: string;
}

export function ColorMenu({ key, color }: ColorMenuProps) {
  return (
    <button
      key={key}
      className="rounded-full w-7 h-7 m-1 border-none"
      style={{ backgroundColor: color }}
    ></button>
  );
}
