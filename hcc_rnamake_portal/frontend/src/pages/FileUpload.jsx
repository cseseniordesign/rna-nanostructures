import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

/**
 * Page for File Upload (deprecated?)
 * @returns File Upload Component via SearchTable
 */

/**
 * SearchTable is a searchable table containing files names, uploader names, and the data uploaded
 * @returns SearchTable component
 */
function SearchTable() {
    function createData(filename, user, uploadTime) {
        return {filename, user, uploadTime};
    }

    var search ='';
    
    /* Temporary dummy data */
    var rows = [
        createData("file(1).txt", "default-admin", (new Date()).toString()),
        createData("file.txt", "default-admin", (new Date()).toString()),
    ];

    /* Handles changes in the search box */
    const handleSearch = (event) => {
        event.preventDefault();
        search = event.target.value;
    };

    function fitsSearch(val) {
        return val.filename.includes(search);
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="FileUploadHeader">
            <TableRow>
                <TableCell colSpan={2}>
                    <label htmlFor="search">
                        Search Files: &nbsp; &nbsp; 
                        <input type="text" id="search" onChange={() => handleSearch} />
                    </label>
                </TableCell>
                <TableCell colSpan={2}>
                    <label htmlFor="search">
                        Upload Files: &nbsp; &nbsp; 
                        <input type="file" id="file" multiple/>
                    </label>
                </TableCell>
            </TableRow>
            <TableRow>
              <TableCell><b>File Name</b></TableCell>
              <TableCell align="right"><b>User</b></TableCell>
              <TableCell align="right"><b>Upload Time</b></TableCell>
              <TableCell align="right"><b>Download File</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Fills rows with items in the rows array that satisfy fitSearch */}
            {rows.filter(fitsSearch).map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              > 
                <TableCell>{row.filename}</TableCell>
                <TableCell align="right">{row.user}</TableCell>
                <TableCell align="right">{row.uploadTime}</TableCell>
                <TableCell align="right"><a href="..\graphics\helix.svg">Download</a></TableCell> {/* Will be actual file from cloud */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function FileUpload() {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
    return (
        <div className="file-upload">
            <div className="container">
                <div className="row align-items-center my-5"> 
                    <h1 className="font-weight-light">Upload Files to Cloud</h1>
                </div>
                <div className="row align-items-center my-5">
                    <SearchTable></SearchTable>
                </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
              </Alert>
            </Snackbar>
        </div>
    );
}

export default FileUpload;
