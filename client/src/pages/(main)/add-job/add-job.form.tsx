/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { addFromFields } from './add-form.data';
import { useState } from 'react';
import { ComboInput } from '@/components/shared/form/combo-input';
import { Textarea } from '@/components/ui/textarea';
import { useCreateJobMutation } from '@/redux/api/job';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  AddJobFormSchema,
  AddJobFormSchemaType,
} from '@/lib/validation/add-job-from-schema';

type FiledNameType =
  | 'title'
  | 'description'
  | 'salary'
  | 'vacancy'
  | 'experienceRequired';

export function AddJobFrom() {
  const form = useForm<AddJobFormSchemaType>({
    resolver: zodResolver(AddJobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      experienceRequired: '',
      salary: '',
      vacancy: '',
    },
  });

  const [skillsSets, setSkillsSet] = useState<Record<string, string>>({});
  const [createJob, { isLoading }] = useCreateJobMutation();

  const onAddSkillsSet = (skill: string) => {
    setSkillsSet((prevSkills) => {
      prevSkills[skill] = skill;
      return { ...prevSkills };
    });
  };

  const onRemoveSkill = (skill: string) => {
    setSkillsSet((prevSkills) => {
      delete prevSkills[skill];
      return { ...prevSkills };
    });
  };

  const onSubmit = async (data: AddJobFormSchemaType) => {
    try {
      if (Object.keys(skillsSets).length === 0)
        return toast.error(`At least select a skill`);
      const response = await createJob({
        title: data.title.trim(),
        description: data.description.trim(),
        salary: Number(data.salary),
        vacancy: Number(data.vacancy),
        skillsSet: Object.values(skillsSets),
        experienceRequired: Number(data.experienceRequired) || 0,
      }).unwrap();

      toast.success(response.message);
      form.reset();
      setSkillsSet({});
    } catch (err: any) {
      toast.error(err?.data?.message || 'something went wrong');
    }
  };

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='grid w-full grid-cols-2 gap-5'>
          {addFromFields.map(
            ({ label, name, placeholder, colSpan, textArea, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as FiledNameType}
                render={({ field }) => (
                  <FormItem className={`${colSpan ? 'col-span-2' : ''}`}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      {textArea ? (
                        <Textarea placeholder={placeholder} {...field} />
                      ) : (
                        <Input
                          placeholder={placeholder}
                          {...field}
                          type={type}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ),
          )}
          <ComboInput
            className='col-span-2'
            label='Skills Set'
            selected={skillsSets}
            onSelection={onAddSkillsSet}
            onRemoveSelection={onRemoveSkill}
            placeholder='Add Skills'
          />
        </div>

        <Button disabled={isLoading}>Create Job</Button>
      </form>
    </Form>
  );
}
