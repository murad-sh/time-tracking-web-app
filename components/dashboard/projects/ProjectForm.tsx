import React from 'react';
import { projectSchema, ProjectSchemaType } from '@/lib/validations/project';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { createProject } from '@/lib/utils/api-actions';
import { toast } from 'sonner';
import { useProjects } from '@/hooks/use-api-hooks';
import styles from '../SharedStyles.module.scss';

interface ProjectFormProps {
  afterSave: () => void;
}

const ProjectForm = ({ afterSave }: ProjectFormProps) => {
  const { projects, mutate } = useProjects();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    mode: 'all',
  });

  async function onSubmit(enteredData: ProjectSchemaType) {
    const { projectTitle } = enteredData;
    // TODO: add validation for project title existence
    // if (projects?.includes(tag)) {
    //   setError('tag', {
    //     type: 'manual',
    //     message: 'Tag already exists',
    //   });
    //   return;
    // }
    try {
      console.log(projectTitle);
      await createProject({ projectTitle });
      toast.success('Project saved successfully');
      mutate();
    } catch (error) {
      toast.error('An error occurred. Please try again');
    }
    afterSave();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.control}>
        <input
          {...register('projectTitle')}
          type="text"
          placeholder="Project Title"
        />
      </div>
      {errors.projectTitle && (
        <p className={styles.error}>{`${errors.projectTitle.message}`}</p>
      )}
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

export default ProjectForm;
