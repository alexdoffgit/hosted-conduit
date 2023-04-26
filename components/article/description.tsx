import Link from "next/link";

type Props = {
  content: string;
  slug: string;
};

export default function Description(props: Props) {
  return (
    <Link href={`/article/${props.slug}`}>
      <p className="text-slate-300">{props.content}</p>
    </Link>
  );
}
