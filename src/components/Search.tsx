import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export const Search = () => {
  return (
    <div className="flex items-center ml-[85px] flex-1 mr-[42px]">
      <Input
        className="outline-none text-[14px] font-thin placeholder:text-white placeholder:font-thin rounded-none h-[44px]"
        placeholder="Search for anything"
      />
      <div className="size-[44px] bg-[#FFD44D] flex-shrink-0 flex items-center justify-center">
        <SearchIcon />
      </div>
    </div>
  );
};
