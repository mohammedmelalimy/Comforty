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
import { Loader } from 'lucide-react';

interface Props {
  dict: any;
  lang: string;
}

const RegisterPage = ({ dict, lang }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = dict.auth.register;

  const registerSchema = z
    .object({
      name: z.string().min(2, t.errors.name_min),
      email: z.string().email(t.errors.email_invalid),
      password: z
        .string()
        .min(6, t.errors.password_min)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, t.errors.password_regex),
      rePassword: z.string(),
      phone: z.string().min(10, t.errors.phone_min).regex(/^\d+$/, t.errors.phone_digits)
    })
    .refine((data) => data.password === data.rePassword, {
      message: t.errors.password_mismatch,
      path: ['rePassword']
    });

  type RegisterForm = z.infer<typeof registerSchema>;

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', rePassword: '', phone: '' },
    mode: 'onTouched'
  });

  const onSubmit = async (values: RegisterForm) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
      const data = await res.json();

      if (data.message === 'success') {
        toast.success(t.toast_success);
        router.push(`/${lang}/login`);
      } else {
        toast.error(data.message || t.toast_error);
      }
    } catch (error) {
      toast.error('Connection error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 mt-10">
      <div className="bg-white dark:bg-neutral-900 shadow-2xl rounded-3xl w-full max-w-md p-10 border border-gray-100 dark:border-neutral-800">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-neutral-100 mb-6">
          {t.title}
        </h2>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {['name', 'email', 'phone', 'password', 'rePassword'].map((id) => (
              <FormField
                key={id}
                control={form.control}
                name={id as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="dark:text-neutral-200">{t[`${id}_label`]}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={id.toLowerCase().includes('password') ? 'password' : 'text'}
                        placeholder={t[`${id}_placeholder`]}
                        disabled={isLoading}
                        className="rounded-xl dark:bg-neutral-800 dark:border-neutral-700"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            ))}

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 py-6 rounded-xl font-bold mt-4 cursor-pointer"
            >
              {isLoading ? <Loader className="animate-spin" /> : t.submit_button}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default RegisterPage;
