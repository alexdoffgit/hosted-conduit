type Props = {
  name: string;
};

export default function Tag({ name }: Props) {
  return (
    <p className="p-1 border border-slate-300 text-slate-300 rounded-md">
      {name}
    </p>
  );
}
