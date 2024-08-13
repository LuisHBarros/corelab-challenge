import { updateNote } from "@/app/api/note/update-note";

interface ColorMenuProps {
  color: string;
  colorIndex: number;
}

export function ColorMenu({ color, colorIndex }: ColorMenuProps) {
  const { id } = SessionContext();
  function handleColorChange() {
    // updateNote({ color: colorIndex, id: id });
  }
  return (
    <button
      className="rounded-full w-7 h-7 m-1 border-none hover:opacity-20"
      style={{ backgroundColor: color }}
      onClick={handleColorChange}
    ></button>
  );
}
function SessionContext(): { id: any } {
  throw new Error("Function not implemented.");
}
