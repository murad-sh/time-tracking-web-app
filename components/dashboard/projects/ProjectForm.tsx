import React from 'react';
import { projectSchema, ProjectSchemaType } from '@/lib/validations/project';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { createProject, editProject } from '@/lib/utils/services';
import { toast } from 'sonner';
import { useProjects } from '@/hooks/use-api-hooks';
import { IProject } from '@/models/project';
import styles from '../SharedStyles.module.scss';
import Loader from '@/components/ui/Loader';

interface ProjectFormProps {
  afterSave: () => void;
  operationType: 'create' | 'edit';
  initialProject?: IProject;
}

const ProjectForm = ({
  afterSave,
  operationType,
  initialProject,
}: ProjectFormProps) => {
  const { projects, mutate } = useProjects();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema),
    mode: 'all',
    defaultValues:
      operationType === 'edit'
        ? { projectTitle: initialProject?.projectTitle }
        : { projectTitle: '' },
  });

  async function onSubmit(enteredData: ProjectSchemaType) {
    const { projectTitle } = enteredData;
    if (
      operationType === 'edit' &&
      projectTitle === initialProject?.projectTitle
    ) {
      afterSave();
      return;
    }

    if (
      projects.some(
        (project: IProject) => project.projectTitle === projectTitle
      )
    ) {
      setError('projectTitle', {
        type: 'manual',
        message: 'A project with this title already exists.',
      });
      return;
    }

    try {
      if (operationType === 'create') {
        await createProject({ projectTitle });
        toast.success('Project saved successfully');
      } else {
        await editProject(initialProject!._id!.toString(), projectTitle);
        toast.success('Project updated successfully');
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

export default ProjectForm;
