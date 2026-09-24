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
        setForm({ ...form, [name]: value }); 
    }
    function alertMsg(e){
        alert`Your order is successfull`
    }
    
    return (
    <form onSubmit={(e) => e.preventDefault()}>
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

        <button onChange={handleChange} onClick={alertMsg}>Pay with TeleBirr</button>
    </form>
    );
}
