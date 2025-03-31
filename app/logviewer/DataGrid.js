import { useState, useEffect } from 'react';
import { Box, Paper, CircularProgress, Typography, Button, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Filter from './LogFilter';
import Footer from './LogFooter';
import { fetchLogsData } from './FetchData';
import Cookies from 'js-cookie';


export default function Page() {
  const accessToken = Cookies.get('accessToken');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [filters, setFilters] = useState({});
  const [filterVisibility, setFilterVisibility] = useState({});
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageSkip, setPageSkip] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [DialogOpen, setDialogOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);

  const columns = [
    { field: 'uuid_id', headerName: 'UUID ID', width: 300 },
    { field: 'catid', headerName: 'Cat ID', width: 130 },
    { field: 'hostip', headerName: 'Host IP', width: 180 },
    { field: 'hostport', headerName: 'Host Port', width: 180 },
    { field: 'typeid', headerName: 'Type ID', width: 130 },
    {
      field: 'detail',
      headerName: 'Detail (Raw JSON)',
      width: 600,
      renderCell: (params) => {
        const rawJSON = params.value;

        let formattedJSON = '';
        try {
          const jsonObject = JSON.parse(rawJSON);
          // Format the JSON and remove \n, and replace with line breaks
          formattedJSON = JSON.stringify(jsonObject, null, 2)
            .replace(/\\n/g, '\n') // Replace \\n with new lines
            .trim(); // Trim leading/trailing spaces
        } catch (error) {
          formattedJSON = rawJSON;
        }

        const handleClick = () => {
          setSelectedRow(params.row);
          setTooltipData(formattedJSON);
          setDialogOpen(true);
        };

        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              height: '100%',
            }}
            onClick={handleClick}
          >
            <Typography
              variant="body2"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textAlign: 'center',
              }}
            >
              {formattedJSON}
            </Typography>
          </Box>
        );
      },
    },
    { field: 'device_type', headerName: 'Device Type', width: 150 },
    { field: 'updated_at', headerName: 'Last Updated', width: 180 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rows = await fetchLogsData(accessToken);
        setData(rows);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (column, value) => {
    setFilters((prev) => ({ ...prev, [column]: value }));
  };

  const toggleFilterVisibility = (column) => {
    setFilterVisibility((prev) => ({
      ...prev,
      [column]: !prev[column],
    }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const filteredData = data.filter((row) => {
    return Object.keys(filters).every((column) => {
      return row[column]?.toString().toLowerCase().includes(filters[column]?.toString().toLowerCase());
    });
  });

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const handleSkipPageChange = (direction) => {
    let newPage = paginationModel.page + direction * pageSkip;
    const totalPages = Math.ceil(data.length / paginationModel.pageSize);

    if (newPage < 0) {
      newPage = 0;
    } else if (newPage >= totalPages) {
      newPage = totalPages - 1;
    }

    setPaginationModel((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const totalPages = Math.ceil(data.length / paginationModel.pageSize);

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedRow(null);
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      console.log('Copying to clipboard:', tooltipData);
      navigator.clipboard.writeText(tooltipData).then(() => {
        console.log('Copied to clipboard!');
        setOpenSnackbar(true);
      }).catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = tooltipData;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          console.log('Fallback: Copied to clipboard!');
          setOpenSnackbar(true);
        } else {
          console.error('Fallback: Failed to copy');
        }
      } catch (err) {
        console.error('Fallback error copying to clipboard:', err);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ height: 618, width: '100%', position: 'relative' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </div>
        ) : (
          <DataGrid
            rows={filteredData}
            columns={columns}
            getRowId={(row) => row.gridid}
            pagination
            paginationMode="client"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            hideFooter
            disableColumnFilter
            slots={{
              toolbar: GridToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
              },
            }}
            sx={{
              '.MuiDataGrid-columnHeaderTitle': {
                fontWeight: 800, // Apply bold font to column headers
                color: 'black',
              },
            }}
          />
        )}

        <Box sx={{
          position: 'absolute',
          bottom: -50,
          right: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: 'auto',
        }}>
          <Footer
            paginationModel={paginationModel}
            handleSkipPageChange={handleSkipPageChange}
            totalPages={totalPages}
            handlePaginationModelChange={handlePaginationModelChange}
            pageSkip={pageSkip}
            setPageSkip={setPageSkip}
          />
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Copied to clipboard!"
      />

      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: '-20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
          <Filter
            columns={columns}
            filterVisibility={filterVisibility}
            toggleFilterVisibility={toggleFilterVisibility}
            filters={filters}
            handleFilterChange={handleFilterChange}
            resetFilters={resetFilters}
            handleClickFilterMenu={(event) => {
              setAnchorEl(event.currentTarget);
              setFilterMenuOpen(true);
            }}
            filterMenuOpen={filterMenuOpen}
            handleCloseFilterMenu={() => setFilterMenuOpen(false)}
            anchorEl={anchorEl}
          />
        </Box>
      </Box>

      {/* Dialog component moved here */}
      <Dialog
        open={DialogOpen && selectedRow !== null}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 1,
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Formatted JSON
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ padding: '30px', maxHeight: '600px', overflow: 'auto', backgroundColor: '#f4f4f4' }}>
            <pre
              style={{
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                lineHeight: '1.8',
                fontSize: '16px',
                color: '#333',
                margin: '0',
              }}
            >
              {tooltipData}
            </pre>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            sx={{
              marginTop: 1,
              fontSize: '0.75rem',
              padding: '4px 8px',
              marginRight: '12px',
              marginBottom: '6px',
            }}
          >
            Copy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
