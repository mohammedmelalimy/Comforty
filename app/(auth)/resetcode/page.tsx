'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from '../../../components/ui/input-otp';
import { FormField } from '../../../components/ui/form';

const resetCodeSchema = z.object({
  resetCode: z.string('Invalid Code')
});

type resetForm = z.infer<typeof resetCodeSchema>;

const Page = () => {
  const Router = useRouter();
  const form = useForm<resetForm>({
    resolver: zodResolver(resetCodeSchema),
    defaultValues: { resetCode: '' },
    mode: 'onTouched'
  });

  const onSubmit = async (values: resetForm) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/verifyResetCode`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    const data = await res.json();

    console.log(data);

    if (res.ok) {
      Router.push('/resetpassword');
    } else {
      toast.error('Invalid Code');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 mt-20">
      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 border border-gray-100 animate-fadeIn">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-3">Reset Code</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Please enter the reset code sent to your email and choose a new password to regain access
        </p>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex flex-col items-center justify-center"
          >
            <FormField
              control={form.control}
              name="resetCode"
              render={({ field }) => (
                <InputOTP {...field} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            {/* Code */}

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl text-lg font-semibold transition transform hover:scale-[1.02]"
            >
              Verify Code
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
