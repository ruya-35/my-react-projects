import React from "react";

export function Field({ label, id, error, showError, children }) {
    const errorId = `${id}-error`;

    return (
    <div className="field-group">
        <label htmlFor={id} className="field-label">{label}</label>
        
        {React.cloneElement(children, {
            id,
            "aria-invalid": !!showError,
            "aria-describedby": showError ? errorId : undefined,
        })}

        {showError && (
            <p id={errorId} role="alert" className="field-error">⚠️ {error}</p>
        )}
    </div>
    );
}