
import React from 'react';

export default class extends React.Component {
    render() {
        return (
            <form action="/app" method="post">
                School: <input type="text" value={this.props.appData.school} name="school" /><br/>
                Year: <input type="text" value={this.props.appData.year} name="year" /><br/>
                DOB: <input type="text" value={this.props.appData.dob} name="dob" /><br/>
                reimbursement: <input type="text" value={this.props.appData.reimbursement} name="reimbursement" /><br/>
                Diet: <input type="text" value={this.props.appData.diet} name="diet" /><br/>
                Resume: <input type="text" value={this.props.appData.resume} name="resume" /><br/>
                Linkedin: <input type="text" value={this.props.appData.linkedin} name="linkedin" /><br/>
                Github: <input type="text" value={this.props.appData.github} name="github" /><br/>
                Devpost: <input type="text" value={this.props.appData.devpost} name="devpost" /><br/>
                Q1: <input type="text" value={this.props.appData.question1} name="question1" /><br/>
                Q2: <input type="text" value={this.props.appData.question2} name="question2" /><br/>
                Q3: <input type="text" value={this.props.appData.question3} name="question3" /><br/>
                <button type="submit">Save App</button>
            </form>
        )
    }
}
