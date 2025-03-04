type Props = {
    title: string;
};
  
export default function HeaderTitle({ title }: Props) {
return <h1 className="font-medium text-xl text-accent-100">{title}</h1>;
}
  