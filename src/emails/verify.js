
export default (name, code) => `
<p>
Dear ${name},
<br/>
<br/>
<strong>Thanks so much for making an account with us!</strong><br/>
To make sure it's you, please verify your email at this link:
<a href="https://2018.calhacks.io/verify?code=${code}">
    https://2018.calhacks.io/verify?code=${code}
</a><br/>
If you didn't make an account on the Cal Hacks portal, please ignore this email!
</p>
`;