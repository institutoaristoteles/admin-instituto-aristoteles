import { Avatar } from "primereact/avatar";
import { UserProfile } from "../models/user-profile";

interface UserAvatarTableProps {
    user: UserProfile
}

export default function UserAvatarTable({ user }: UserAvatarTableProps) {
    return (
        <div className="flex items-center gap-2 lg:ml-auto p-1 pr-3">
            <Avatar
                image={user.avatar}
                label={user.name[0]}
                shape="circle"
                className="rounded-full overflow-hidden"
            />
            <span className="text-sm text-text-color hidden md:block">
                {user.name}
            </span>
        </div>
    )
}