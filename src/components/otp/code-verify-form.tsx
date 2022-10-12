import Button from '@/components/ui/button';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { Form } from '@/components/ui/forms/form';
import * as yup from 'yup';
import { useTranslation } from 'next-i18next';

type OptCodeFormProps = {
  code: string;
};

interface OtpLoginFormForAllUserProps {
  onSubmit: (formData: any) => void;
  isLoading: boolean;
}

const otpLoginFormSchemaForExistingUser = yup.object().shape({
  code: yup.string().required('error-code-required'),
});

export default function OtpCodeForm({
  onSubmit,
  isLoading,
}: OtpLoginFormForAllUserProps) {
  const { t } = useTranslation('common');
  const { closeModal } = useModalAction();

  return (
    <div className="space-y-5 rounded border border-gray-200 p-5">
      <Form<OptCodeFormProps>
        onSubmit={onSubmit}
        validationSchema={otpLoginFormSchemaForExistingUser}
      >
        {({ control, formState: { errors } }) => (
          <>
            <div className="grid grid-cols-2 gap-5">
              <Button
                variant="outline"
                onClick={closeModal}
                className="hover:border-red-500 hover:bg-red-500"
              >
                {t('text-cancel')}
              </Button>
              <Button loading={isLoading} disabled={isLoading}>
                {t('text-verify-code')}
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
