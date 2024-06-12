import React from "react";
import {
  TableContainer, // Make sure to import TableContainer
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material"; // Importing from @mui/material

export default function GardenLayoutTable({ gardenLayout }) {
  const renderCell = (plant, colIndex) => (
    <TableCell key={colIndex} align="center">
      <div>{plant.name}</div>
      <div>{plant.plantsPerSquare} plants/sq</div>
      <div>{plant.producePerSquare} produce/sq</div>
    </TableCell>
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {gardenLayout.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, colIndex) =>
                cell && cell.id ? (
                  renderCell(cell, colIndex)
                ) : (
                  <TableCell key={colIndex} align="center">
                    Empty
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
