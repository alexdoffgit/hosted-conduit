import Description from "./description";
import FavoriteButton from "./favorite-button";
import Profile from "./profile";
import ReadMoreLink from "./read-more";
import Tags from "./tags";
import Title from "./title";

type Props = {
  profilePic?: string;
  username: string;
  articleDate: string;
  favorited: boolean;
  favoritesCount: number;
  title: string;
  description: string;
  slug: string;
  tags: string[];
};

export default function Preview(props: Props) {
  return (
    <div className="flex flex-col border border-x-0 border-b-0 border-t-slate-200">
      <div className="flex justify-between items-center">
        <Profile
          articleDate={props.articleDate}
          profilePic={props.profilePic}
          username={props.username}
        />
        <FavoriteButton
          count={props.favoritesCount}
          favorited={props.favorited}
        />
      </div>
      <Title content={props.title} />
      <Description content={props.description} />
      <div className="flex justify-between items-center">
        <ReadMoreLink href={`/article/${props.slug}`} />
        <Tags names={props.tags} />
      </div>
    </div>
  );
}
