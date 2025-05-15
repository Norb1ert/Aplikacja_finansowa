
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

export default function TransactionItem({transaction, onDelete, onEdit}) {
    const {_id, amount, category, type, date, description} = transaction

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(transaction);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    

      const handleSubmit = (e) => {
        e.preventDefault();
        onEdit(formData); // Wysłanie zaaktualizowanych danych 
        setIsEditing(false);
      };

    return (

        <div className="transaction-card">
            {isEditing ? (<>
        <form onSubmit={handleSubmit} className="edit-form">

          <input name="amount" value={formData.amount} onChange={handleChange} className="edit-form-input"/>
          <input name="category" value={formData.category} onChange={handleChange} className="edit-form-input"/>
          <input name="description" value={formData.description} onChange={handleChange} className="edit-form-input"/>
          <input name="date" value={formData.date.slice(0,10)} type="date" onChange={handleChange} className="edit-form-input"/>

          <select name="type" value={formData.type} onChange={handleChange}className="edit-form-select">
            <option value="Dochód">Dochód</option>
            <option value="Wydatek">Wydatek</option>
          </select>

        <div className="transaction-button-group">
          <button type="submit" className="edit-form-button">Zapisz</button>
          <button type="button" onClick={() => setIsEditing(false)} className="edit-form-button">Anuluj</button>
        </div>
        </form>

            </>) : (
    <>

        <div className="transaction-item-a">
            <p className="transaction-p" style={{ color: amount > 0  ? "#22c55e" : "#ef4444",  }}>{amount}</p>
        </div>
            
        <div className="transaction-item">
            <p className="transaction-p">{category}</p>
        </div>

        <div className="transaction-item">
            <p className="transaction-p-type" style={{ backgroundColor: type === "Wydatek" ? "#ef4444" : "#22c55e" }}>{type}</p>
        </div>

       

        <div className="transaction-item-d">
            <p className="transaction-p">{description}</p>
        </div>
        <div className="transaction-item">
            <p className="transaction-p">{date}</p>
        </div>
        <div className="transaction-cta">
           <button className="cta-button" onClick={() => onDelete(_id)}><MdDelete /></button>
           <button className="cta-button" onClick={() => setIsEditing(true)}><MdModeEdit /></button>
        </div>
    </>)}
            
        
        </div>
    )
}