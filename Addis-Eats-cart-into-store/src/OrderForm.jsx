import { useState } from "react";

export function OrderForm({ onSuccess }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        area: "Bole",
    });

    const isValidPhone = /^(?:\+251|0)9\d{8}$/.test(form.phone);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (!form.name.trim()) {
            alert("Please enter your name.");
            return;
        }

        if (!isValidPhone) {
            alert("Please enter a valid phone number.");
            return;
        }

        if (onSuccess) {
            onSuccess();
        }

        alert(`Order placed successfully for ${form.name}!`);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="09... or +2519..."
                    required
                />
                {form.phone && !isValidPhone && (
                    <p className="err">Use format 09... or +2519...</p>
                )}
            </div>

            <div>
                <label htmlFor="area">Area:</label>
                <select id="area" name="area" value={form.area} onChange={handleChange}>
                    <option value="Bole">Bole</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Bethel">Bethel</option>
                </select>
            </div>

            <button type="submit">Pay with TeleBirr</button>
        </form>
    );
}