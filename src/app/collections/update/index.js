import React from "react";
import { GET_COLLECTION } from "@/graphql/queries/collections";
import { useParams } from "react-router";
import { useMutation } from "@/utils/hooks";
import { ColGrid, Header, QueryWrapper, RowGrid } from "@/components/Template";
import { DELETE_COLLECTION, UPDATE_COLLECTION } from "@/graphql/mutations/collections";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { getErrors, PublishForm, SaveButton, SeoForm } from "@/components/form";
import { FormGeneralInformation } from "@/app/collections/components";
import { BackgroundImage } from "./BackgroundImage";

const Base = ({ collection }) => {
  const [update] = useMutation(UPDATE_COLLECTION);
  const { enqueueSnackbar } = useSnackbar();

  const deleteProps = {
    mutation: DELETE_COLLECTION,
    id: collection.id,
    name: collection.name,
    field: "collectionDelete",
  };

  const methods = useForm({
    defaultValues: {
      name: collection.name,
      description: collection.description,
      seo: {
        title: collection.seoTitle,
        description: collection.seoDescription,
      },
      isPublished: collection.isPublished,
      publicationDate: collection.publicationDate,
      backgroundImageAlt: collection?.backgroundImage?.alt || "",
    },
  });
  const {
    setError,
    formState: { isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = async (data) => {
    const result = await update({ variables: { id: collection.id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        collectionUpdate: { collection: updatedCollection, errors },
      },
    } = result;

    if (errors.length > 0) {
      setError(getErrors(errors));
    } else {
      enqueueSnackbar(`Collection ${data.name} successfully updated.`, {
        variant: "success",
      });
      reset({
        name: updatedCollection.name,
        description: updatedCollection.description,
        seo: {
          title: updatedCollection.seoTitle,
          description: updatedCollection.seoDescription,
        },
        backgroundImageAlt: updatedCollection?.backgroundImage?.alt || "",
        isPublished: updatedCollection.isPublished,
        publicationDate: updatedCollection.publicationDate,
      });
    }
  };

  return (
    <>
      <Header title={collection.name} />
      <ColGrid>
        <RowGrid>
          <FormGeneralInformation {...methods} />
          <BackgroundImage
            {...methods}
            id={collection.id}
            image={collection.backgroundImage}
            update={update}
            enqueueSnackbar={enqueueSnackbar}
          />
          <SeoForm {...methods} />
        </RowGrid>
        <RowGrid>
          <PublishForm {...methods} publicationDateData={collection.publicationDate} />
        </RowGrid>
      </ColGrid>
      <SaveButton
        deleteProps={deleteProps}
        onSubmit={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={!isDirty}
      />
    </>
  );
};

export default () => {
  const { id } = useParams();

  return (
    <QueryWrapper query={GET_COLLECTION} id={id} fieldName="collection">
      {(data) => <Base collection={data.collection} />}
    </QueryWrapper>
  );
};
