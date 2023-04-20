import HeartIcon from "@components/icons/heart";

type Props = {
  favorited: boolean;
  count: number;
};

export default function FavoriteButton(props: Props) {
  if (props.favorited) {
    return (
      <div className="flex items-center border border-green-500 rounded bg-green-500 px-1">
        <HeartIcon />
        <p className="text-white">{props.count}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center border border-green-500 rounded px-1">
      <HeartIcon />
      <p className="text-green-500">{props.count}</p>
    </div>
  );
}
