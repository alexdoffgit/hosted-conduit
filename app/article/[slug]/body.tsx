"use client";

export function Body(props: { html: string }) {
  return (
    <div
      className="col-start-2 col-span-10 flex flex-col gap-3 my-4"
      dangerouslySetInnerHTML={{ __html: props.html }}
    ></div>
  );
}
