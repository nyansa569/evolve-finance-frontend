import HeaderTitle from '@/components/shared/title'
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { InvoiceModal } from './invoice-modal';

function CreateOrder() {
    const [openInvoice, setOpenInvoice] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
        },
    });
  return (
    <div className='w-full h-full py-8'>
        <section className='max-container lg:w-[80%] w-[90%] mx-auto pb-8'>
            <div className='md:pb-4 flex justify-between items-center gap-4'>
                <HeaderTitle title='Orders' />
            </div>
            <Form {...form}>
                <form className='py-8 lg:space-y-6 space-y-4 text-accent-50'>
                    <div className='flex sm:flex-row flex-col justify-between items-center 2xl:gap-16 sm:gap-8 gap-4'>
                        <span className='sm:flex-1 w-full'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem
                                        className='flex-1'
                                    >
                                        <FormLabel>Customer Name:</FormLabel>
                                        <div className=''>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter customer name" {...field} 
                                                    className='w-full py-1'
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </span>
                        <span className='sm:flex-1 w-full'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem
                                        className='flex-1'
                                    >
                                        <FormLabel>Contact</FormLabel>
                                        <div className=''>
                                            <FormControl>
                                                <Input
                                                    placeholder="Contact" {...field} 
                                                    className='w-full py-1'
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </span>
                    </div>
                    <div className='flex lg:flex-row flex-col justify-between items-center 2xl:gap-16 sm:gap-8 gap-4'>
                        <span className='lg:flex-1 w-full'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem
                                        className='flex-1'
                                    >
                                        <FormLabel>Location</FormLabel>
                                        <div className=''>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter location" {...field} 
                                                    className='w-full py-1'
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </span>
                        <span className='lg:flex-1 w-full flex sm:flex-row flex-col justify-between items-center sm:gap-6 gap-4'>
                            <span className='sm:flex-1 w-full'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem
                                            className='flex-1'
                                        >
                                            <FormLabel>Order Date</FormLabel>
                                            <div className=''>
                                                <FormControl>
                                                    <Input
                                                        type="datetime-local"
                                                        placeholder="Choose date" {...field} 
                                                        className='w-full py-1'
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </span>
                            <span className='sm:flex-1 w-full'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem
                                            className='flex-1'
                                        >
                                            <FormLabel>Delivery Date</FormLabel>
                                            <div className=''>
                                                <FormControl>
                                                    <Input
                                                        type="datetime-local"
                                                        placeholder="Choose date" {...field} 
                                                        className='w-full py-1'
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </span>
                        </span>
                    </div>
                    <div className='flex sm:flex-row flex-col justify-between items-center 2xl:gap-16 sm:gap-8 gap-4'>
                        <span className='sm:flex-1 w-full'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem
                                        className='flex-1'
                                    >
                                        <FormLabel>Product</FormLabel>
                                        <div className=''>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter location" {...field} 
                                                    className='w-full py-1'
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </span>
                        <span className='sm:flex-1 w-full flex xs:flex-row flex-col justify-between items-center xs:gap-6 gap-4'>
                            <span className='xs:flex-1 w-full'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem
                                        >
                                            <FormLabel>Price</FormLabel>
                                            <div className=''>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter price" {...field} 
                                                        className='w-full py-1'
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </span>
                            <span className='xs:flex-1 w-full'>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem
                                        >
                                            <FormLabel>Quantity</FormLabel>
                                            <div className=''>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter quantity" {...field} 
                                                        className='w-full py-1'
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </span>
                        </span>
                    </div>
                    <Button
                        variant="outline" 
                    >
                        Add order
                    </Button>
                </form>
            </Form>

            <div className='w-full pt-5 border-t'>
                <div className='w-full space-y-2 text-accent-50'>
                    <div className='flex justify-between items-center text-lg'>
                        <span>Subtotal</span>
                        <span className='text-xl font-medium'>$100.94</span>
                    </div>
                    <div className='flex justify-between items-center text-base'>
                        <span>Discount</span>
                        <span>15%</span>
                    </div>
                    <div className='pb-2 flex justify-between items-center text-base'>
                        <span>Platform fees</span>
                        <span>2.50</span>
                    </div>
                    <div className='w-full pt-2 border-t border-accent-400 flex justify-between items-center text-lg'>
                        <span>Total</span>
                        <span className='text-xl font-medium'>$1500.32</span>
                    </div>
                </div>
            </div>
            <div className='w-full pt-6 flex items-center gap-4'>
                <Button
                    variant="primary"
                    onClick={() => setOpenInvoice(true)}
                    className='bg-gradient-to-r from-[#A69550] via-[#D9C368] to-[#A69550]'
                >
                    Send Invoice
                </Button>
                <Button
                    variant="outline"

                >
                    Cancel
                </Button>
            </div>
        </section>
        <InvoiceModal open={openInvoice} setOpen={setOpenInvoice} />
    </div>
  )
}

export default CreateOrder