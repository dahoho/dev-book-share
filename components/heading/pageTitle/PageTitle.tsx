type PageTitlePropsType = {
  title: string;
};

export const PageTitle = ({ title }: PageTitlePropsType) => {
  return <h2 className="text-3xl font-bold">{title}</h2>;
};
