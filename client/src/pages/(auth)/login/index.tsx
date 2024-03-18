import { LoginForm } from './login-form';

export default function LoginPage() {
  return (
    <section className='flex min-h-screen items-center justify-center bg-primary-foreground/30'>
      <div className='mx-auto w-full max-w-[450px] rounded-lg p-10 shadow-none sm:bg-white sm:shadow-md'>
        <h1 className='mb-2 text-center text-lg font-semibold sm:text-2xl'>
          Login
        </h1>
        <p className='mb-5 mt-2 text-center text-sm text-gray-500'>
          Input Your Credential
        </p>
        <LoginForm />
      </div>
    </section>
  );
}
