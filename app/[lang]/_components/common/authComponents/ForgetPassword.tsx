'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  dict: any;
  lang: string;
}

const ForgetPassword = ({ dict, lang }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = dict.auth.forget;

  const forgetPasswordSchema = z.object({
    email: z.string().min(1, t.errors.required).email(t.errors.invalid)
  });

  type ForgetForm = z.infer<typeof forgetPasswordSchema>;

  const form = useForm<ForgetForm>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onTouched'
  });

  const onSubmit = async (values: ForgetForm) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      const data = await res.json();

      if (data.statusMsg === 'success') {
        toast.success(t.toast_success);
        router.push(`/${lang}/reset-code`);
      } else {
        toast.error(t.toast_error);
      }
    } catch (error) {
      toast.error(t.toast_network_error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 mt-20">
      <div className="bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-teal-900/10 rounded-3xl w-full max-w-md p-10 border border-gray-100 dark:border-neutral-800 animate-fadeIn transition-colors duration-300">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-neutral-100 mb-3">
          {t.title}
        </h2>
        <p className="text-center text-gray-500 dark:text-neutral-400 mb-8 text-sm">{t.subtitle}</p>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium dark:text-neutral-200">
                    {t.email_label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="email"
                      placeholder={t.email_placeholder}
                      className="rounded-xl border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 rounded-xl text-lg font-semibold transition transform hover:scale-[1.02] disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                t.submit_button
              )}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ForgetPassword;
