import React from 'react';
import numeral from 'numeral';
import { alpha } from '@mui/material/styles';
import { Box, Paper, Typography } from '@mui/material';

interface RejectionFilesProps {
    fileRejections: Array<{ file: File; errors: Array<{ code: string; message: string }> }>;
}

function fData(number: number): string {
    return numeral(number).format('0.0 b');
}

const RejectionFiles: React.FC<RejectionFilesProps> = ({ fileRejections }) => {
    return (
        <Paper
            variant="outlined"
            sx={{
                py: 1,
                px: 2,
                mt: 3,
                borderColor: 'error.light',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            }}
        >
            {fileRejections.map(({ file, errors }) => {
                const { path, size } = file;

                return (
                    <Box key={path} sx={{ my: 1 }}>
                        <Typography variant="subtitle2" noWrap>
                            {path} - {fData(size)}
                        </Typography>

                        {errors.map((error) => (
                            <Typography key={error.code} variant="caption" component="p">
                                {error.message === 'File is larger than 100000000 bytes'
                                    ? 'Bạn chỉ cập nhật được tài liệu dưới 100MB'
                                    : error.message}
                            </Typography>
                        ))}
                    </Box>
                );
            })}
        </Paper>
    );
};

export default RejectionFiles;
