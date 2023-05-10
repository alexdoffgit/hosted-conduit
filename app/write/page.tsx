import { Navigation } from "@components/navbar";
import { DraftsColumn } from "./draft-column";
import { ArticlesColumn } from "./article-column";

export default function WriteList() {
    return <div className="grid grid-cols-12">
        {/* @ts-expect-error Server Component */}
        <Navigation />
        <div className="col-start-3 col-span-4 flex justify-center mt-6">
            <h2 className="text-2xl">Drafts</h2>
        </div>
        <div className="col-span-4 flex justify-center mt-6">
            <h2 className="text-2xl">Articles</h2>
        </div>
        {/* @ts-expect-error Server Component */}
        <DraftsColumn />
        {/* @ts-expect-error Server Component */}
        <ArticlesColumn />
    </div>
}