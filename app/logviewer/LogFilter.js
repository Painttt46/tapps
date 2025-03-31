"use client";
import { Menu, MenuItem, FormControlLabel, Checkbox, Button, Box, TextField, Grid } from '@mui/material';


export default function Filter({ columns, filterVisibility, toggleFilterVisibility, filters, handleFilterChange, resetFilters, handleClickFilterMenu, filterMenuOpen, handleCloseFilterMenu, anchorEl }) {
  return (
    <Box sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
      {/* Select Filter and Reset Filters on the same row */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginBottom: 2 }}>
        <Button
          variant="outlined"
          onClick={handleClickFilterMenu}
          sx={{
            marginRight: 2,
            backgroundColor: '#1976d2', // Blue tone background color
            color: 'white', // White text color
            '&:hover': {
              backgroundColor: '#1565c0', // Darker blue on hover
            },
          }}
        >
          Select Filter
        </Button>

        <Button
          variant="outlined"
          onClick={resetFilters}
          sx={{
            backgroundColor: '#1976d2', // Blue tone background color
            color: 'white', // White text color
            '&:hover': {
              backgroundColor: '#1565c0', // Darker blue on hover
            },
          }}
        >
          Reset Filters
        </Button>
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={anchorEl}
        open={filterMenuOpen}
        onClose={handleCloseFilterMenu}
        PaperProps={{
          style: {
            width: 200,
            maxHeight: 250, // Set max height for the dropdown list
            overflowY: 'auto', // Enable vertical scrolling if the list exceeds maxHeight
          },
        }}
        anchorOrigin={{
          vertical: 'top',  // Attach the menu to the top of the button
          horizontal: 'center', // Center the menu horizontally to the button
        }}
        transformOrigin={{
          vertical: 'bottom', // Position the menu above the button
          horizontal: 'center', // Center the menu horizontally
        }}
        sx={{
          marginTop: '-15px', // Add space between the menu and the button
        }}
      >
        {columns.map((col) => (
          <MenuItem key={col.field}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filterVisibility[col.field] || false}
                  onChange={() => toggleFilterVisibility(col.field)}
                />
              }
              label={col.headerName}
            />
          </MenuItem>
        ))}
      </Menu>

      {/* Filter Inputs (TextField) */}
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={1}>
          {columns.map(
            (col) =>
              filterVisibility[col.field] && (
                <Grid item xs={2.4} key={col.field}>
                  <TextField
                    label={`Filter by ${col.headerName}`}
                    value={filters[col.field] || ''}
                    onChange={(e) => handleFilterChange(col.field, e.target.value)}
                    fullWidth
                    sx={{
                      marginBottom: 1,
                      '& .MuiInputBase-root': {
                        fontSize: '0.875rem',
                      },
                      '& .MuiFormLabel-root': {
                        fontSize: '0.875rem',
                      },
                      '& .MuiOutlinedInput-root': {
                        height: '48px', // Adjust input height if needed
                      },
                    }}
                  />
                </Grid>
              )
          )}
        </Grid>
      </Box>
    </Box>
  );
}
