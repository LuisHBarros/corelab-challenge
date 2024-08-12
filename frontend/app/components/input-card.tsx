import { Star } from "@mui/icons-material";

export function InputCard() {
  return (
    <>
      <div className="bg-white w-72 h-28 mt-5 rounded-3xl flex flex-col">
        <div className="flex flex-row items-center justify-between border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold leading-10 ">Titulo</h1>
          <button>
            <Star />
          </button>
        </div>
        <input
          type="text"
          placeholder="Criar nota..."
          className="mx-4 h-12 border-none bg-transparent shadow-none p-0 m-0 focus:outline-none"
        />
      </div>
    </>
  );
}
