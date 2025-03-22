import { CATEGORY_MENU_ITEMS } from "@/constans";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { SetStateAction } from "jotai";

type SideBarPresentationalPropsType = {
  pathname: string;
  category: string;
  setCategory: (value: SetStateAction<string>) => void;
  postCountByTags?: Record<string, number>;
};

export const SideBarPresentational = ({
  pathname,
  category,
  setCategory,
  postCountByTags,
}: SideBarPresentationalPropsType) => {
  return (
    <>
      <aside className="md:h-screen md:w-[263px] hidden md:block">
        <ul className="px-5 py-10 flex flex-col overflow-y-auto h-full">
          {pathname === "/" ? (
            CATEGORY_MENU_ITEMS.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  onClick={() => setCategory(item.name)}
                  className={`w-full py-4 px-2 hover:bg-gray-300 cursor-pointer ${
                    category === item.name ? "bg-accent" : ""
                  }`}
                >
                  <span className="font-bold flex text-lg gap-2 text-left">
                    <span>#</span>
                    {item.name}&nbsp;
                    {postCountByTags && postCountByTags[item.name]
                      ? `(${postCountByTags[item.name]})`
                      : ""}
                  </span>
                </button>
              </li>
            ))
          ) : (
            <li>
              <Link
                href="/"
                className={`w-full py-4 px-2 bg-accent hover:bg-gray-300 cursor-pointer block`}
              >
                <span className="font-bold flex items-center text-lg gap-2 text-left">
                  <HomeIcon className="w-4" />
                  ホーム
                </span>
              </Link>
            </li>
          )}
        </ul>
      </aside>
      {pathname === "/" && (
        <div className="md:hidden mt-8 flex justify-center">
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="すべて" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_MENU_ITEMS.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};
