import Tag from "./tag"

type Props = {
    names: string[]
}

export default function Tags(props: Props) {
    return <div className="flex">{props.names.map(name => (<Tag key={name} name={name} />))}</div>
}