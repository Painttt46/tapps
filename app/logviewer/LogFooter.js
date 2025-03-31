"use client";
import { Button, Typography, Box } from '@mui/material';

export default function Footer({ paginationModel, handleSkipPageChange, totalPages, handlePaginationModelChange, pageSkip, setPageSkip }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {/* Previous Button */}
            <Button
                onClick={() => handleSkipPageChange(-1)}
                disabled={paginationModel.page <= 0}
                sx={{ marginRight: '8px' }}
            >
                Previous
            </Button>

            {/* Page Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ marginRight: '2px' }}>
                    Page{paginationModel.page + 1}
                </Typography>
                <Typography variant="body2" sx={{ marginLeft: '5px', marginRight: '5px' }}>
                    of
                </Typography>
                <Typography variant="body2">
                    {totalPages}
                </Typography>
            </Box>



            {/* Next Button */}
            <Button
                onClick={() => handleSkipPageChange(1)}
                disabled={paginationModel.page >= totalPages - 1}
            >
                Next
            </Button>

            {/* Rows per page selection */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ marginRight: '10px' }}>
                    Rows:
                </Typography>
                <select
                    value={paginationModel.pageSize}
                    onChange={(e) => handlePaginationModelChange({ ...paginationModel, pageSize: Number(e.target.value) })}
                >
                    {[10, 25, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            {size} rows
                        </option>
                    ))}
                </select>
            </Box>

            {/* Page skip selection */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ marginRight: '10px' , marginLeft: '10px'}}>
                    Skip:
                </Typography>
                <select
                    value={pageSkip}
                    onChange={(e) => setPageSkip(Number(e.target.value))}
                >
                    {[1, 10, 100].map((size) => (
                        <option key={size} value={size}>
                            {size} pages
                        </option>
                    ))}
                </select>
            </Box>
        </Box>

    );
}
