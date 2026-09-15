import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function DishModal({ dish, onClose, triggerRef }) {
    const modalRef = useRef(null);
    useEffect(() => {
        if (modalRef.current) {
            modalRef.current.focus();
        }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
        onClose();
        }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
        window.removeEventListener("keydown", handleKeyDown);
        if (triggerRef && triggerRef.current) {
            triggerRef.current.focus();
        }
    };
    }, [onClose, triggerRef]);

    if (!dish) return null;

    return createPortal(
    <div className="modal-overlay" onClick={onClose}>
        <div
        className="modal-content"
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        >
        <h2 id="modal-title">{dish.name}</h2>
        <p>{dish.description}</p>
        <p><strong>Category:</strong> {dish.category}</p>
        <p><strong>Price:</strong> {dish.price} ETB</p>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
        </div>
    </div>,
    document.body
    );
}