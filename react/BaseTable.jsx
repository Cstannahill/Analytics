import React, { useRef, useEffect, forwardRef } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useRowSelect,
    useGlobalFilter,
    useAsyncDebounce,
    useExpanded,
} from 'react-table';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const _logger = debug.extend('InternalAnalytics');
const GlobalFilter = ({ preGlobalFilteredRows, globalFilter, setGlobalFilter, searchBoxClass }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div className={classNames(searchBoxClass)}>
            <span className="d-flex align-items-center">
                Search :{' '}
                <input
                    value={value || ''}
                    onChange={(e) => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    className="form-control w-auto ms-1"
                />
            </span>
        </div>
    );
};

GlobalFilter.propTypes = {
    preGlobalFilteredRows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
        })
    ),
    globalFilter: PropTypes.arrayOf(PropTypes.string),
    setGlobalFilter: PropTypes.func,
    searchBoxClass: PropTypes.string,
};

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <div className="form-check">
                <input type="checkbox" className="form-check-input" ref={resolvedRef} {...rest} />
                <label htmlFor="form-check-input" className="form-check-label"></label>
            </div>
        </>
    );
});

IndeterminateCheckbox.propTypes = {
    indeterminate: PropTypes.element,
};

const Table = (props) => {
    _logger(props);
    const isSearchable = props['isSearchable'] || false;
    const isSortable = props['isSortable'] || false;
    const Pagination = props['Pagination'] || false;
    const isSelectable = props['isSelectable'] || false;
    const isExpandable = props['isExpandable'] || false;

    const dataTable = useTable(
        {
            columns: props['columns'],
            data: props['data'],
            initialState: { pageSize: props['pageSize'] || 10 },
        },
        isSearchable && useGlobalFilter,
        isSortable && useSortBy,
        isExpandable && useExpanded,
        Pagination && usePagination,
        isSelectable && useRowSelect,
        (hooks) => {
            isSelectable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                            </div>
                        ),
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);

            isExpandable &&
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'expander',
                        Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                            <span {...getToggleAllRowsExpandedProps()}>{isAllRowsExpanded ? '-' : '+'}</span>
                        ),
                        Cell: ({ row }) =>
                            row.canExpand ? (
                                <span
                                    {...row.getToggleRowExpandedProps({
                                        style: {
                                            paddingLeft: `${row.depth * 2}rem`,
                                        },
                                    })}>
                                    {row.isExpanded ? '-' : '+'}
                                </span>
                            ) : null,
                    },
                    ...columns,
                ]);
        }
    );

    let rows = Pagination ? dataTable.page : dataTable.rows;
    const mapRows = (row, i) => {
        dataTable.prepareRow(row);
        return (
            <tr key={i} {...row.getRowProps()}>
                {row.cells.map(mapCells)}
            </tr>
        );
    };

    const mapCells = (cell, i) => {
        return (
            <td key={i} {...cell.getCellProps()}>
                {cell.render('Cell')}
            </td>
        );
    };

    const mapHeaders = (headerGroup) => {
        return (
            <tr key={Math.random() * 100} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <th
                        key={Math.random() * 100}
                        {...column.getHeaderProps(column.sort && column.getSortByToggleProps())}
                        className={classNames({
                            sortingDesc: column.isSortedDesc === true,
                            sortingAsc: column.isSortedDesc === false,
                            sortable: column.sort === true,
                        })}>
                        {column.render('Header')}
                    </th>
                ))}
            </tr>
        );
    };

    return (
        <>
            {isSearchable && (
                <GlobalFilter
                    preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
                    globalFilter={dataTable.state.globalFilter}
                    setGlobalFilter={dataTable.setGlobalFilter}
                    searchBoxClass={props['searchBoxClass']}
                />
            )}
            <div className="table-responsive">
                <table
                    {...dataTable.getTableProps()}
                    className={classNames(
                        'table table-centered react-table mt-1 table-bordered border sorting responsive',
                        props['tableClass']
                    )}>
                    <thead className={props['theadClass']}>{dataTable.headerGroups.map(mapHeaders)}</thead>
                    <tbody {...dataTable.getTableBodyProps()}>{(rows || []).map(mapRows)}</tbody>
                </table>
            </div>

            {Pagination && <Pagination tableProps={dataTable} sizePerPageList={props['sizePerPageList']} />}
        </>
    );
};

Table.propTypes = {
    isSearchable: PropTypes.bool,
    isSortable: PropTypes.bool,
    Pagination: PropTypes.string,
    isSelectable: PropTypes.bool,
    isExpandable: PropTypes.bool,
    pageSize: PropTypes.number,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
        })
    ),
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            annualRevenue: PropTypes.string,
            monthlyRevenue: PropTypes.string,
            weeklyRevenue: PropTypes.string,
            annualOrders: PropTypes.number,
        })
    ).isRequired,

    searchBoxClass: PropTypes.string,
    tableClass: PropTypes.string,
    theadClass: PropTypes.string,
    sizePerPageList: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.number,
        })
    ),
    getToggleAllPageRowsSelectedProps: PropTypes.func,
    row: PropTypes.func,
    getToggleAllRowsExpandedProps: PropTypes.func,
    isAllRowsExpanded: PropTypes.bool,
};

export default Table;
