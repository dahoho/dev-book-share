import { ChildrenType } from "@/type/children";

export const MainLayout = ({ children }: ChildrenType) => {
  return (
    <main className="md:w-[calc(100%-263px)] md:border-l md:border-gray-300 px-5 py-10">
      {children}
    </main>
  );
};
