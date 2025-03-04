import HeaderTitle from '@/components/shared/title'
import Typography from '@/components/shared/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Camera, PenLine } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import "./profile.css"
function ProfilePage() {
    const [isUpdate, setIsUpdate] = useState(false)
    const form = useForm({
        defaultValues: {
            name: "",
        },
    });
  return (
    <div className='w-full h-full py-8'>
        <section className='max-container lg:w-[80%] w-[90%] mx-auto pb-8 space-y-6'>
            <HeaderTitle title='My Profile' />
            <Card className='w-full py-8 px-10 flex justify-between items-center gap-5 border-2 border-accent-400 rounded-[2rem]'>
                <div className='flex items-center gap-4'>
                    <div className='p-7 bg-[#6B6B6B] rounded-full'>
                        <Camera size={32} color='#000' />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <Typography typo="header-5-semibold">Urban Plug</Typography>
                        <Typography typo="body-small-medium">Type of business</Typography>
                    </div>
                </div>

                <Button
                    variant="outline"
                    className='flex items-center gap-2'
                >
                    Edit
                    <PenLine size={18} />
                </Button>
            </Card>

            <Card className='w-full border-2 border-accent-400'>
                <CardHeader className='w-full flex flex-row justify-between items-center'>
                    <CardTitle className='text-2xl'>Personal Information</CardTitle>
                    <Button
                        variant="outline"
                        className='w-fit flex items-center gap-2'
                    >
                        Edit
                        <PenLine size={18} />
                    </Button>
                </CardHeader>
                <CardContent className='w-full'>
                    <Form {...form}>
                    <form className='flex justify-between gap-12 space-y-6 text-accent-50'>
                        <div className='flex-1 space-y-16'>
                            <div className='flex justify-between items-center gap-4'>
                                <span className='flex-1'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem
                                                className='flex-1'
                                            >
                                                <div className=''>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="First Name" {...field} 
                                                            className='w-full py-2'
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </span>
                                <span className='flex-1'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem
                                                className='flex-1 text-white'
                                            >
                                                <div className=''>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Last Name" {...field} 
                                                            className='w-full py-2 '
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </span>
                            </div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem
                                        className='flex-1 text-white'
                                    >
                                        <div className=''>
                                            <FormControl>
                                                <Input
                                                    placeholder="hellomrsam101@gmail.com" {...field} 
                                                    className='w-full py-2'
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
                                        className='flex-1 text-white'
                                    >
                                        <div className=''>
                                            <FormControl>
                                                <Input
                                                    placeholder="+233 50 051 1393" {...field} 
                                                    className='w-full py-2'
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='w-[45%]'>
                            <FormField
                                control={form?.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea 
                                            rows={10} {...field}
                                            placeholder='Bio...'
                                        />
                                    </FormControl>
                                </FormItem>
                                )}
                            />
                        </div>
                    </form>
                    </Form>
                </CardContent>
            </Card>
            <Card className='w-full border-2 border-accent-400'>
                <CardHeader className='w-full flex flex-row justify-between items-center'>
                    <CardTitle className='text-2xl'>Address</CardTitle>
                    <Button
                        variant="outline"
                        className='w-fit flex items-center gap-2'
                    >
                        Edit
                        <PenLine size={18} />
                    </Button>
                </CardHeader>
                <CardContent className='w-full'>
                    <Form {...form}>
                    <form className='flex justify-between gap-12 space-y-6 text-accent-50'>
                        <div className='w-[60%] space-y-16'>
                            <div className='flex justify-between items-center gap-4'>
                                <span className='flex-1'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem
                                                className='flex-1'
                                            >
                                                <div className=''>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Country" {...field} 
                                                            className='w-full py-2'
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </span>
                                <span className='flex-1'>
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem
                                                className='flex-1 text-white'
                                            >
                                                <div className=''>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="City / State" {...field} 
                                                            className='w-full py-2 '
                                                        />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </span>
                            </div>
                        </div>
                        
                    </form>
                    </Form>
                </CardContent>
            </Card>
            <div className='w-full flex justify-end'>
                <div className='w-fit py-2 flex items-center gap-4 text-accent-100 border-2 border-accent-400 rounded-xl'>
                    <button className='px-3 text-red-600 font-semibold'>Cancel</button>
                    <span className='text-accent-300'>|</span>
                    <button 
                        onClick={() => setIsUpdate(!isUpdate)}
                        className='px-3 text-green-600 font-semibold'>{isUpdate ? "Update" : "Create"}</button>
                </div>
            </div>
        </section>
    </div>
  )
}

export default ProfilePage