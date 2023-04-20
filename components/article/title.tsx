type Props = {
    content: string
}

export default function Title(props: Props) {
    return <h3 className="font-bold text-xl">{props.content}</h3>
}