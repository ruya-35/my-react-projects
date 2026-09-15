const restaurantName = "Addis Café";

export function Header(){
    return(
        <div className="header">
        <h1>{restaurantName}</h1>
        <h1>Fresh Ethiopian Food & Coffee</h1>
        <h3 className="location">📍 Bole, Addis Ababa</h3>
        </div>
    );
}