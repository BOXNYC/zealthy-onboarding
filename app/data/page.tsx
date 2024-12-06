import PageTitle from "@/components/UX/PageTitle";
import { getUsers } from "../actions/api";
import { User } from "@/types/models";

export default async function Data() {
    const users = await getUsers();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <PageTitle title="Data" subtitle="All users" />
            <table className="table-auto mt-8">
                <thead>
                    <tr>
                        <th className="p-4">Email</th>
                        <th className="p-4">About</th>
                        <th className="p-4">Birthday</th>
                        <th className="p-4">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User, index: number)=><tr key={index} className="border border-b-[#ddd]">
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">{user.data?.about}</td>
                        <td className="p-4">{user.data?.birthday}</td>
                        <td className="p-4">{`${user.data?.address}, ${user.data?.city}, ${user.data?.state} ${user.data?.zip}`}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}
