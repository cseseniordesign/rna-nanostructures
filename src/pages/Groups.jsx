import React from 'react';
import { TextField, FormLabel, Select, Radio, FormControl, FormControlLabel, RadioGroup, Card, MenuItem, InputLabel } from '@mui/material';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Paper } from '@mui/material';
import { Button } from '../components/Button';

function AddGroupCard() {
    return (
        <Card
            component="form"
            sx={{
                '& > :not(style)': { m: 2, mt: 4, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <FormLabel>Add Group</FormLabel>
            <TextField id="outlined-basic" required="true" variant="outlined" label="Group Name">
            </TextField>
            <TextField id="outlined-basic" required="true" multiline rows={4} variant="outlined" label="Add Users"
                helperText="Type users' ID separated by commas (e.g. 159123,513123,788943)">
            </TextField>
            <Button>Add</Button>
        </Card>
    )
}

function ManageGroupCard() {
    const [group, setGroup] = React.useState('');

    const handleChange = (event) => {
        setGroup(event.target.value);
    };

    return (
        <Card
            component="form"
            sx={{
                '& > :not(style)': { m: 2, mt: 4, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <FormLabel>Manage Group</FormLabel>
            <FormControl> 
                <InputLabel >Select Group</InputLabel>
                <Select label="Select Group" value={group} onChange={handleChange}>
                    <MenuItem value={"Group A"}>Group A</MenuItem>
                    <MenuItem value={"Group B"}>Group B</MenuItem>
                    <MenuItem value={"Group C"}>Group C</MenuItem>
                </Select>
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Actions</FormLabel>
                <RadioGroup
                    aria-label="actions"
                    defaultValue="add-users"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="add-users" control={<Radio />} label="Add Users" />

                    <FormControlLabel value="remove-users" control={<Radio />} label="Remove Users" />
                    <FormControlLabel value="delete-group" control={<Radio />} label="Delete Group" />
                </RadioGroup>
                </FormControl>
            <Button>Submit</Button>
        </Card>
    )
}

function GroupTable() {

    function createData(groupName, administrator, numMem, memList) {
        var members = ""
        for (let i = 0; i < memList.length; i++){
            members += memList[i] + "<br />"
        }
        return {groupName, administrator, numMem, members}
    }

    const rows = [
        createData("Group A", "default-admin", "4", ["John Smith", "Jane Doe", "Mariah Carey", "default-admin"]),
        createData("Group B", "default-admin", "1", ["default-admin"]),
        createData("Group C", "default-admin", "1", ["default-admin"]),
        createData("Group D", "test", "1", ["default-admin"]),
    ]

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="PastExperimentsHeader">
            <TableRow>
              <TableCell><b>Group Name</b></TableCell>
              <TableCell align="right"><b>Administrator</b></TableCell>
              <TableCell align="right"><b>Members</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.groupName}</TableCell>
                <TableCell align="right">{row.administrator}</TableCell>
                <TableCell align="right">{row.numMem}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function Groups() {
    return (
        <div className="documentation">
            <div className="container">
                <div className="row align-items-top my-5">
                    <h1 className="font-weight-light">Manage Groups</h1>
                </div>
                <div className="row align-items-top my-5">
                    <div className="col">
                        <AddGroupCard></AddGroupCard><br/>
                        <ManageGroupCard></ManageGroupCard>
                    </div><br />
                    <div className="col">
                        <GroupTable></GroupTable>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Groups;
