import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { BsThreeDotsVertical } from 'react-icons/bs';
import debug from 'sabio-debug';

const _logger = debug.extend('InternalAnalytics');

const CardTitle = ({ title, containerClass, menuItems, onToggle }) => {
    const handleChange = (e) => {
        onToggle(e.target.name);
    };

    const mapMenuItems = (item) => {
        _logger(item);
        return (
            <React.Fragment key={item.label}>
                {item.hasDivider && <Dropdown.Divider as="div" />}
                <Dropdown.Item as="button" name={item.label} onClick={handleChange}>
                    {item.icon && item.icon}
                    {item.label}
                    {item.onSelect}
                </Dropdown.Item>
            </React.Fragment>
        );
    };

    return (
        <div className={classNames(containerClass)}>
            {typeof title === 'string' ? <h4 className="text-center">{title}</h4> : title}
            <Dropdown>
                <Dropdown.Toggle as={Link} to="#" className="arrow-none card-drop">
                    <h2>
                        <BsThreeDotsVertical />
                    </h2>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">{(menuItems || []).map(mapMenuItems)}</Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

CardTitle.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.element,
            variant: PropTypes.string,
            hasDivider: PropTypes.bool,
        })
    ),
    onToggle: PropTypes.func,
    title: PropTypes.string,
    containerClass: PropTypes.string,
    icon: PropTypes.element,
};

export default CardTitle;
