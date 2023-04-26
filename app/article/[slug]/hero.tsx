import avatar from "../../../assets/default-avatar.jpg";
import Image from "next/image";
import { Title } from "./title";

type Props = {
  title: string;
  authorName: string;
  profilePic: string | undefined | null;
  updatedAt: string;
};

export function Hero(props: Props) {
  return (
    <div className="col-span-full flex justify-center items-center bg-slate-500">
      <div className="flex flex-col w-11/12 py-6 gap-2">
        <Title content={props.title} />
        <div className="flex">
          <div className="flex items-center gap-3">
            <Image
              alt="profile pic"
              src={props.profilePic ?? avatar}
              width={36}
              height={36}
            />
            <div className="flex flex-col justify-center">
              <p className="text-white text-md">{props.authorName}</p>
              <p className="text-slate-200 text-sm">{props.updatedAt}</p>
            </div>
            <button className="border border-slate-200 rounded-sm text-slate-200 p-1">
              follow {props.authorName}
            </button>
            <button className="border border-green-500 rounded-sm text-green-500 p-1">
              favorite article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
