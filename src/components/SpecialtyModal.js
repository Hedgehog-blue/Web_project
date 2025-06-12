import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function SpecialtyModal({ show, onHide, specialty }) {
  if (!specialty) return null;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{specialty.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Код спеціальності:</strong> {specialty.short}</p>
        <p>{specialty.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Закрити
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
