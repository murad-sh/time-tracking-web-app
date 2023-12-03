import React from 'react';
import { tagSchema, TagSchemaType } from '@/lib/validations/tag';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { createTag, editTag } from '@/lib/utils/services';
import { toast } from 'sonner';
import { useTags } from '@/hooks/use-api-hooks';
import styles from '../SharedStyles.module.scss';
import Loader from '@/components/ui/Loader';

interface TagFormProps {
  afterSave: () => void;
  operationType: 'create' | 'edit';
  initialTag?: string;
}

const TagForm = ({ afterSave, operationType, initialTag }: TagFormProps) => {
  const { tags, mutate } = useTags();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TagSchemaType>({
    resolver: zodResolver(tagSchema),
    mode: 'all',
    defaultValues: operationType === 'edit' ? { tag: initialTag } : { tag: '' },
  });

  async function onSubmit(enteredData: TagSchemaType) {
    const { tag } = enteredData;
    if (operationType === 'edit' && tag === initialTag) {
      afterSave();
      return;
    }
    if (tags?.includes(tag)) {
      setError('tag', {
        type: 'manual',
        message: 'Tag already exists',
      });
      return;
    }

    try {
      if (operationType === 'create') {
        await createTag(tag);
        toast.success('Tag created successfully');
      } else {
        await editTag(initialTag as string, tag);
        toast.success('Tag updated successfully');
      }
      mutate();
      reset();
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
        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader />
          ) : operationType === 'create' ? (
            'Create'
          ) : (
            'Update'
          )}
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
