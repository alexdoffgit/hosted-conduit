import {Navigation} from "@components/navbar";
import { DraftForm } from "./draft-form";

export default function CreateDraft({ params }: { params: { id: string } }) {
  return (
    <div className="grid grid-cols-12">
      {/* @ts-expect-error Server Component */}
      <Navigation />
      <DraftForm pageId={params.id}  />
    </div>
  );
}
