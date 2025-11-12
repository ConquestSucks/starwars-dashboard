
import { usePassThrough } from "primevue/passthrough";

export const CustomPreset = usePassThrough(
  { merge: false },
  {
    select: {
      root: "select-container flex justify-between items-center w-[315px] h-11 px-4 text-black bg-white border border-gray-400 rounded-lg cursor-pointer select-none focus-within:border-blue-100",
      label: "px-0 outline-none h-fit",
      dropdown: "flex items-center",
      dropdownIcon: "text-blue-100 transition duration-300",
      overlay: "flex flex-col gap-4 h-[344px] pt-6 pb-6 px-3 bg-white top-27.5! shadow-none border border-gray-200 rounded-lg select-none",
      header: "",
      pcFilterContainer: {
        root: "flex justify-between px-3 h-10 border border-gray-400 rounded-lg focus-within:border-blue-100 transition-all duration-300"
      },
      pcFilter: {
        root: "outline-none placeholder:text-gray-400 placeholder:text-sm w-full"
      },
      pcFilterIconContainer: {
        root: "flex items-center"
      },
      filterIcon: "text-gray-400",
      listContainer: "max-h-60! overflow-y-scroll",
      emptyMessage: "p-3",
    },
    button: {
      root: "flex items-center justify-between cursor-pointer",
      label: "w-full"
    },
    menu: {
      root: "rounded-lg! bg-white shadow-[-1px_-1px_10px_rgba(1,23,79,0.08)]",
      list: "px-3 py-4",
    },
    card: {
      root: "grow min-w-[calc(326/1318*100%)] bg-white rounded-3xl p-6 select-none shadow-[2px_2px_14px_rgba(1,23,79,0.09)]",
      title: "flex items-center justify-between leading-4",
      body: "flex flex-col gap-2 w-full",
      content: "flex justify-between w-full"
    }
  }
)
