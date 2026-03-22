'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Password must contain at least one letter and one number'
    )
});

type LoginForm = z.infer<typeof loginSchema>;

const Page = () => {
  const Router = useRouter();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched'
  });

  const onSubmit = async (values: LoginForm) => {
    // const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signin`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values)
    // });
    // const data = await res.json();

    // if (data.message === 'success') {
    //   toast.success('Login successful');
    //   Router.push('/');
    // } else {
    //   toast.error('Invalid Email or Password');
    // }
    const data = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
      // callbackUrl: '/'
    });
    if (data?.ok) {
      toast.success('Login successful');
      Router.push('/');
    } else {
      toast.error('Invalid Email or Password');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 mt-20">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 border border-gray-100 animate-fadeIn">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">Welcome Back 👋</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Please sign in to continue to your account
        </p>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-xl border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-600 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="rounded-xl border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-600 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            {/* Links */}
            <div className="flex justify-between items-center text-sm mt-1">
              <Link href="/register" className="text-teal-700 hover:underline">
                Create Account
              </Link>
              <Link href="/forgotPassword" className="text-teal-700 hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl text-lg font-semibold transition transform hover:scale-[1.02] cursor-pointer"
            >
              Login
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
