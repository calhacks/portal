
import React from 'react';

export default class extends React.Component {
    verifyResume(evt) {
        alert(document.getElementById('resume').files[0].size);
    }

    render() {
        return (
            <form action="/app" method="post" encType='multipart/form-data'>
                <p>School:</p> <input type="text" defaultValue={this.props.appData.school} name="school" />
                <p>DOB:</p> <input type="text" defaultValue={this.props.appData.dob} name="dob" />
                <p>Reimbursement:</p> <input type="text" defaultValue={this.props.appData.reimbursement} name="reimbursement" />
                <p>Diet:</p> <input type="text" defaultValue={this.props.appData.diet} name="diet" />
                <p>Linkedin:</p> <input type="text" defaultValue={this.props.appData.linkedin} name="linkedin" />
                <p>Github:</p> <input type="text" defaultValue={this.props.appData.github} name="github" />
                <p>Devpost:</p> <input type="text" defaultValue={this.props.appData.devpost} name="devpost" />
                <p>q1:</p> <input type="text" defaultValue={this.props.appData.question1} name="question1" />
                <p>q2:</p> <input type="text" defaultValue={this.props.appData.question2} name="question2" />
                <p>q3:</p> <input type="text" defaultValue={this.props.appData.question3} name="question3" />
                <p>Resume:</p> <input type='file' onChange={this.verifyResume.bind(this)} name='resume' id='resume' />
                <button type="submit">Save App</button>
            </form>
        );
    }
}
