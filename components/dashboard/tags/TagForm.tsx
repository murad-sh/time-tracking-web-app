import React from 'react';
import { tagSchema, TagSchemaType } from '@/lib/validations/tag';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { createTag } from '@/lib/user-actions';
import { toast } from 'sonner';
import { useTags } from '@/hooks/use-api-hooks';
import styles from '../SharedStyles.module.scss';

interface TagFormProps {
  afterSave: () => void;
}

const TagForm = ({ afterSave }: TagFormProps) => {
  const { tags, mutate } = useTags();

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
    const { tag } = enteredData;
    if (tags?.includes(tag)) {
      setError('tag', {
        type: 'manual',
        message: 'Tag already exists',
      });
      return;
    }
    try {
      await createTag(tag);
      toast.success('Tag saved successfully');
      mutate();
    } catch (error) {
      toast.error('An error occurred. Please try again');
    }
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
          <span className={styles.error}>
            {errors.root.serverError.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default TagForm;
