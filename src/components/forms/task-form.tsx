import { createTaskSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase';
import { useUserState } from '@/stores/auth.user';
import { toast } from 'sonner';
import FillLoading from '../shared/FillLoading';



interface Props {
  task?: string
  isEdit ?: boolean
  onClose?: () => void 
  handler: (values: z.infer<typeof createTaskSchema>) => Promise<void | null>
}

const TaskForm = ({task= "", handler} : Props) => {

    const [isLoading, setIsloading] = useState(false)
    
    const {user} = useUserState()

    const form = useForm<z.infer<typeof createTaskSchema>>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            task
        },
      });

        const onSubmit = async (values: z.infer<typeof createTaskSchema>) => {
            if(!user?.uid) return null
            setIsloading(true)
           const {task} = values 
           const promise = handler(values)

            toast.promise(promise, {
            loading: "Loading...",
            success: "Successfull",
            error: "Something went Wrong!",
           })
           
        }
  return (
    <>
    {isLoading && <FillLoading/>}
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            disabled={isLoading}
            name="task"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your Task!"
                    className='mt-2'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <div className='flex justify-end mt-3'>
                <Button type="submit" disabled={isLoading}>
                    Submit
                </Button>
            </div>
        </form>
   </Form>
    </>
  )
}

export default TaskForm