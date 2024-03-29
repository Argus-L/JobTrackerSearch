export const dynamic = "force-dynamic";
import { NEXT_URL } from '@/app/components/rootURL';
import DeleteButton from '@/app/components/DeleteButton';
import Link from 'next/link'


export default async function JobsList({
    query,
    currentPage,
    sortBy,
    filterBy,
    filterOption
}: {
    query: string;
    currentPage:number;
    sortBy: string;
    filterBy: string;
    filterOption: string;
}) {
    const GetSearchResults = async () => {
      const res = await fetch(`${NEXT_URL}/api/search/?sortBy=${sortBy}&filterBy=${filterBy}&filterOption=${filterOption}&query=${query}`);
      const data = await res.json();
      return data.jobs;
    }

    const jobs = await GetSearchResults();

    return (
        <div className ="w-full flex flex-col justify-center items-center">
        {jobs.map((job:any) => (
          <div key={job.id} className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-200 flex flex-col justify-center">
            <h3>{job.title}</h3>
            <p>Location: {job.location}</p>
            <p>Skills: {job.skills}</p>
            <p>Salary: {job.salary}</p>
            <p>Company: {job.company}</p>
            <p>Description: {job.description}</p>
            <p>Created At: {new Date (job.createdAt).toDateString()}</p>
            <p>Updated At: {new Date (job.updatedAt).toDateString()}</p>
            <div className="text-right">
              <Link href={`/blog/editPost/${job.id}`} className="px-3 py-1.5 mx-2 text-center bg-slate-900 rounded-md font-semibold text-slate-200">Edit</Link>
              <DeleteButton id={job.id} />
            </div>
          </div>
        ))}
      </div>
    )
}