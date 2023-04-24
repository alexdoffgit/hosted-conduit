import Navigation from "@components/navbar";
import { Form } from "./form";

export default function Settings() {
  return (
    <div className="grid grid-cols-12">
      {/* @ts-expect-error Server Component */}
      <Navigation />
      <Form />
    </div>
  );
}
