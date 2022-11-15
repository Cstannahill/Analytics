import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import BaseTable from './BaseTable';
import debug from 'sabio-debug';

const _logger = debug.extend('InternalAnalytics');

const columns = [
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Name',
        accessor: 'name',
        sort: true,
    },
    {
        Header: 'Annual Revenue',
        accessor: 'annualRevenue',
        sort: true,
    },
    {
        Header: 'Monthly Revenue',
        accessor: 'monthlyRevenue',
        sort: true,
    },
    {
        Header: 'Weekly Revenue',
        accessor: 'weeklyRevenue',
        sort: true,
    },
    {
        Header: 'Orders',
        accessor: 'totalOrders',
        sort: true,
    },
    {
        Header: 'Invites',
        accessor: 'invites',
        sort: true,
    },
];

export default function OrgStatsTable(props) {
    _logger(props);
    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
        {
            text: 'All',
            value: props.revenues.length,
        },
    ];
    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title mb-1">Organization Analytics</h4>
                    <BaseTable
                        className="table-bordered border-primary"
                        columns={columns}
                        data={props.revenues}
                        pageSize={5}
                        sizePerPageList={sizePerPageList}
                        isSortable={true}
                        pagination={true}
                        isSearchable={true}
                    />
                </Card.Body>
            </Card>
        </>
    );
}

OrgStatsTable.propTypes = {
    revenues: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            annualRevenue: PropTypes.string.isRequired,
            monthlyRevenue: PropTypes.string.isRequired,
            weeklyRevenue: PropTypes.string.isRequired,
            annualOrders: PropTypes.number,
        })
    ),
};
