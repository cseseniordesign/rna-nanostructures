import React from "react";
// import { Button } from '../components/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/**
 * FileUpload Page is not currently in use, but could be modified to maintain cloud uploads
 */

/**
 * SearchTable()
 * @returns a searchable table with manually entered data
 */
function SearchTable() {
    /**
     * Creates data in the correct format for the table
     * @param {*} filename 
     * @param {*} user 
     * @param {*} uploadTime 
     * @returns 
     */
    function createData(filename, user, uploadTime) {
        return {filename, user, uploadTime};
    }

    var search ='';
    
    // Test Data
    var rows = [
        createData("file(1).txt", "default-admin", (new Date()).toString()),
        createData("file.txt", "default-admin", (new Date()).toString()),
    ];

    const handleSearch = (event) => {
        event.preventDefault();
        search = event.target.value;
    };
    
    /**
     * fitsSearch(val)
     * @param {int} val search query
     * @returns a boolean regarding if a filename includes a search term
     */
    function fitsSearch(val) {
        return val.filename.includes(search);
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="FileUploadHeader">
            <TableRow>
                <TableCell colSpan={2}>
                    {/* Search Box */}
                    <label htmlFor="search">
                        Search Files: &nbsp; &nbsp; 
                        <input type="text" id="search" onChange={() => handleSearch} />
                    </label>
                </TableCell>
                <TableCell colSpan={2}>
                    <label htmlFor="search">
                        {/* File Upload */}
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
            {/* Dynamically fills table with information that fits the search from the element `rows` */}
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

/**
 * FileUpload()
 * @returns formatted Search Table
 */
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
        </div>
    );
}

export default FileUpload;
