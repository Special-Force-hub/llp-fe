import { DashboardLayoutContainer } from 'components/Layouts/DashboardLayout';
import styled from 'styled-components';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import {
  getBuildingAction,
  // getFilteredDataAction,
  // setBuildingAction,
} from 'store/actions/propertyActions';
import { openDetails } from 'store/actions/uiActions';
import { BuildingTable } from 'components/Tables/BuildingTable';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Loading } from '@leapeasy/ui-kit';
import { NoBuildingData } from 'components/common/NoBuildingData';

export const Buildings = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    options: {},
    searchText: '',
    searchPlaceholder: 'Search Building..',
  });
  const [selectedBType, selSelectedBType] = useState([]);
  const [isSHouse, setIsSHouse] = useState([]);
  
  const [sortOptions, setSortOptions] = useState({});
  const [pagination, setPagination] = useState({
    pageNumber: 0,
    rowsPerPage: 12,
    maxVisiblePageItems: 6,
    onUpdate: (value) => {
      if (value === -1) value = 0;
      setPagination((prev) => ({ ...prev, pageNumber: value }));
    },
    showPageNumberInput: 6,
  });

  const buildings = useSelector((state) => state.getIn(['property', 'building']));
  const buildingsJSON = buildings && buildings.toJS();

  const handleDispatch = () => {
    dispatch(
      getBuildingAction({
        filter,
        offset: pagination.pageNumber * pagination.rowsPerPage,
        limit: pagination.rowsPerPage,
        sortOptions: sortOptions,
        selectedBType: selectedBType,
        isSHouse: isSHouse
      }),
    );
  }

  useEffect(() => {
    handleDispatch()
  }, [filter, pagination, dispatch, sortOptions]);

  const onClickBuilding = useCallback(
    (building) => {
      dispatch(
        openDetails({
          type: 'building',
          data: building,
        }),
      );
      setTimeout(() => {
        navigate('/property/buildings/detail');
      });
    },
    [dispatch, navigate],
  );
  const resetFunc = () => {
    selSelectedBType([])
    setIsSHouse([])
    handleDispatch()
  }
  const applyFunc = () => {
    handleDispatch()
  }
  
  return (
    <DashboardLayoutContainer>
      {
        buildings ?
          <React.Fragment>
            <Box>
              <BuildingTable
                buildings={buildingsJSON.data}
                filter={filter}
                onChangeFilter={setFilter}
                dropFilter={
                  {
                    component: (
                      <DropFilterContainer>
                        <Dropdown
                          onChange={(e) => {
                            selSelectedBType(e.target.value);
                          }}
                          options={[
                            {
                              text: 'Guarantor Waiver+LDR',
                              value: 'Event Process;Auto Enroll'
                            },
                            {
                              text: 'Rent Guaranty',
                              value: 'Auto Enroll'
                            }
                          ]}
                          value={selectedBType}
                          multiselect={true}
                          showSearch={false}
                          placeholder='Building Type'
                          label="Building Type"
                          style={{
                            width: '100%'
                          }}
                        />

                        <Dropdown
                          onChange={(e) => {
                            setIsSHouse(e.target.value);
                          }}
                          options={[
                            {
                              text: 'True',
                              value: 'true'
                            },
                            {
                              text: 'False',
                              value: 'false'
                            }
                          ]}
                          value={isSHouse}
                          multiselect={true}
                          showSearch={false}
                          placeholder='Student Housing'
                          label="Student Housing"
                          style={{
                            width: '100%'
                          }}
                        />
                      </DropFilterContainer>
                    ),
                    resetFunc: resetFunc,
                    applyFunc: applyFunc
                  }
                }
                pagination={{
                  ...pagination,
                  totalItems: buildingsJSON.total,
                  totalPages: Math.ceil(buildingsJSON.total / pagination.rowsPerPage),
                }}
                onChangePagination={setPagination}
                sortOptions={sortOptions}
                onChangeSort={setSortOptions}
                onClickBuilding={onClickBuilding}
              />
            </Box>
            {
              buildingsJSON.data.length === 0 && <NoBuildingData />
            }
          </React.Fragment>
        : (
          <Loading size={'large'} />
        )
      }
    </DashboardLayoutContainer>
  );
};

const DropFilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  * {
    box-sizing: border-box;
  }
`;