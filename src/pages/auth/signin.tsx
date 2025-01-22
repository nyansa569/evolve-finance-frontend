import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react'
import { useForm } from 'react-hook-form';

function SigninPage() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  return (
    <div className='w-full'>
      <section className='w-[80%] mx-auto'>
        <h2 className='font-semibold text-2xl'>Login</h2>
        <Form {...form}>
              <form className='w-[400px] py-8 space-y-4'>
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem
                              className='flex-1'
                          >
                              <FormLabel>Your Name</FormLabel>
                              <div className='bg-white'>
                                  <FormControl>
                                      <Input
                                          placeholder="Email" {...field} 
                                          className='w-full'
                                      />
                                  </FormControl>
                              </div>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem
                              className='flex-1'
                          >
                              <FormLabel>Email</FormLabel>
                              <div className='bg-white'>
                                  <FormControl>
                                      <Input
                                          placeholder="Email" {...field} 
                                          className='w-full'
                                      />
                                  </FormControl>
                              </div>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem
                              className='flex-1'
                          >
                              <FormLabel>Password</FormLabel>
                              <div className='bg-white'>
                                  <FormControl>
                                      <Input
                                          placeholder="Password" {...field} 
                                          className='w-full'
                                      />
                                  </FormControl>
                              </div>
                              <FormMessage />
                          </FormItem>
                      )}
                  />

                  <Button
                      variant="primary"
                      className='w-full py-6'
                  >
                      Sign in
                  </Button>
              </form>
          </Form>
      </section>
    </div>
  )
}

export default SigninPage