/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  LoginFormSchema,
  LoginFromSchemaType,
} from '@/lib/validation/login-form-schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useLoginMutation } from '@/redux/api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setTokenToLocal } from '@/utils/helper/token-helper';

const fields = [
  { name: 'email', placeholder: 'Input Email', label: 'Email' },
  { name: 'password', placeholder: 'Input Password', label: 'Password' },
];

type FiledNameType = 'email' | 'password';

export function LoginForm() {
  const form = useForm<LoginFromSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: { email: '', password: '' },
  });

  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const onSubmit = async (data: LoginFromSchemaType) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (!response.ok) {
        toast.error(response.message);
      }

      setTokenToLocal(response.data?.token as string);
      toast.success(response.message);
      navigate('/');
      form.reset();
    } catch (err: any) {
      toast.error(err.data?.message);
    }
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {fields.map(({ label, name, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as FiledNameType}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...field}
                    type={name === 'password' ? 'password' : 'text'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button>Login</Button>
      </form>
    </Form>
  );
}
