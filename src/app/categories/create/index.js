import React, { useEffect } from "react";

import { useStoreActions } from "easy-peasy";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import { yupResolver } from "@hookform/resolvers";

import { useMutation } from "@/utils/hooks";

import { getErrors, SaveButton, Seo } from "@/components/_form";
import { Header } from "@/components/Header";
import { RowGrid } from "@/components/RowGrid";

import { CreateCategory } from "../mutations";
import { GeneralInformation, schema } from "../_form";

export default () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [create] = useMutation(CreateCategory);
  const setHeaderBackLabel = useStoreActions((actions) => actions.app.setHeaderBackLabel);

  const methods = useForm({
    defaultValues: {
      name: "",
      description: "{}",
      seo: {
        title: "",
        description: "",
      },
    },
    resolver: yupResolver(schema),
  });

  const {
    setError,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  useEffect(() => {
    if (id) {
      setHeaderBackLabel({
        label: "CATEGORIES",
        link: `/categories/${id}`,
      });
    }
    return () => setHeaderBackLabel(undefined);
  }, [id, setHeaderBackLabel]);

  const onSubmit = async (data) => {
    const result = await create({ variables: { parent: id, input: data } });
    if (result === undefined) return;

    const {
      data: {
        categoryCreate: { category, errors },
      },
    } = result;

    if (errors.length > 0) {
      getErrors(errors, setError);
    } else {
      enqueueSnackbar(`Category ${data.name} successfully created.`, {
        variant: "success",
      });
      navigate(`/categories/${category.id}`);
    }
  };

  return (
    <>
      <Header title="Create Category" />
      <RowGrid>
        <GeneralInformation {...methods} />
        <Seo {...methods} />
      </RowGrid>
      <SaveButton onSubmit={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isDirty} />
    </>
  );
};
