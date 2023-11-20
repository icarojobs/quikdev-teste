import React from "react";
import { Field, ErrorMessage } from "formik";
import { Label, TextInput } from 'flowbite-react';
import styled from "styled-components";

const ErrorStyled = styled.span`
  color: red;
  font-size: 14px;
`;

const RequiredLabel = styled.span`
  color: red;
`;

export const Input = ({ name, type = '', label, required, ...props}) => {
    return (
        <div className="flex flex-col w-full">
            <Label>
                {label?.toUpperCase() || name?.toUpperCase()}
                {required && <RequiredLabel>*</RequiredLabel>}
            </Label>
            <Field as={TextInput} name={name} type={type} {...props} />
            <ErrorMessage name={name} component={ErrorStyled} />
        </div>
    );
};