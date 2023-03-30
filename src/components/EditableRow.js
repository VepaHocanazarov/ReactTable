import React from 'react'

const EditableRow = () => {
    return (
        <tr>
            <td>
                <input type="text"
                    name='fullName'
                    required="required"
                    placeholder='Enter a name...'
                ></input>
            </td>
            <td>
                <input type="text"
                    name='addess'
                    required="required"
                    placeholder='Enter an address...'
                ></input>
            </td>
            <td>
            <input type="text"
                    name='phoneNumber'
                    required="required"
                    placeholder='Enter a phoneNumber...'
                ></input>
            </td>
            <td>
            <input type="text"
                    name='email'
                    required="required"
                    placeholder='Enter an  email...'
                ></input>
            </td>
        </tr>
    )
}

export default EditableRow
