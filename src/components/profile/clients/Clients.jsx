import React, { useState, useEffect, useCallback } from "react";
import "./Clients.scss";
import clsx from "clsx";
import Dashboard from "../dashboard/Dashboard";
// eslint-disable-next-line
import Chart from './Chart'
import {
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  Modal,
} from "@material-ui/core";
import { AddCircleOutline, Delete, Visibility  } from "@material-ui/icons";
import { Bar, Doughnut } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStyles from "./Styles";
import CloseIcon from "@material-ui/icons/Close";
  

const ClientsPage = ({ open }) => {
  const classes = useStyles({ open });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  // eslint-disable-next-line
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Customers",
        data: [],
        fill: false,
        backgroundColor: "#3f51b5",
        borderColor: "#3f51b5",
      },
    ],
  });

  const initialChartData = {
    labels: ["Customers", "New Customers"],
    datasets: [
      {
        label: "Customers",
        data: [0, 0],
        backgroundColor: ["#3f51b5", "#f44336"],
      },
    ],
  };

  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    const newCustomers =
      customers.filter((customer) => customer.isNew).length + 1;
    const existingCustomers = customers.length - newCustomers;
    const newChartData = {
      labels: ["Customers", "New Customers"],
      datasets: [
        {
          label: "Customers",
          data: [existingCustomers, newCustomers],
          backgroundColor: ["#3f51b5", "#f44336"],
        },
      ],
    };
    setChartData(newChartData);
  }, [customers]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleTooltipClick = () => {
    setShowModal(true);
  };


  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleDeleteCustomer = useCallback(
    (index) => {
      if (customers.length === 0) {
        return;
      }
      const newCustomers = [...customers];
      newCustomers.splice(index, 1);
      setCustomers(newCustomers);
    },
    [customers]
  );

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const newCustomers = customers.filter((customer) => customer.isNew).length;
  const existingCustomers = customers.length - newCustomers;

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (name.trim().length === 0 || email.trim().length === 0) {
        toast.error("All fields are required");
        return;
      }

      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const newCustomer = {
        name: `${data.results[0].name.first} ${data.results[0].name.last}`,
        email: data.results[0].email,
        picture: `https://i.pravatar.cc/150?u=${data.results[0].email}`,
        isNew: true,
      };
      setCustomers([...customers, newCustomer]);
      setName("");
      setEmail("");
      toast.success("New customer is added");

      const newCustomers =
        customers.filter((customer) => customer.isNew).length + 1;
      const existingCustomers = customers.length - newCustomers;
      const newChartData = {
        labels: ["Customers", "New Customers"],
        datasets: [
          {
            label: "Customers",
            data: [existingCustomers, newCustomers],
            backgroundColor: ["#3f51b5", "#f44336"],
          },
        ],
      };
      setChartData(newChartData);
    },
    [customers, name, email]
  );

  useEffect(() => {
    const chartData = {
      labels: customers.map((customer) => customer.name),
      datasets: [
        {
          label: "Customers",
          data: customers.map(() => Math.floor(Math.random() * 100)),
          backgroundColor: "#3f51b5",
        },
      ],
    };
    setData(chartData);
  }, [customers]);

  useEffect(() => {
    async function fetchCustomers() {
      const response = await fetch("https://randomuser.me/api/?results=10");
      const data = await response.json();
      const customers = data.results.map((result) => ({
        name: `${result.name.first} ${result.name.last}`,
        email: result.email,
        picture: `https://i.pravatar.cc/150?u=${result.email}`,
      }));
      setCustomers(customers.slice(0, 2));
    }
    fetchCustomers();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Dashboard
        open={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <section className="section">
        <div
          style={{ paddingRight: "60px" }}
          className={clsx(classes.root, {
            [classes.rootShift]: drawerOpen,
          })}
        >
          <div className="content">
            <TableContainer component={Paper} className={classes.tableBox}>
              <Typography variant="h5" component="h2" gutterBottom>
                Customers
              </Typography>
              <Divider />
              <Box mt={3}>
                <Table className={classes.table} aria-label="customers table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Avatar</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Date Added</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(customers) &&
                      customers.map((customer, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Avatar
                              alt={customer.name}
                              src={customer.picture}
                              className={classes.avatar}
                            />
                          </TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>
                            {new Date().toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => handleDeleteCustomer(index)}
                                className={classes.deleteButton}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View">
                              <IconButton
                                onClick={() => handleSelectCustomer(customer)}
                                className={classes.viewButton}
                              >
                                <Visibility />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Box>
            </TableContainer>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Typography variant="h5" component="h2" gutterBottom>
                Add New Customer
              </Typography>
              <Divider />
              <Box mt={3}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="name"
                      label="Name"
                      variant="outlined"
                      className={classes.formInput}
                      value={name}
                      onChange={handleNameChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      label="Email"
                      variant="outlined"
                      className={classes.formInput}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.addButton}
                      startIcon={<AddCircleOutline />}
                      type="submit"
                    >
                      Add Customer
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </div>
          <Grid
            container
            style={{
              width: "100%",
              marginTop: "20px",
              justifyContent: "space-between",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              style={{
                flexBasis: "64.5%",
                maxWidth: "65.5%",
                padding: "12px 12px 0 0",
              }}
            >
              <Card
                className={classes.card}
                style={{ background: "#ffffff7d", borderRadius: "10px" }}
              >
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Customer Statistics
                  </Typography>
                  <Divider />
                  {chartData.datasets[0].data.length > 0 ? (
                    <Bar data={chartData} options={options} />
                  ) : (
                    <Typography>No data yet.</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Box mt={3}>
              {customers.length > 0 ? (
                <Doughnut
                  data={{
                    labels: ["Customers", "New Customers"],
                    datasets: [
                      {
                        label: "Customers",
                        data: [existingCustomers, newCustomers],
                        backgroundColor: ["#3f51b5", "#f44336"],
                      },
                    ],
                  }}
                />
              ) : (
                <Typography>No customers yet.</Typography>
              )}
              <Tooltip
                title="Click for more information"
                onClick={handleTooltipClick}
              >
                <Typography>
                  {existingCustomers + newCustomers} <small>Customers</small>
                </Typography>
              </Tooltip>
            </Box>
          </Grid>
        </div>
        <ToastContainer />
      </section>
      {selectedCustomer && (
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <div className={classes.modal}>
            <Typography variant="h5">Customer Information</Typography>
            <Avatar
              alt={selectedCustomer.name}
              src={selectedCustomer.picture}
              className={classes.avatar}
            />
            <Typography>Name: {selectedCustomer.name}</Typography>
            <Typography>Email: {selectedCustomer.email}</Typography>
            <IconButton onClick={() => setShowModal(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ClientsPage;
