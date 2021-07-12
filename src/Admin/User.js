import { Grid } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { getTimestamp } from "helper/ConvertTime";
import { useSnackbar } from "notistack";
import qs from "qs";
import React, { useEffect, useState } from "react";
import { axios } from "services";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    minWidth: 90,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(_id, username, email, createdAt, photo, isChecked) {
  return { _id, username, email, createdAt, photo, isChecked };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableRow: {
    "&:hover": {
      cursor: "pointer",
    },
    tableIcon: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
});

export default function UserTable() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [rows, setRows] = useState(null);
  const admin_id = JSON.parse(window.localStorage.getItem("user_id"));
  const [selected, setSelected] = useState([]);
  console.log(selected);

  //get list user

  useEffect(() => {
    axios
      .get(`/admin/${admin_id}/listusers`)
      .then((res) => {
        let _rows = [];
        res.data.forEach((item) => {
          _rows.push(
            createData(
              item._id,
              item.username,
              item.email,
              getTimestamp(item.createdAt),
              item.photo,
              false
            )
          );
        });
        setRows(_rows);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line
  }, []);

  //handle check all
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      const newSelected = rows.map((item) => item._id);
      setSelected(newSelected);

      return;
    }
    setSelected([]);
  };
  //handle check Item
  const handleCheckItem = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  return (
    <>
      {rows && (
        <TableContainer component={Paper}>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            className={classes.tableIcon}
          >
            <Grid item style={{ padding: "15px" }}>
              {selected.length} selected
            </Grid>
            <Grid item style={{ padding: "15px" }}>
              {selected.length > 0 ? (
                <DeleteIcon
                  onClick={() => {
                    axios
                      .post(
                        `/admin/${admin_id}/deleteuser`,
                        qs.stringify(selected)
                      )
                      .then((res) => {
                        enqueueSnackbar(res.data, {
                          variant: "success",
                          anchorOrigin: {
                            vertical: "top",
                            horizontal: "left",
                          },
                        });
                        window.location.reload();
                      })
                      .catch((err) => console.error(err));
                  }}
                  style={{ cursor: "pointer" }}
                  color="secondary"
                />
              ) : (
                <FilterListIcon style={{ cursor: "pointer" }} color="primary" />
              )}
            </Grid>
          </Grid>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < rows.lenght
                    }
                    checked={rows.length > 0 && selected.length === rows.length}
                    onChange={handleCheckAll}
                    inputProps={{ "aria-label": "select all desserts" }}
                  />
                  All
                </StyledTableCell>
                <StyledTableCell align="left">User</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">CreatedAt</StyledTableCell>
                <StyledTableCell align="left">Photo</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTableRow
                    className={classes.tableRow}
                    key={row._id}
                    onClick={(event) => handleCheckItem(event, row._id)}
                  >
                    <StyledTableCell component="th" scope="row">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.createdAt}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <span className={classes.overFlowTetx}>{row.photo}</span>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
