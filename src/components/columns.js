//create colums for the table
export const Columns = [
    {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => <span>{value}</span>,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        style: {
            textAlign: "center",
        },
    },
    {
        Header: "Course Code",
        accessor: "code",
        Cell: ({ value }) => <span>{value}</span>,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        style: {
            textAlign: "center",
        },
    },
    {
        Header: "Credit Unit",
        accessor: "credit_unit",
        Cell: ({ value }) => <span>{value}</span>,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        style: {
            textAlign: "center",
        },
    },
    {
        Header: "Course Type",
        accessor: "courseType",
        Cell: ({ value }) => <span>{value}</span>,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        style: {
            textAlign: "center",
        },
    },
    // create a column for Status and add a dropdown menu to it
    {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => <span>{value}</span>,
        width: 100,
        maxWidth: 100,
        minWidth: 100,
        style: {
            textAlign: "center",
        },
        filterable: true,
        filterMethod: (filter, row) => {
            return row[filter.id].startsWith(filter.value);
        }
    },
];
