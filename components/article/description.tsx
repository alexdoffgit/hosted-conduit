type Props = {
    content: string
}

export default function Description(props: Props) {
    return <p className="text-slate-300">{props.content}</p>
}