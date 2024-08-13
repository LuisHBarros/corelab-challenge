export function SearchBar() {
  return (
    <div className="h-7 lg:w-[32rem] ">
      <input
        type="text"
        placeholder="Pesquisar notas"
        className="w-56 h-full border rounded-sm py-4 text-sm px-2 focus:w-72 animate-pulse"
      />
    </div>
  );
}
