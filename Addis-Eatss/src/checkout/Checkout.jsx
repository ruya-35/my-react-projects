import React, { useState } from "react";
import { validate } from "./validate";
import { Field } from "./Field";


const placeOrder = async (orderData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { ok: true };
};

export function Checkout({ totalAmount = 640 }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        area: "Bole",
        notes: ""
    });
    
    const [touched, setTouched] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState("");
    const errors = validate(form);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    function handleBlur(e) {
        const { name } = e.target;
        setTouched((t) => ({ ...t, [name]: true }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (submitting) return;
        setTouched({ name: true, phone: true, area: true, notes: true });
        const currentErrors = validate(form);
        const firstBadField = Object.keys(currentErrors)[0];
        
        if (firstBadField) {
            document.getElementById(firstBadField)?.focus();
            return;
        }
        
        setSubmitting(true);
        setServerError("");
        
        try {
            const response = await placeOrder(form);
            if (response.ok) {
                alert("Order placed successfully!");
            }
        } catch (err) {
            setServerError(err.message || "Failed to place order. Please try again.");
            const firstError = Object.keys(errors)[0];
            if (firstError) {
                document.getElementById(firstError)?.focus();
            }
        } finally {
            setSubmitting(false);
        }
    }
    
    return (
    <form onSubmit={handleSubmit} noValidate className="checkout-form">
        
        <h2>Checkout</h2>
        
        {serverError && (
        <div role="alert" className="server-error-alert">
            {serverError}
        </div>
        )}
        
        <Field label="Full Name" id="name" error={errors.name} showError={touched.name && errors.name}>
        <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Abebe Bikila"
        />
        </Field>

        <Field label="TeleBirr Phone Number" id="phone" error={errors.phone} showError={touched.phone && errors.phone}>
        <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="09... or +2519..."
        />
        </Field>

        <Field label="Delivery Area" id="area" error={errors.area} showError={touched.area && errors.area}>
        <select name="area" value={form.area} onChange={handleChange} onBlur={handleBlur}>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
        </select>
        </Field>

        <Field label="Notes (Optional)" id="notes" error={errors.notes} showError={touched.notes && errors.notes}>
        <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={200}
            rows={3}
        />
        </Field>

        <button type="submit" disabled={submitting} className="checkout-submit-btn">
            {submitting ? "Sending your order..." : `Order ${totalAmount} ETB`}
        </button>
    </form>
    );
}