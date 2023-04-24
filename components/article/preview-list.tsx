import { fetchArticleData } from "./preview-data";
import Preview from "./preview";

type Props = {
  searchQuery?: string
  tagsQuery?: string[]
}

export default async function PreviewList(props: Props) {
  const articles = await fetchArticleData(props.searchQuery)

  return (
    <>
      {articles.map((v) => (
        <Preview {...v} key={v.slug} />
      ))}
    </>
  );
}
