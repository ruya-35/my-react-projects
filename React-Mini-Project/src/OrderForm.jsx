import { useState } from "react";

export function OrderForm() {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        area: "Bole",
    });

    const valid = /^(?:\+251|0)9\d{8}$/.test(form.phone);

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
        
        if (!valid) {
            alert("Please enter a valid phone number (09... or +251...).");
            return;
        }
        
        alert("Your order is successful!");
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />
            </div>
            
            <div>
                <label>Phone Number:</label>
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="09... or +2519..."
                />
                {form.phone && !valid && (
                    <p className="err">Use 09.. or +251..</p>
                )}
            </div>

            <div>
                <label>Area:</label>
                <select name="area" value={form.area} onChange={handleChange}>
                    <option value="Bole">Bole</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Bethel">Bethel</option>
                </select>
            </div>

            <button type="submit">Pay with TeleBirr</button>
        </form>
    );
}

export default OrderForm;