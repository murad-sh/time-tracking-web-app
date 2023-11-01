import React from 'react';
import { tagSchema, TagSchemaType } from '@/lib/validations/tag';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './AddTag.module.scss';
import PrimaryButton from '@/components/ui/PrimaryButton';

const AddTag = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TagSchemaType>({
    resolver: zodResolver(tagSchema),
    mode: 'all',
  });

  return (
    <div>
      <form>
        <div className={styles.control}>
          <label htmlFor="tagName">New Tag</label>
          <input
            {...register('tagName')}
            type="text"
            id="tagName"
            placeholder="Tag Name"
          />
        </div>
        {errors.tagName && (
          <p className={styles.error}>{`${errors.tagName.message}`}</p>
        )}
        <div className={styles.control}>
          <PrimaryButton type="submit">Create</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default AddTag;
