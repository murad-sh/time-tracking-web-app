import React from 'react';
import { tagSchema, TagSchemaType } from '@/lib/validations/tag';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './TagForm.module.scss';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { createTag } from '@/lib/user-actions';
import { useSWRConfig } from 'swr';
import { toast } from 'sonner';

interface TagFormProps {
  afterSave: () => void;
}

const TagForm = ({ afterSave }: TagFormProps) => {
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TagSchemaType>({
    resolver: zodResolver(tagSchema),
    mode: 'all',
  });

  async function onSubmit(enteredData: TagSchemaType) {
    try {
      await createTag(enteredData.tag);
      toast.success('Tag saved successfully');
    } catch (error) {
      toast.error('An error occurred. Please try again');
    }
    mutate('/api/tags');
    afterSave();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.control}>
        <input {...register('tag')} type="text" placeholder="Tag Name" />
      </div>
      {errors.tag && <p className={styles.error}>{`${errors.tag.message}`}</p>}
      <div className={styles.action}>
        <PrimaryButton
          type="submit"
          className={isSubmitting ? styles.submitting : ''}
        >
          Create
        </PrimaryButton>
        {errors.root?.serverError && (
          <p className={styles.error}>{errors.root.serverError.message}</p>
        )}
      </div>
    </form>
  );
};

export default TagForm;
