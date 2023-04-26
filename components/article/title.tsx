import Link from "next/link";

type Props = {
  content: string;
  slug: string;
};

export default function Title(props: Props) {
  return (
    <Link href={`/article/${props.slug}`}>
      <h3 className="font-bold text-xl">{props.content}</h3>
    </Link>
  );
}
