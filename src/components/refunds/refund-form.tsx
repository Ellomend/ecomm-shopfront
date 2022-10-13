import Button from '@/components/ui/button';
import FileInput from '@/components/ui/forms/file-input';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Label from '@/components/ui/forms/label';
import TextArea from '@/components/ui/forms/text-area';
import { useModalState } from '@/components/ui/modal/modal.context';
import { useCreateRefund } from '@/framework/order';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

interface Props {
  loading: boolean;
  onSubmit: (values: any) => void;
}
interface FormValues {
  title: string;
  description: string;
  images: File[];
}
const refundFormSchema:any = yup.object().shape({
  title: yup.string().required('error-title-required'),
  description: yup.string().required('error-description-required'),
});
export const RefundForm = ({ loading, onSubmit }: Props) => {
  const { t } = useTranslation('common');

  return (
    <div className="py-6 px-5 sm:p-8 bg-light w-screen md:max-w-[480px] min-h-screen md:min-h-0 h-full md:h-auto flex flex-col justify-center md:rounded-xl">
      <h1 className="mb-5 text-lg font-semibold text-center text-heading sm:mb-6">
        {t('text-add-new')} {t('text-refund')}
      </h1>
    </div>
  );
};

const CreateRefund = () => {
  const { createRefundRequest, isLoading } = useCreateRefund();
  const { data } = useModalState();
  function handleRefundRequest({ title, description, images }: any) {
    createRefundRequest({
      order_id: data,
      title,
      description,
      images,
    });
  }
  // need to handle server error
  return <RefundForm onSubmit={handleRefundRequest} loading={isLoading} />;
};

export default CreateRefund;
