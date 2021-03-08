import React from 'react'

const Table = (props) => {
    const {pymnt_nm,pymnt_ac_no,pymnt_chq_dt,pymnt_chq_amt} = props;
    return (
        <div>
             <table className="rounded">
                        <thead>
                            <tr>
                                <th>payee name</th>
                                <th>bank name</th>
                                <th>payee a/c no.</th>
                                <th>cheque date</th>
                                <th>cheque amt</th>
                            </tr>
                        </thead>
                        <tbody>
                          
                                <tr>
                                    <td>{pymnt_nm}</td>
                                    <td>hdfc</td>
                                    <td>{pymnt_ac_no}</td>
                                    <td>{pymnt_chq_dt}</td>
                                    <td>{pymnt_chq_amt}</td>
                                </tr>

                        </tbody>
                    </table>
            
        </div>
    )
}

export default Table
