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
import { useState } from 'react';
import { Loader } from 'lucide-react';

interface Props {
  dict: any;
  lang: string;
}

const LoginPage = ({ dict, lang }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = dict.auth.login;

  const loginSchema = z.object({
    email: z
      .string()
      .min(1, t.errors?.email_required || 'Required')
      .email(t.errors?.email_invalid || 'Invalid email'),
    password: z.string().min(6, t.errors?.password_min || 'Too short')
  });

  type LoginForm = z.infer<typeof loginSchema>;

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched'
  });

  const onSubmit = async (values: LoginForm) => {
    setIsLoading(true);
    try {
      const data = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (data?.ok) {
        toast.success(t.toast_success);
        router.push(`/${lang}`);
        router.refresh();
      } else {
        toast.error(t.toast_error);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 mt-10">
      <div className="bg-white dark:bg-neutral-900 shadow-2xl dark:shadow-teal-900/10 rounded-3xl w-full max-w-md p-10 border border-gray-100 dark:border-neutral-800 animate-fadeIn transition-colors duration-300">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-neutral-100 mb-3">
          {t.title}
        </h2>
        <p className="text-center text-gray-500 dark:text-neutral-400 mb-8 text-sm">{t.subtitle}</p>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
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
                      className="rounded-xl border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-600 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm font-medium" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium dark:text-neutral-200">
                    {t.password_label}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      type="password"
                      placeholder={t.password_placeholder}
                      className="rounded-xl border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-4 py-2 shadow-sm focus:ring-2 focus:ring-teal-600 transition-all"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm font-medium" />
                </FormItem>
              )}
            />

            {/* Links */}
            <div className="flex justify-between items-center text-sm mt-1">
              <Link
                href={`/${lang}/register`}
                className="text-teal-700 dark:text-teal-400 hover:underline font-medium"
              >
                {t.create_account}
              </Link>
              <Link
                href={`/${lang}/forgotPassword`}
                className="text-teal-700 dark:text-teal-400 hover:underline font-medium"
              >
                {t.forgot_password}
              </Link>
            </div>

            {/* Login Button مع Loading State */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white py-6 rounded-xl text-lg font-semibold transition transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? <Loader /> : t.submit_button}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LoginPage;
