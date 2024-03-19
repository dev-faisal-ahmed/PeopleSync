/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ChangeEvent, useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { CustomSelect } from '@/components/shared/form/custom-select';
import { toast } from 'sonner';
import { imageBbApiKey } from '@/config/config';
import { useCarateApplicationMutation } from '@/redux/api/application';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { applyJobFormFields } from './apply-job-from.data';
import {
  ApplyJobFormSchema,
  ApplyJobFormSchemaType,
} from '@/lib/validation/apply-job-form-schema';
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type FiledNameType = 'name' | 'expectedSalary' | 'experience';
const genders = ['male', 'female'];

type ApplyJobFormProps = {
  job: string;
};

export function ApplyJobForm({ job }: ApplyJobFormProps) {
  const form = useForm<ApplyJobFormSchemaType>({
    resolver: zodResolver(ApplyJobFormSchema),
    defaultValues: {
      name: '',
      expectedSalary: '',
      experience: '',
    },
  });

  const [createJob, { isLoading }] = useCarateApplicationMutation();
  const imageRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState('');
  const [gender, setGender] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const onGenderChange = (value: string) => setGender(value);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const imageUrl = URL.createObjectURL(event.target.files?.[0] as File);
    setImageFile(imageUrl);
  };

  const onSubmit = async (data: ApplyJobFormSchemaType) => {
    const toastId = toast.loading('Wait a Sec...');
    try {
      const imageTarget = imageRef.current;
      if (!imageFile || !imageTarget)
        throw new Error('Please Select an image first');

      if (!gender) throw new Error('Please Select the gender');

      // uploading the image to imgBB
      toast.loading('Uploading Image', { id: toastId });
      const imageForm = new FormData();
      imageForm.append('image', imageTarget?.files?.[0] as File);

      const url = `https://api.imgbb.com/1/upload?key=${imageBbApiKey}`;
      const imageBBResponse = await fetch(url, {
        method: 'POST',
        body: imageForm,
      });

      const imageData = await imageBBResponse.json();
      if (!imageData.success) throw new Error('Failed to upload the image');
      toast.success('Image Uploaded');

      // now sending data to thw server
      const response = await createJob({
        name: data.name.trim(),
        expectedSalary: Number(data.expectedSalary),
        experience: Number(data.experience),
        gender: gender as 'male' | 'female',
        imageUrl: imageData.data?.url,
        job,
      }).unwrap();

      if (!response.ok) throw new Error(response.message);
      toast.success(response.message);
      // resetting everything
      setImageFile('');
      setGender('');
      imageRef.current.value = '';
      setShowDialog(false);
    } catch (err: any) {
      console.log(err);
      if (err instanceof Error) toast.error(err.message);
      else toast.error(err.data?.message || 'Something Went wrong');
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button className='ml-auto block' size={'sm'}>
          Apply For This Job
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply For This Job</DialogTitle>
          <DialogDescription className='mt-5'>
            Please provide all the necessary information
          </DialogDescription>
        </DialogHeader>
        <div className='relative mb-5 h-fit cursor-pointer rounded-md border'>
          {/* image uploader and image shower */}
          <label htmlFor='image'>
            <div className='h-[150px] overflow-hidden rounded-md'>
              {imageFile ? (
                <img className='h-full w-full object-cover' src={imageFile} />
              ) : (
                <div className='flex h-full cursor-pointer flex-col items-center justify-center shadow'>
                  <Upload />
                  <p className='mt-2'>Upload Image</p>
                </div>
              )}
            </div>
          </label>
          {/* image remover */}
          {imageFile && (
            <div
              onClick={() => setImageFile('')}
              className='absolute right-2 top-2 rounded bg-gray-600/50 text-white'
            >
              <X size={16} strokeWidth={1} />
            </div>
          )}
          {/* image input */}
          <input
            id='image'
            type='file'
            className='hidden w-0'
            ref={imageRef}
            onChange={onImageChange}
          />
        </div>
        <Form {...form}>
          <form
            className='flex flex-col gap-5'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='grid w-full grid-cols-2 gap-5'>
              {applyJobFormFields.map(
                ({ label, name, placeholder, type, colSpan }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as FiledNameType}
                    render={({ field }) => (
                      <FormItem className={`${colSpan ? 'col-span-2' : ''}`}>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={placeholder}
                            {...field}
                            type={type}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ),
              )}

              <CustomSelect
                className='col-span-2'
                label='Gender'
                options={genders}
                selectedOption={gender}
                onSelectionChange={onGenderChange}
              />
            </div>
            <Button disabled={isLoading}>Apply</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
