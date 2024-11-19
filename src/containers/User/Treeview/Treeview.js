import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import { Box } from '@mui/material';
import { TreeviewBox } from "./TreeviewBox";
import { getLandlordTreeAction } from "store/actions/userActions";

export const Treeview = () => {
  const dispatch = useDispatch();

  const landlordTree = useSelector((state) => state.getIn(['user', 'landlord_tree']));
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userRole = currentUser['role'];

  useEffect(() => {
    // if (userRole === 'admin') {
    //   dispatch(getLandlordTreeAction());
    // } else if (userRole === 'll') {
    //   dispatch(getVPTreeAction());
    // } else if (userRole === 'vp') {
    //   dispatch(getRMTreeAction());
    // }
    dispatch(getLandlordTreeAction());
  }, []);

  return (
    <DashboardLayoutContainer>
      <Box>
        <TreeviewBox />
        <TreeviewBox />
        <TreeviewBox />
      </Box>
    </DashboardLayoutContainer>

  );
};
