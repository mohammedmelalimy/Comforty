'use client';

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Metadata } from 'next';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account 🚀 Join our community today and start your journey with us!'
};
// Define the Zod schema for form validation
const registerSchema = z
  .object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
        'Password must contain at least one letter and one number'
      ),
    rePassword: z.string().min(6, 'Confirm Password is required'),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .regex(/^\d+$/, 'Phone number must contain only digits')
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

const Page = () => {
  const Router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    mode: 'onTouched'
  });

  const onSubmit = async (values: RegisterFormValues) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const data = await res.json();
    if (data.message === 'success') {
      toast.success('Registration successful');
      Router.push('/login');
    } else {
      toast.error('Registration failed');
    }
    console.log(data);
  };

  return (
    <div className="min-h-[50vh] flex items-center justify-center mt-5 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register Now</h2>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1 text-sm" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1 text-sm" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter your password"
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1 text-sm" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Confirm your password"
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1 text-sm" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your phone number"
                      className="border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 mt-1 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
            >
              Register
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
