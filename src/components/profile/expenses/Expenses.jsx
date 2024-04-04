import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import useStyles from "./Styles";
import Dashboard from "../dashboard/Dashboard";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExpensesData from "./expenseData/ExpensesData";
import seriesData from "./expenseData/SeriesData";
import ChartData from "./expenseData/ChartData";


const ExpensesPage = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [series, setSeries] = useState(seriesData);
  const [chartData, setChartData] = useState(ChartData);
  const [expensesData, setExpensesData] = useState(ExpensesData);

  


  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !date || !amount || !category || !series) {
      toast.error("Please fill in all fields");
      return;
    }

    const existingCategory = chartData.find((data) => data.name === category);
    if (existingCategory) {
      existingCategory.value += Number(amount);
      existingCategory.tooltip = `${category}: ${existingCategory.value}`;
    } else {
      const color = getRandomColor();
      chartData.push({
        name: category,
        value: Number(amount),
        fill: color,
        tooltip: `${category}: ${amount}`,
      });
    }

    const newTableData = [
      ...expensesData,
      {
        id: expensesData.length + 1,
        name,
        date,
        amount,
        category,
        series,
      },
    ];
    setExpensesData(newTableData);
    setChartData(chartData);

    setName("");
    setDate("");
    setAmount("");
    setCategory("");
    setSeries("");
    toast.success("Expense added successfully");
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <>
      <Dashboard
        open={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <section
        className={clsx(classes.root, { [classes.rootShift]: drawerOpen })}
      >
        <div className={classes.content}>
          <Grid container spacing={3} style={{justifyContent: "space-between", paddingRight: "60px"}}>
            <Grid item xs={12} md={8} style={{maxWidth: "50%", flexBasis: "50%"}}>
              <Box mb={3}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Expenses
                </Typography>
                <Divider />
              </Box>
              <Box>
                <TableContainer
                  component={Paper}
                  className={classes.table__container}
                >
                  <Table className={classes.tableBox}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Series</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {expensesData.map((expense) => (
                        <TableRow key={expense.id}>
                          <TableCell>{expense.name}</TableCell>
                          <TableCell>{expense.date}</TableCell>
                          <TableCell>{expense.amount.toLocaleString("en-US", {style: "currency", currency: "USD"})}&nbsp;$</TableCell>
                          <TableCell>{expense.category}</TableCell>
                          <TableCell>{expense.series}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box mb={3}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Add Expense
                </Typography>
                <Divider />
              </Box>
              <Box>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="date"
                        label="Date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="amount"
                        label="Amount"
                        value={amount}
                        onChange={(event) => setAmount(event.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          id="category"
                          value={category}
                          onChange={(event) => setCategory(event.target.value)}
                        >
                          <MenuItem value="">Select Category</MenuItem>
                          <MenuItem value="food">Food</MenuItem>
                          <MenuItem value="transportation">
                            Transportation
                          </MenuItem>
                          <MenuItem value="housing">Housing</MenuItem>
                          <MenuItem value="utilities">Utilities</MenuItem>
                          <MenuItem value="entertainment">
                            Entertainment
                          </MenuItem>
                          <MenuItem value="medical">Medical</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="series-label">Series</InputLabel>
                        <Select
                          labelId="series-label"
                          id="series"
                          value={series}
                          onChange={(event) => setSeries(event.target.value)}
                        >
                          <MenuItem value="">Select Series</MenuItem>
                          <MenuItem value="Modern">Modern</MenuItem>
                          <MenuItem value="Luxe">Luxe</MenuItem>
                          <MenuItem value="Premium">Premium</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        className={classes.formButton}
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                      >
                        Add Expense
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="h5" component="h2" gutterBottom>
                  Cost Statistics
                </Typography>
                <Divider />
              </Box>
              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <PieChart width={400} height={400}>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active) {
                              return (
                                <div className={classes.tooltip}>
                                  <p>{`${payload[0].name} : ${payload[0].value}`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                          cursor="pointer"
                        />
                        <Pie data={chartData}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                      </PieChart>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box>
                      <Typography variant="h6" component="h3" gutterBottom>
                        Expenses by Category
                      </Typography>
                      <TableContainer
                        component={Paper}
                        className={classes.table__container}
                      >
                        <Table className={classes.tableBox}>
                          <TableHead>
                            <TableRow>
                              <TableCell>Category</TableCell>
                              <TableCell>Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {chartData.map((data) => (
                              <TableRow key={data.name}>
                                <TableCell>{data.name}</TableCell>
                                <TableCell>{data.value.toLocaleString("en-US", {style: "currency", currency: "USD"})}&nbsp;$</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ExpensesPage;
