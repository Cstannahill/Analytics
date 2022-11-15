import React from 'react';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, Row, Col } from 'react-bootstrap';
import CardTitle from './CardTitle';
import analyticsService from '../../../services/internalAnalyticService';
import toastr from 'toastr';
import debug from 'sabio-debug';
import { FaDollarSign, FaUser } from 'react-icons/fa';
import { IoIosBusiness } from 'react-icons/io';
import { BsCartCheckFill } from 'react-icons/bs';
import { FcInvite } from 'react-icons/fc';

const _logger = debug.extend('InternalAnalytics');
const RevenueChart = () => {
    const [chartSer, setChartSer] = useState([
        {
            name: 'Users',
            type: 'area',
            data: '',
        },
    ]);
    const [series, setSeries] = useState({
        users: [
            {
                name: 'Users',
                type: 'area',
                data: [],
            },
        ],
        organizations: [
            {
                name: 'Organizations',
                type: 'area',
                data: [],
            },
        ],
        revenues: [
            {
                name: 'Revenues',
                type: 'area',
                data: [],
            },
        ],
        invites: [
            {
                name: 'Invites',
                type: 'area',
                data: [],
            },
        ],
        orders: [
            {
                name: 'Orders',
                type: 'area',
                data: [],
            },
        ],
    });
    useEffect(() => {
        analyticsService.getMonthlyAnalytics().then(onMonthlyAnalyticsSuccess).catch(onMonthlyAnalyticsError);
    }, []);
    const onMonthlyAnalyticsSuccess = (response) => {
        _logger(response, response?.item?.users);
        setSeries((prevState) => {
            const sd = { ...prevState };
            sd.users[0].data = formatData(response?.item?.users);
            sd.organizations[0].data = formatData(response?.item?.orgs);
            sd.invites[0].data = formatData(response?.item?.invites);
            sd.orders[0].data = formatData(response?.item?.orders);
            sd.revenues[0].data = formatData(response?.item?.revenues);
            setChartSer((prevState) => {
                const ser = [...prevState];
                ser[0].data = formatData(response?.item?.users);
                return ser;
            });
            return sd;
        });
    };

    const onMonthlyAnalyticsError = (error) => {
        toastr.error('There was an error retrieving the monthly analytics.');
        _logger(error);
    };

    const formatData = (data) => {
        let newData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const allMonths = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        data.forEach((dataOption) => {
            let idx = allMonths.findIndex((month) => dataOption.month === month);
            newData[idx] = dataOption.count;
        });
        return newData;
    };
    const date = new Date().getMonth();
    const apexLineChartWithLables = {
        chart: {
            height: 336,
            type: 'line',
            toolbar: {
                show: true,
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        fill: {
            type: 'solid',
            opacity: [0.35, 1],
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        markers: {
            size: 0,
        },
        colors: ['#3366E6'],
        yaxis: [
            {
                title: {
                    text: chartSer[0].name,

                    style: {
                        fontSize: '15px',
                        color: '#000000',
                        fontFamily: 'Times New Roman',
                        fontWeight: 600,
                    },
                },
                min: 0,
            },
        ],
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== 'undefined') {
                        return y.toFixed(0);
                    }
                    return y;
                },
            },
        },
        grid: {
            borderColor: '#f1f3fa',
        },
        legend: {
            fontSize: '14px',
            fontFamily: '14px',
            offsetY: -10,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    yaxis: {
                        show: true,
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    const onToggle = (label) => {
        _logger(label);

        switch (label) {
            case 'Users':
                setChartSer(series.users);
                break;
            case 'Organizations':
                setChartSer(series.organizations);
                break;
            case 'Revenue':
                setChartSer(series.revenues);
                break;
            case 'Orders':
                setChartSer(series.orders);
                break;
            case 'Invites':
                setChartSer(series.invites);
                break;
            default:
                setChartSer(series.users);
        }
    };

    return chartSer[0].data ? (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between"
                    title={chartSer[0].name}
                    onToggle={onToggle}
                    menuItems={[
                        { label: 'Users', icon: <FaUser className="mx-1" />, hasDivider: true },
                        { label: 'Organizations', icon: <IoIosBusiness className="mx-1" />, hasDivider: true },
                        { label: 'Revenue', icon: <FaDollarSign className="mx-1" />, hasDivider: true },
                        { label: 'Orders', icon: <BsCartCheckFill className="mx-1" />, hasDivider: true },
                        { label: 'Invites', icon: <FcInvite className="mx-1" />, hasDivider: true },
                    ]}
                />
                <div className="chart-content-bg">
                    <Row className="text-center">
                        <Col sm={6}>
                            <p className="text-muted mb-0 mt-3">Previous Month</p>
                            <h2 className="fw-normal mb-3">
                                <span>
                                    {chartSer[0].name === 'Revenues'
                                        ? `$${chartSer[0].data[date - 1]}`
                                        : chartSer[0].data[date - 1]}
                                </span>
                            </h2>
                        </Col>
                        <Col sm={6}>
                            <p className="text-muted mb-0 mt-3">Current Month</p>
                            <h2 className="fw-normal mb-3">
                                <span>
                                    {chartSer[0].name === 'Revenues'
                                        ? `$${chartSer[0].data[date]}`
                                        : chartSer[0].data[date]}
                                </span>
                            </h2>
                        </Col>
                    </Row>
                </div>
                <div dir="ltr">
                    <Chart
                        options={apexLineChartWithLables}
                        series={chartSer}
                        type="line"
                        className="apex-charts"
                        height={321}
                    />
                </div>
            </Card.Body>
        </Card>
    ) : (
        <></>
    );
};

export default RevenueChart;
