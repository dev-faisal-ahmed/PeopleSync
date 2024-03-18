import { AddJobFrom } from './add-job.form';

export default function AddJobPage() {
  return (
    <section className='px-6'>
      <div className='mx-auto mb-10 mt-5 max-w-xl rounded-md bg-gray-300/20 p-6 shadow-md'>
        <h2 className='mb-8 text-center text-xl'>Add New Job</h2>
        <AddJobFrom />
      </div>
    </section>
  );
}
