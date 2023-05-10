import {Navigation} from "@components/navbar";
import { CreateArticleForm } from "./form";

export default function CreateArticle() {
  return (
    <div className="grid grid-cols-12">
      {/* @ts-expect-error Server Component */}
      <Navigation />
      <CreateArticleForm />
    </div>
  );
}
