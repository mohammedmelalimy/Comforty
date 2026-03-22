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

const resetPasswordSchema = z.object({
  email: z.email('Invalid email address'),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      'Password must contain at least one letter and one number'
    )
});

type resetPassword = z.infer<typeof resetPasswordSchema>;

const Page = () => {
  const Router = useRouter();
  const form = useForm<resetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '', newPassword: '' },
    mode: 'onTouched'
  });

  const onSubmit = async (values: resetPassword) => {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
      method: 'Put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      toast.success('Password successfully reset');
      Router.push('/login');
    } else {
      toast.error('Invalid Email or Password');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 mt-20">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 border border-gray-100 animate-fadeIn">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">Reset Password</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Please enter your email and new password to reset your account password
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">NewPassword</FormLabel>
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
            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl text-lg font-semibold transition transform hover:scale-[1.02]"
            >
              Reset Password
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
