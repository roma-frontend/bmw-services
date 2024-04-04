import React from "react";
import { Typography, Table, TableBody, TableCell, TableRow } from "@material-ui/core";

const Report = ({ title, data }) => {
  const rows = [];

  if (data && Array.isArray(data) && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      rows.push(
        <TableRow key={i}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.value}</TableCell>
        </TableRow>
      );
    }
  }

  return (
    <div>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1">This is a sample report description.</Typography>
      {rows.length > 0 ? (
        <Table>
          <TableBody>{rows}</TableBody>
        </Table>
      ) : (
        <Typography variant="body1">No data available.</Typography>
      )}
    </div>
  );
};

export default Report;