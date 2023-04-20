import Image from "next/image"
import Link from "next/link"
import avatar from '../../assets/default-avatar.jpg'

type Props = {
    profilePic?: string
    username: string
    articleDate: string
}

export default function Profile(props: Props) {
    return <div className="flex gap-1">
        <Image alt="profile pic" src={props.profilePic ?? avatar} width={48} height={24}/>
        <div className="flex flex-col">
            <Link href={`/${props.username}`}>
                <p className="text-green text-lg">{props.username}</p>
            </Link>
            <p className="text-slate-400 text-sm">{props.articleDate}</p>
        </div>
    </div>
}