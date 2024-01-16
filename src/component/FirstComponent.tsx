import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';






const FirstComponent: React.FC = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchData();
        console.log("data fetched from api")

    }, []);

    const defaultTheme = createTheme();




    interface Post {
        userId: number;
        id: number;
        title: string;
        body: string;
    }
    const storedUserDetailsJSON  = localStorage.getItem('userDetails');
    const storedUserDetails = storedUserDetailsJSON !== null ? JSON.parse(storedUserDetailsJSON) : null;

    if (storedUserDetails !== null) {
      console.log("in lc", storedUserDetails.fullName);
    } else {
      console.log("Stored user details are null");
    }


    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Column for DataGrid
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 300, editable: true },
        { field: 'body', headerName: 'Body', width: 400, editable: true },
    ];

    return (
        <ThemeProvider theme={defaultTheme}>
           
            <Typography component="h1" variant="h5" m={2}>
                Hi {storedUserDetails.fullName}
            </Typography>
            <Typography component="h1" variant="h5" m={2} sx={{ textAlign: 'center' }} color={"primary"} >
                First Component
            </Typography>



            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                
                    rows={posts}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}

                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    getRowId={(row) => row.id.toString()}
                />
            </Box>
        </ThemeProvider>
    );
};

export default FirstComponent;
