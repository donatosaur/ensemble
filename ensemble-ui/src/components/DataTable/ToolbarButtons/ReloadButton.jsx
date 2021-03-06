import { Button } from 'react-bootstrap';
import React from 'react';

/**
 * @param {Object} props 
 * @param {() => {}} props.onClick
 * @returns {JSX.Element}
 */
export default function ReloadButton({ onClick }) {
  return (
      <Button
        size="sm"
        variant="secondary"
        onClick={onClick}
      >
        <i className="bi bi-arrow-clockwise me-1" />
        {`Reset Filters`}
      </Button>
  )
}
