export const options = () => ({
  scales: {
    x: {
      type: "category",
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
      ],
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.parsed || 0;
          return `${label}: ${value}`;
        },
      },
    },
  },
  tooltips: {
    mode: "index",
    callbacks: {
      label: function (tooltipItem, data) {
        if (tooltipItem.index === 1) {
          const newCustomers = newCustomers.filter((customer) => customer.isNew);
          const names = newCustomers.map((customer) => customer.name);
          return `New Customers: ${newCustomers.length}\n${names.join(", ")}`;
        } else {
          return `Customers: ${data.datasets[0].data[0]}`;
        }
      },
    },
  },
  elements: {
    point: {
      radius: 5,
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: "rgb(75, 192, 192)",
      hoverRadius: 7,
      hoverBackgroundColor: "white",
      hoverBorderWidth: 2,
      hoverBorderColor: "rgb(75, 192, 192)",
    },
  },
});