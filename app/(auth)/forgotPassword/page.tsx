'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const forgetPasswordSchema = z.object({
  email: z.string().email('Invalid email address')
});

type ForgetForm = z.infer<typeof forgetPasswordSchema>;

const Page = () => {
  const router = useRouter();

  const form = useForm<ForgetForm>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onTouched'
  });

  const onSubmit = async (values: ForgetForm) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/forgotPasswords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = await res.json();

      if (data.statusMsg === 'success') {
        toast.success('Reset code sent successfully!');
        router.push('/resetcode');
      } else {
        toast.error('Email not found or invalid.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 mt-20">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 border border-gray-100 animate-fadeIn">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">Forget Password</h2>

        <p className="text-center text-gray-500 mb-8 text-sm">
          No worries! Enter your email below and we will send you a reset code.
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

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl 
                text-lg font-semibold transition transform hover:scale-[1.02]"
            >
              Send Reset Code
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
