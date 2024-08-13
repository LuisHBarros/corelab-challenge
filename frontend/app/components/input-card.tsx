import { Star, StarBorder } from "@mui/icons-material";

export function InputCard() {
  return (
    <>
      <div className="bg-white w-72 h-28 mt-5 rounded-3xl shadow-md flex flex-col border border-[#D9D9D9] lg:w-[32rem] lg:h-40 lg:rounded-none">
        <div className="flex flex-row items-center justify-between border-b border-gray-200 px-4">
          <h1 className="text-xl font-bold leading-10 ">Titulo</h1>
          <button className="mt-[1px]">
            <StarBorder sx={{ color: "#455a64", fontSize: 30 }} />
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
