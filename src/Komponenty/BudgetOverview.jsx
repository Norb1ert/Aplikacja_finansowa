

export default function BudgetOverview({ transactions  }) {
    return (
      <div className="budget-overview">
        <h3>Historia Transakcji:</h3>
        {transactions.map((t) => (
          <div
            key={t._id}
            style={{
              backgroundColor: t.amount >= 0 ? '#d4f4dd' : '#f8d7da',
              padding: '10px',
              margin: '5px 0',
            }}
          >
            <div>
              <span>{t.category}</span> <strong>{t.amount} zł</strong>
            </div>
            <div>{t.date}</div>
          </div>
        ))}
      </div>
    );
  }
  