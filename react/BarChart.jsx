import React from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const _logger = debug.extend('InternalAnalytics');
const BarChart = (props) => {
    _logger(props);
    const apexBarChartOpts = {
        chart: {
            height: 380,
            type: 'bar',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        dataLabels: {
            enabled: false,
            offsetY: 8,
            style: {
                fontSize: '10px',
                colors: ['#fff'],
            },
        },
        colors: ['#6c757d', '#087608'],
        stroke: {
            show: true,
            width: 20,
            colors: ['#fff'],
        },

        xaxis: {
            categories: ['Week', 'Month', 'Year'],
        },
        legend: {
            offsetY: -3,
            offsetX: 25,
        },
        states: {
            hover: {
                filter: 'none',
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
    };
    const apexBarChartData = [
        {
            name: 'Previous',
            data: [
                props?.revenue?.prevWeeklyRevenue,
                props?.revenue?.prevMonthlyRevenue,
                props?.revenue?.prevAnnualRevenue,
            ],
        },
        {
            name: 'Current',
            data: [props?.revenue?.weeklyRevenue, props?.revenue?.monthlyRevenue, props?.revenue?.annualRevenue],
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title">Revenue Comparison</h4>
                <Chart options={apexBarChartOpts} series={apexBarChartData} type="bar" className="apex-charts" />
            </Card.Body>
        </Card>
    );
};

BarChart.propTypes = {
    revenue: PropTypes.shape({
        weeklyRevenue: PropTypes.number.isRequired,
        monthlyRevenue: PropTypes.number.isRequired,
        annualRevenue: PropTypes.number.isRequired,
        prevWeeklyRevenue: PropTypes.number.isRequired,
        prevMonthlyRevenue: PropTypes.number.isRequired,
        prevAnnualRevenue: PropTypes.number.isRequired,
        weeklyRevChange: PropTypes.number.isRequired,
        monthlyRevChange: PropTypes.number.isRequired,
        annualRevChange: PropTypes.number.isRequired,
    }),
};

export default BarChart;
