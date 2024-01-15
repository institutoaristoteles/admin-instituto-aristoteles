import { Tag, TagProps } from "primereact/tag";
import { PostStatus } from "../models/post-status";

export default function PostStatusTable({status}: {status: PostStatus}) {
    const statusProps: Record<PostStatus, TagProps> = {
        draft: {
            severity:'warning',
            value:'Rascunho'
        },
        published: {
            severity:'success',
            value:'Publicado'
        }
    }  

    return (
        <Tag {...statusProps[status]}/>
    )
}