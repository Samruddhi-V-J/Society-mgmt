// import React from 'react';
// import Navbar from '../../components/Navbar';

// function Billings() {
//   return (
//     <div className="billings-section" style={styles.container}>
      
//       <Navbar title="Billings Management" />
//       {/* Add content here */}

//       <h2 style={styles.heading}>Payment Status of the Residents</h2>
//       <table style={styles.table}>
//         <thead>
//           <tr style={styles.headerRow}>
//             <th style={styles.headerCell}>No</th>
//             <th style={styles.headerCell}>Flat No</th>
//             <th style={styles.headerCell}>Amount</th>
//             <th style={styles.headerCell}>Payment ID</th>
//             <th style={styles.headerCell}>Payment Date</th>
//             <th style={styles.headerCell}>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr style={styles.row}>
//             <td style={styles.cell}>1</td>
//             <td style={styles.cell}>A234</td>
//             <td style={styles.cell}>3500</td>
//             <td style={styles.cell}>1</td>
//             <td style={styles.cell}>-</td>
//             <td style={{ ...styles.cell, ...styles.pending }}>PENDING</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
  
//   );
// }


// const styles = {
//   container: {
//     padding: '20px',
//     fontFamily: 'Arial, sans-serif',
//   },
//   heading: {
//     textAlign: 'center',
//     color: '#333',
//   },
//   table: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     marginTop: '20px',
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//   },
//   headerRow: {
//     backgroundColor: '#007bff',
//     color: 'white',
//   },
//   headerCell: {
//     padding: '10px',
//     border: '1px solid #ddd',
//     textAlign: 'left',
//   },
//   row: {
//     backgroundColor: '#f9f9f9',
//   },
//   cell: {
//     padding: '10px',
//     border: '1px solid #ddd',
//   },
//   pending: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
// };
// export default Billings;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar';

function Billings() {
  const [payments, setPayments] = useState([]);

  // Fetch payment details from the backend
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/payments/all');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="billings-section" style={styles.container}>
      <Navbar title="Billings Management" />
      <h2 style={styles.heading}>Payment Status of the Residents</h2>

      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.headerCell}>No</th>
            <th style={styles.headerCell}>Flat No</th>
            <th style={styles.headerCell}>Amount</th>
            <th style={styles.headerCell}>Payment ID</th>
            <th style={styles.headerCell}>Payment Date</th>
            <th style={styles.headerCell}>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr key={payment.id} style={styles.row}>
              <td style={styles.cell}>{index + 1}</td>
              <td style={styles.cell}>{payment.flatNo || '-'}</td>
              <td style={styles.cell}>{payment.amount}</td>
              <td style={styles.cell}>{payment.paymentId}</td>
              <td style={styles.cell}>{payment.paymentDate || '-'}</td>
              <td style={{ ...styles.cell, color: payment.status === 'PENDING' ? 'red' : 'green', fontWeight: 'bold' }}>
                {payment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  },
  headerRow: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  headerCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  row: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    padding: '10px',
    border: '1px solid #ddd',
  },
};

export default Billings;
