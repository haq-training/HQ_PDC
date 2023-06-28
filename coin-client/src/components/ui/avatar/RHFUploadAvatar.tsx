import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { useFormContext, Controller, FieldError } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';
import UploadAvatar, { UploadAvatarProps } from '@/components/ui/avatar/UploadAvatar';

type RHFUploadAvatarProps = {
    name: string;
};

function RHFUploadAvatar({ name, ...other }: InferProps<RHFUploadAvatarProps>): JSX.Element {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }: { field: any; fieldState: { error: FieldError | undefined } }) => {
                const checkError = !!error && !field.value;
                return (
                    <div>
                        <UploadAvatar error={checkError} {...other} file={field.value} />
                        {checkError && (
                            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                                {error.message}
                            </FormHelperText>
                        )}
                    </div>
                );
            }}
        />
    );
}

RHFUploadAvatar.propTypes = {
    name: PropTypes.string.isRequired,
};

export default RHFUploadAvatar;
