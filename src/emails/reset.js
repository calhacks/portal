
export default (name, code) => `
<p>
Dear ${name},
<br/>
<br/>
You can reset your password by clicking on the link below:
<a href="https://2018.calhacks.io/reset?code=${code}">
    https://2018.calhacks.io/reset?code=${code}
</a><br/>
If you didn't request a new password, please ignore this email!
</p>
`;
