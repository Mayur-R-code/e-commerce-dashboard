import * as Yup from 'yup';
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import React, { useState, useEffect, useCallback } from 'react'

import { Box, Grid, Stack, Button, Switch, Container, TextField, Autocomplete, FormControlLabel } from '@mui/material'

import { getCompanyListApi } from 'src/api/company-list'
import { updateUserApi, getUserByIdApi } from 'src/api/user'


interface userFormProps {
    handleDialogClose: () => void;
    fetchUserList?: VoidFunction;
    userEditId: string;
}
interface formProps {
    fullName: string;
    company: string;
    role: string;
    isActive: boolean;
}

const UserEditForm = ({ handleDialogClose, fetchUserList, userEditId }: userFormProps) => {
    const [companyList, setCompanyList] = useState([])

    // initialValues
    const initialValue: formProps = {
        fullName: '',
        company: '',
        role: '',
        isActive: false,
    };

    // validationSchemas
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .required('Full Name is required!'),
        company: Yup.string()
            .required('Company is required!'),
        role: Yup.string()
            .required('Role is required!'),
        isActive: Yup.boolean(),
    });

    // function to fetch company list
    const fetchCompanyList = useCallback(async () => {
        try {
            const response = await getCompanyListApi()
            if (response?.status === 200) {
                setCompanyList(response?.data)
            }
        } catch (err) {
            console.error('Error fetching company list:', err)
        }
    }, [])


    // form submit handler
    const handleSubmit = async (values: formProps) => {
        const response = await updateUserApi(userEditId, values)
        if (response?.status === 200) {
            fetchUserList?.()
            handleDialogClose()
            toast.success("User Update Successfully")
        } else {
            toast.error("Failed to update user")
        }
    }
    const formik = useFormik({
        initialValues: initialValue,
        validationSchema,
        onSubmit: handleSubmit

    })
    // fetch userData form API
    const fetchUserData = useCallback(async () => {
        const response = await getUserByIdApi(userEditId)
        if (response.status === 200) {
            // set the edit data in formik
            formik.setValues({
                fullName: response.data.fullName,
                company: response.data.company,
                role: response.data.role,
                isActive: response.data.isActive
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userEditId])


    useEffect(() => {
        fetchCompanyList();
        fetchUserData()
    }, [fetchCompanyList, fetchUserData])

    return (
        <Container sx={{ padding: "0px !important" }}>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container mt={1} gap={3}>
                    <Grid xs={12} md={5.8}>
                        <TextField fullWidth label="Full Name" value={formik.values.fullName} name="fullName" onChange={formik.handleChange} onBlur={formik.handleBlur} error={Boolean(formik.errors.fullName && formik.touched.fullName)}
                            helperText={formik.touched.fullName && formik.errors.fullName} />
                    </Grid>
                    <Grid xs={12} md={5.8}>
                        <Autocomplete
                            options={companyList}
                            value={companyList.find((option: any) => option.name === formik.values.company) || null}
                            onChange={(event, value) => {
                                formik.setFieldValue('company', value ? value.name : '');
                            }}
                            getOptionLabel={(option: { name: string }) => option.name}
                            renderInput={(params) => <TextField {...params} label="Select company" error={Boolean(formik.errors.company && formik.touched.company)}
                                helperText={formik.touched.company && formik.errors.company} />} />
                    </Grid>
                </Grid>
                <Grid container mt={2} gap={3}>
                    <Grid xs={12} md={5.8}>
                        <TextField fullWidth label="Role" value={formik.values.role}
                            name="role"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.role && formik.touched.role)}
                            helperText={formik.touched.role && formik.errors.role} />
                    </Grid>
                    <Grid xs={12} md={5.8}>
                        <FormControlLabel control={<Switch checked={formik.values.isActive} onChange={formik.handleChange}
                            name="isActive" />} label="Status" />
                    </Grid>
                </Grid>
                <Stack direction="row" gap={3} mt={2}>
                    <Button type='submit' variant='contained' disabled={formik.isSubmitting}>Submit</Button>
                    <Button variant='outlined' onClick={handleDialogClose}>Cancle</Button>
                </Stack>

            </Box>
        </Container>


    )
}
export default UserEditForm
