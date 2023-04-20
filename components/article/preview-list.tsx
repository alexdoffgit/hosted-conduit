import { fetchArticleData } from "./preview-data";
import Preview from "./preview";

export default async function PreviewList() {
  const articles = await fetchArticleData()

  return (
    <>
      {articles.map((v) => (
        <Preview {...v} key={v.slug} />
      ))}
    </>
  );
}
