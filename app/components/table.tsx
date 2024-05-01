export const dynamic = "force-dynamic";
import DeleteButton from '@/app/components/DeleteButton';
import { NEXT_URL } from '@/app/components/rootURL';
import Link from 'next/link'

export default async function JobsTable({
    query,
    currentPage,
    sortBy,
    locationFilter,
    companyFilter,
    minSalary,
    maxSalary,
}: {
    query: string;
    currentPage:number;
    sortBy: string;
    locationFilter:string;
    companyFilter:string;
    minSalary:string;
    maxSalary:string;
}) {

    const GetSearchResults = async () => {
        const res = await fetch(`${NEXT_URL}/api/search?sortBy=${sortBy}&locationFilter=${locationFilter}&companyFilter=${companyFilter}&minSalary=${minSalary}&maxSalary=${maxSalary}&query=${query}`);
        const data = await res.json();
        return data.jobs;
    }

    const getMessageResults = async () => {
        const res = await fetch(`${NEXT_URL}/api/search?sortBy=${sortBy}&locationFilter=${locationFilter}&companyFilter=${companyFilter}&minSalary=${minSalary}&maxSalary=${maxSalary}&query=${query}`);
        const data = await res.json();
        return data.message;
    }

    const message = await getMessageResults();
    const jobs = await GetSearchResults();
    console.log(message)
    return (
        <div className="flex flex-col min-w-full align-middle p-5">
            <table className="min-w-full text-gray-100 md:table">
                <thead className="text-left border">
                    <tr>
                        <th scope="col" className="border">
                            Title
                        </th>
                        <th scope="col" className="border">
                            Location
                        </th>
                        <th scope="col" className="border">
                            Skills
                        </th>
                        <th scope="col" className="border">
                            Salary
                        </th>
                        <th scope="col" className="border">
                            Company
                        </th>
                        <th scope="col" className="border">
                            Description
                        </th>
                        <th scope="col" className="border">
                            Created At
                        </th>
                        <th scope="col" className="border">
                            Updated At
                        </th>
                        <th scope="col" className="border">
                            Change
                        </th>
                    </tr>
                </thead>
                <tbody >
                    {jobs.map((job:any) => (
                        <tr key = {job.id} className="border">
                            <td className="border">
                                <p>{job.title}</p>
                            </td>
                            <td className="border">
                                <p>{job.location}</p>
                            </td>
                            <td className="border">
                                <p>{job.skills}</p>
                            </td>
                            <td className="border">
                                <p>{job.salary}</p>
                            </td>
                            <td className="border">
                                <p>{job.company}</p>
                            </td>
                            <td className="border">
                                <p>{job.description}</p>
                            </td>
                            <td className="border">
                                <p>{new Date (job.createdAt).toDateString()}</p>
                            </td>
                            <td className="border">
                                <p>{new Date (job.updatedAt).toDateString()}</p>
                            </td>
                            <td className="border">
                                <Link href={`/blog/editPost/${job.id}`} className="px-3 py-1.5 mx-2 text-center bg-slate-200 rounded-md font-semibold text-black">Edit</Link>
                               <DeleteButton id={job.id}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}