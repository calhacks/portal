
import React from 'react';

export default class extends React.Component {
    validateResume(evt) {
        if (document.getElementById('resume').files[0].size > 10 * 1024 * 1024) {
            // Over the file size limit
            alert('The file you uploaded is too large. Keep it under 10MB.');
            document.getElementById('resume').value = null;
        }
    }

    getFormFields() {
        const fieldNameMapping = {
            school: 'School',
            dob: 'DOB',
            reimbursement: 'Reimbursement',
            diet: 'Diet',
            linkedin: 'Linkedin',
            github: 'Github',
            devpost: 'Devpost',
            question1: 'Q1',
            question2: 'Q2',
            question3: 'Q3'
        };

        const fields = [];
        for (let key in fieldNameMapping) {
            fields.push(
                <div className='app-field'>
                    <p>{fieldNameMapping[key]}</p>
                    <input
                        type='text'
                        defaultValue={
                            this.props.appData
                            ? this.props.appData[key]
                            : ''
                        }
                        name={key} />
                </div>
            )
        }

        return fields;
    }

    render() {
        return (
            <form action="/app" method="post" encType='multipart/form-data'>
                {this.getFormFields.bind(this)()}
                <p>Resume:</p> <input type='file' onChange={this.validateResume.bind(this)} name='resume' id='resume' />
                <button type="submit">Save App</button>
            </form>
        );
    }
}
