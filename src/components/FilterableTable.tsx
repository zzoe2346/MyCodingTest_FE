import * as React from 'react';
import { DataGrid, GridColDef, GridFilterItem, GridFilterModel } from '@mui/x-data-grid';
import Chip from '@mui/material/Chip';

interface FilterableTableProps {
  rows: any[];
}

const FilterableTable: React.FC<FilterableTableProps> = ({ rows }) => {
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });

  const columns: GridColDef[] = [
    {
      field: 'solveDate',
      headerName: '풀이 날짜',
      type: 'date',
      width: 150,
      filterable: true,
      filterOperators: [
        {
          label: 'Is',
          value: 'is',
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return (params) => {
              return params.value.toDateString() === new Date(filterItem.value).toDateString();
            };
          },
        },
        {
          label: 'On or Before',
          value: 'onOrBefore',
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return (params) => {
              return params.value <= new Date(filterItem.value);
            };
          },
        },
        {
          label: 'On or After',
          value: 'onOrAfter',
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return (params) => {
              return params.value >= new Date(filterItem.value);
            };
          },
        },
      ],
    },
    {
      field: 'reviewDate',
      headerName: '리뷰 날짜',
      type: 'date',
      width: 150,
      filterable: true,
      filterOperators: [
        {
          label: 'Is',
          value: 'is',
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return (params) => {
              return params.value.toDateString() === new Date(filterItem.value).toDateString();
            };
          },
        },
        {
          label: 'On or Before',
          value: 'onOrBefore',
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return (params) => {
              return params.value <= new Date(filterItem.value);
            };
          },
        },
        {
          label: 'On or After',
          value: 'onOrAfter',
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return (params) => {
              return params.value >= new Date(filterItem.value);
            };
          },
        },
      ],
    },
    {
      field: 'difficulty',
      headerName: '난이도',
      type: 'singleSelect',
      valueOptions: ['Easy', 'Medium', 'Hard'],
      width: 120,
      filterable: true,
    },
    {
      field: 'tags',
      headerName: '태그',
      width: 200,
      filterable: true,
      renderCell: (params) => (
        <div>
          {params.value.map((tag: string) => (
            <Chip key={tag} label={tag} size="small" style={{ marginRight: 4 }} />
          ))}
        </div>
      ),
      filterOperators: [
        {
          label: 'Contains',
          value: 'contains',
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return (params) => {
              return params.value.some((tag: string) => tag.toLowerCase().includes(filterItem.value.toLowerCase()));
            };
          },
        },
        {
          label: 'Does not contain',
          value: 'doesNotContain',
          getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (!filterItem.value) {
              return null;
            }
            return (params) => {
              return !params.value.some((tag: string) => tag.toLowerCase().includes(filterItem.value.toLowerCase()));
            };
          },
        },
      ]
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterModel={filterModel}
        onFilterModelChange={(model) => setFilterModel(model)}
        //components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default FilterableTable;