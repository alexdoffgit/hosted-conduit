import Link from "next/link";

type Props = {
  href: string;
};

export default function ReadMoreLink(props: Props) {
  return (
    <Link href={props.href}>
      <p className="text-slate-300">Read more...</p>
    </Link>
  );
}
